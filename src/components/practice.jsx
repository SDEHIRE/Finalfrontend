import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ImageCapture from './ImageCapture'
import { InstructionsModal, HintModal } from './Modals'
import ConfirmationPopup from './ConfirmationPopup'
import { CSSTransition } from 'react-transition-group'
import { useFullScreen } from './hooks/useFullScreen'
import { useTimer } from 'react-timer-hook'
import { useUser } from './context/UserContext';

export default function GuidedPracticePage() {
  const [time, setTime] = useState(49 * 60)
  const [problemStatement, setProblemStatement] = useState(null)
  const [hints, setHints] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userCode, setUserCode] = useState("")
  const [previousLines, setPreviousLines] = useState(0)
  const [showInstructions, setShowInstructions] = useState(true)
  const [currentHint, setCurrentHint] = useState('')
  const [showHintPop, setShowHintPop] = useState(false)
  const [aiTranscripts, setAiTranscripts] = useState(["Hello, let's begin the Session!"])
  const [userTranscripts, setUserTranscripts] = useState([""])
  const [interimTranscript, setInterimTranscript] = useState('')
  const [output, setOutput] = useState(null)
  const transcriptRef = useRef(null)
  const [randomQuestion, setRandomQuestion] = useState(null)
  const [userTestCases, setUserTestCases] = useState([])
  const [emotion, setEmotion] = useState("Unknown")
  const [isCapturing, setIsCapturing] = useState(false)
  const navigate = useNavigate()
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { isFullScreen, enterFullScreen } = useFullScreen()
  const [showExitConfirmation, setShowExitConfirmation] = useState(false)
  const [isOverlapping, setIsOverlapping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const recognitionRef = useRef(null)
  const [selectedLanguage, setSelectedLanguage] = useState('python')
  const { user } = useUser(); 
  
  
  

  const {
    seconds: timerSeconds,
    isRunning: isTimerRunning,
    start: startTimer,
    pause: pauseTimer,
    restart: restartTimer,
  } = useTimer({ expiryTimestamp: new Date().setSeconds(new Date().getSeconds() + 30), autoStart: false })

  

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = ''
        let finalTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' '
          } else {
            interimTranscript += transcript
          }
        }

        setUserTranscripts(prevTranscripts => {
          const updatedTranscripts = [...prevTranscripts];
          updatedTranscripts[updatedTranscripts.length - 1] = (updatedTranscripts[updatedTranscripts.length - 1] + ' ' + finalTranscript).trim();
          return updatedTranscripts;
        });

        setInterimTranscript(interimTranscript);
      }

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error)
      }
      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    } else {
      console.log("Speech recognition not supported in this browser.")
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  useEffect(() => {
    if (isListening) {
      recognitionRef.current.start()
    } else {
      recognitionRef.current.stop()
    }
  }, [isListening])

  useEffect(() => {
    if (timerSeconds === 0 && isTimerRunning) {
      setIsListening(false)
      pauseTimer()
    }
  }, [timerSeconds, isTimerRunning, pauseTimer])

  const generateQuestion = async (code) => {
    try {
      const response = await axios.post('https://codegen-upwn.onrender.com/generate_question', {
        code_snippet: code
      })
      if (response.data.question) {
        addAiTranscript(`Question based on your code: ${response.data.question}`)
        
        setIsListening(true)
        const time = new Date()
        time.setSeconds(time.getSeconds() + 30)
        restartTimer(time)

        setTimeout(() => {
          setIsListening(false)
          if (recognitionRef.current) {
            recognitionRef.current.stop()
          }
          addAiTranscript("Time's up! Speech recognition has ended.")
        }, 30000)
      }
    } catch (error) {
      console.error('Error generating question:', error)
    }
  }
  
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0))
    }, 1000)
    return () => clearInterval(timerInterval)
  }, [])

  useEffect(() => {
    if (showInstructions) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [showInstructions])

  let isSpeaking = false
  let voices = []
  let audioPlaying = false

  const updateVoices = () => {
    const synth = window.speechSynthesis
    voices = synth.getVoices()
  }

  const speakText = (text) => {
    if (isSpeaking) return

    const synth = window.speechSynthesis;
    const voices = synth.getVoices();
    const utterance = new SpeechSynthesisUtterance(text);

    // Use the desired voice, e.g., Google UK English Female
    const femaleVoice = voices.find(voice => voice.name === "Google UK English Female");
    utterance.voice = femaleVoice || voices[3];

    utterance.onstart = () => {
      isSpeaking = true
      audioPlaying = true
      playVideo2()
    }

    utterance.onend = () => {
      isSpeaking = false
      audioPlaying = false
      playVideo1()
    }

    synth.speak(utterance)
  }

  const playVideo2 = () => {
    const video1 = document.getElementById('video1')
    const video2 = document.getElementById('video2')

    video1.style.display = 'none'
    video2.style.display = 'block'
    video2.play()
  }

  const playVideo1 = () => {
    const video1 = document.getElementById('video1')
    const video2 = document.getElementById('video2')

    video2.style.display = 'none'
    video1.style.display = 'block'
    video1.play()
  }

  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = updateVoices
  } else {
    updateVoices()
  }

  const addAiTranscript = (newText) => {
    setAiTranscripts(prevTranscripts => [...prevTranscripts, newText]);
    setUserTranscripts(prevTranscripts => [...prevTranscripts, '']);
    speakText(newText);
  };

  const minutes = Math.floor(time / 60)
  const seconds = time % 60

  const startProcesses = async () => {
    try {
      await axios.post('http://localhost:5002/start_all_processes', { duration: 10 })
      console.log("Started emotion recognition and audio analysis.")
    } catch (error) {
      console.error("Failed to start processes:", error)
    }
  }

  const stopProcesses = async () => {
    try {
      await axios.post('http://localhost:5002/stop_all_processes')
      console.log("Stopped emotion recognition and audio analysis.")
    } catch (error) {
      console.error("Failed to stop processes:", error)
    }
  }

  const handleEndSession = () => {
    if (!randomQuestion || !randomQuestion._id) {
      setError('No question data available to end the session. Please try again.')
      return
    }

    checkOverlapping()
    setShowConfirmation(true)
  }

  const handleConfirmSubmission = async () => {
    setShowConfirmation(false)
    setIsSubmitting(true)
    setError(null)


    try {
      const evaluatePayload = {
        code: userCode,
        language: selectedLanguage,
        testCases: userTestCases,
        questionId: randomQuestion._id,
        isOverlapping: isOverlapping,
      }


      const evaluationResponse = await axios.post(
        "https://backendexpress-mi00.onrender.com/api/evaluate",
        evaluatePayload,
      )
      const evaluationResults = evaluationResponse.data.results
      const totalPassed = evaluationResponse.data.totalPassed


      const sessionData = {

        username: user?.username,
        userCode,
        language: selectedLanguage,
        evaluationResults,
        totalPassed,
        nextQuestion: randomQuestion,
        isOverlapping,
      }


      // Send session data to backend to store in MongoDB
      await axios.post("https://session-6u98.onrender.com/api/saveSessionData", sessionData)


      setIsCapturing(false)
      await stopProcesses()


      setTimeout(() => {
        setIsSubmitting(false)
        navigate("/SessionReport", { state: sessionData })
      }, 2000)
    } catch (error) {
      console.error("Error during end session process:", error.message)
      setError("An error occurred while ending the session. Please try again.")
      setIsSubmitting(false)
    }
  }


  const fetchProblemStatement = async () => {
    setLoading(true);
    setError(null);
  
    try {
      // Fetch question data from the API
      const response = await axios.get('https://backendexpress-mi00.onrender.com/api/question');
      const questionData = response.data;
  
      console.log('Fetched Question:', questionData);
  
      // Extract relevant data
      const problemText = questionData.QText || "No problem statement available.";
      const hints = questionData.hints?.map(hint => hint.hint) || [];
      const testCases = questionData.test_cases || [];
      const solutionCode = questionData.solution?.code || "No solution available.";
      const firstLineOfSolution = solutionCode.split('\n')[0] || "No solution first line available.";
  
      // Update state
      setProblemStatement(problemText);
      setHints(hints);
      setUserTestCases(testCases);
      setRandomQuestion(questionData);
      setIsCapturing(true);
  
      // Log the first line of the solution for debugging
      console.log('First Line of Solution:', firstLineOfSolution);
      setUserCode(firstLineOfSolution);
  
      // Additional actions
      addAiTranscript("New problem statement loaded. Start coding, and I'll ask you questions when you've written enough.");
    } catch (error) {
      // Handle errors
      console.error('Error fetching the problem statement:', error.message);
      setError('Failed to load problem statement. Please try again.');
    } finally {
      // Cleanup
      setLoading(false);
    }
  };
  
  const handleSubmitCode = async () => {
    if (userCode.trim().split('\n').length > 0) {
      try {
        // Step 1: Compile and run the Python code using the compile code API
        const compileResponse = await axios.post('https://backendexpress-mi00.onrender.com/compile_code', {
          code: userCode
        });
  
        const compileOutput = compileResponse.data.output || 'No output from compile API.';
  
        // Step 2: Evaluate the code using the evaluate API
        const evaluateResponse = await axios.post('https://backendexpress-mi00.onrender.com/api/evaluate', {
          code: userCode,
          language: selectedLanguage,
          testCases: userTestCases.slice(0, 2),
          questionId: randomQuestion._id,
          isOverlapping: isOverlapping,
        });
  
        const { results, error } = evaluateResponse.data;
  
        let evaluateOutput = '';
        if (error) {
          evaluateOutput = `Error: ${error}`;
        } else {
          // Generate output text for each test case result
          evaluateOutput = results.map((result, index) =>
            `Test Case ${index + 1}: ${result.passed ? 'Passed' : 'Failed'}\n` +
            `Expected Output: ${result.expectedOutput}\n` 
            
          ).join('\n\n');
        }
  
        // Combine both the compile and evaluate outputs
        const finalOutput = `Compile Output:\n${compileOutput}\n\nEvaluate API Output:\n${evaluateOutput}`;
        
        setOutput(finalOutput);
        addAiTranscript(`Evaluation Results:\n${finalOutput}`);
        
      } catch (error) {
        console.error('Error processing code:', error);
        alert('Failed to process the code. Please try again.');
      }
    } else {
      alert('Please write at least 1 line of code.');
    }
  };
  


  const handleHintClick = (hint) => {
    if (hint) {
      addAiTranscript(`Hint: ${hint}`)
      setCurrentHint(hint)
      setShowHintPop(true)
    }
  }

  const closeHintPop = () => {
    setShowHintPop(false)
  }

  useEffect(() => {
    return () => {
      stopProcesses()
    }
  }, [])

  const closeInstructions = () => {
    setShowInstructions(false)
  }

  useEffect(() => {
    enterFullScreen()
  }, [])

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [])

  const handlePopState = useCallback(() => {
    setShowExitConfirmation(true)
  }, [])

  useEffect(() => {
    window.history.pushState(null, '', window.location.pathname)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('popstate', handlePopState)
    }
  }, [handlePopState])

  const checkOverlapping = useCallback(() => {
    const hasOverlap = userCode.includes("// Potential overlap detected")
    setIsOverlapping(hasOverlap)
  }, [userCode])

  useEffect(() => {
    checkOverlapping()
  }, [userCode, checkOverlapping])

  return (
    <div className="min-h-screen bg-blue-100">
      {showInstructions && <InstructionsModal onClose={closeInstructions} />}

      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <img src="logo2.png" alt="SDE Hire Logo" className="h-12" />
          <h2 className="text-2xl font-bold">SDE Level - 1</h2>
        </div>
      </header>

      <main className="container mx-auto p-4 md:flex md:space-x-4">
        <div className="md:w-1/2 space-y-4">
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-xl font-bold mb-4">Interviewer Online</h3>
            <div className="flex items-start space-x-4">
              <div className="w-1/3">
                <div className="text-center mb-2">
                  <h4 className="font-semibold">Lisa</h4>
                  <p>AI Interviewer</p>
                </div>
                <div className="video-container">
                  <video id="video1" className="w-full h-40 object-cover rounded-lg" autoPlay muted loop>
                    <source src="lisa.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  <video id="video2" className="w-full h-40 object-cover rounded-lg" autoPlay muted loop style={{ display: 'none' }}>
                    <source src="l2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>

              <div className="flex-1 w-2/3">
                <h5 className="font-semibold mb-2">Conversation</h5>
                <div className="h-[calc(100vh-36rem)] min-h-[12rem] overflow-y-auto bg-blue-50 p-2 rounded" ref={transcriptRef}>
                  <div className="flex flex-col space-y-2">
                    {aiTranscripts.flatMap((aiTranscript, index) => [
                      <p key={`ai-${index}`} className="mb-2 text-left bg-gray-200 p-2 rounded-lg">{aiTranscript}</p>,
                      (userTranscripts[index] || interimTranscript) && (
                        <p key={`user-${index}`} className="mb-2 text-right bg-blue-200 p-2 rounded-lg">
                          {userTranscripts[index]}
                          {index === userTranscripts.length - 1 && interimTranscript && (
                            <span className="text-gray-500 italic"> {interimTranscript}</span>
                          )}
                        </p>
                      )
                    ]).filter(Boolean)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-bold mb-4">Problem Statement</h3>
            <div className="bg-white border border-gray-200 rounded-lg p-4 h-[calc(100vh-32rem)] min-h-[16rem] overflow-y-auto" onCopy={(e) => e.preventDefault()} >
              
              {loading ? (
                <p>Loading...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <pre className="whitespace-pre-wrap text-sm">{problemStatement || 'Click the button below to load a new problem statement.'}</pre>
              )}
            </div>
            <div className="mt-4 space-x-2">
              {hints.map((hint, index) => (
                <button
                  key={index}
                  onClick={() => handleHintClick(hint)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Hint {index + 1}
                </button>
              ))}
            </div>
            <button
              onClick={fetchProblemStatement}
              disabled={loading}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300"
            >
              {loading ? 'Loading...' : 'Load New Problem'}
            </button>
          </div>
        </div>

        <div className="md:w-1/2 space-y-4 mt-4 md:mt-0">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="text-xl font-bold mb-4">Your Code</h3>
            <div className="mb-4">
              <label htmlFor="language-select" className="block text-sm font-medium text-gray-700 mb-2">Select Language:</label>
              <select
                id="language-select"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
              >
                
                <option value="python">Python</option>
              </select>
            </div>
            <div className="relative">
              <div className="absolute top-0 left-0 w-8 h-full bg-gray-800 text-gray-400 text-xs font-mono text-right pr-2 pt-2 select-none overflow-hidden">
                {userCode.split('\n').map((_, i) => (
                  <div key={i} className="leading-5">{i + 1}</div>
                ))}
              </div>
              <textarea
                value={userCode}
                onChange={(e) => {
                  const newCode = e.target.value;
                  setUserCode(newCode);

                  const currentLines = newCode.split('\n').length;

                  if (Math.floor(currentLines / 5) > Math.floor(previousLines / 5)) {
                    generateQuestion(newCode);
                  }

                  setPreviousLines(currentLines);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Tab') {
                    e.preventDefault();
                    const start = e.target.selectionStart;
                    const end = e.target.selectionEnd;
                    const spaces = '    ';
                    const newCode = userCode.substring(0, start) + spaces + userCode.substring(end);
                    setUserCode(newCode);
                    e.target.setSelectionRange(start + spaces.length, start + spaces.length);
                  }
                }}
                placeholder="Write your code here..."
                className="w-full h-[calc(100vh-20rem)] min-h-[24rem] p-2 pl-10 bg-black text-white rounded font-mono text-sm leading-5"
                style={{
                  tabSize: 4,
                  MozTabSize: 4,
                  resize: 'none',
                  whiteSpace: 'pre',
                  overflowWrap: 'normal',
                  overflowX: 'auto',
                }}
                onPaste={(e) => e.preventDefault()}
                onCopy={(e) => e.preventDefault()}
              />
            </div>
            <button
              onClick={handleSubmitCode}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Compile Code
            </button>
          </div>

          {output && (
            <div className="bg-white rounded-lg shadow-md p-4">
              <h3 className="text-xl font-bold mb-4">Output</h3>
              <pre className="whitespace-pre-wrap bg-black text-white p-4 rounded">{output}</pre>
            </div>
          )}
          {isListening && (
            <div className="bg-white rounded-lg shadow-md p-4 mt-4">
              <h3 className="text-xl font-bold mb-2">Speech Recognition Active</h3>
              <p>Session: {userTranscripts.length}</p>
              <p>Time remaining: {timerSeconds} seconds</p>
            </div>
          )}
        </div>
      </main>

      {showHintPop && <HintModal hint={currentHint} onClose={closeHintPop} />}

      <footer className="bg-blue-600 text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <button
            onClick={handleEndSession}
            className="px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-100"
          >
            Submit & End Session
          </button>
        </div>
      </footer>

      <ImageCapture isCapturing={isCapturing} />
      {showConfirmation && (
        <ConfirmationPopup
          onConfirm={handleConfirmSubmission}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
      {showExitConfirmation && (
        <ConfirmationPopup
          onConfirm={handleEndSession}
          onCancel={() => {
            setShowExitConfirmation(false);
            window.history.pushState(null, '', window.location.pathname);
          }}
          message="Are you sure you want to leave? Your progress will be lost."
        />
      )}
      <CSSTransition
        in={isSubmitting}
        timeout={2000}
        classNames="fade"
        unmountOnExit
      >
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Submitting Test</h2>
            <div className="loader"></div>
          </div>
        </div>
      </CSSTransition>

      <style jsx>{`
        .fade-enter {
          opacity: 0;
        }
        .fade-enter-active {
          opacity: 1;
          transition: opacity 300ms ease-in;
        }
        .fade-exit {
          opacity: 1;
        }
        .fade-exit-active {
          opacity: 0;
          transition: opacity 300ms ease-in;
        }
        .loader {
          border: 5px solid #f3f3f3;
          border-top: 5px solid #3498db;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

