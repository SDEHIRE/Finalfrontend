import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from './questions';
import VideoPlayer from './VideoPlayer';
import AlertModal from './AlertModal';

function VoiceInterview() {
  const [isStarted, setIsStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userTranscripts, setUserTranscripts] = useState([]);
  const [interimTranscript, setInterimTranscript] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const [isPausing, setIsPausing] = useState(false);
  const [questionAsked, setQuestionAsked] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [recommendedRole, setRecommendedRole] = useState('');
  const [sessionsPerWeek, setSessionsPerWeek] = useState(0);
  const chatContainerRef = useRef(null);
  const synth = useRef(null);
  const utterance = useRef(null);
  const recognitionRef = useRef(null);

  const startRecognition = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  }, []);

  const stopRecognition = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }, []);

  const startInterview = useCallback(() => {
    setIsStarted(true);
    setCurrentQuestionIndex(0);
    setChatHistory([{ type: 'question', content: questions[0] }]);
    setUserTranscripts(['']);
    setShowVideo(true);
    setQuestionAsked(false);
  }, []);

  const speakQuestion = useCallback((question) => {
    if ('speechSynthesis' in window) {
      synth.current = window.speechSynthesis;
      utterance.current = new SpeechSynthesisUtterance(question);
      
      const voices = synth.current.getVoices();
      const femaleVoice = voices.find(voice => voice.name.includes('female') || voice.name.includes('woman'));
      if (femaleVoice) {
        utterance.current.voice = femaleVoice;
      }

      utterance.current.onstart = () => {
        setIsAudioPlaying(true);
        setQuestionAsked(false);
      };

      utterance.current.onend = () => {
        setIsAudioPlaying(false);
        setQuestionAsked(true);
        startRecognition();
      };

      utterance.current.onerror = (event) => {
        console.error('Speech synthesis error', event);
        setIsAudioPlaying(false);
      };

      synth.current.speak(utterance.current);
    }
  }, [startRecognition]);

  const handleGoBack = useCallback(() => {
    setIsAlertOpen(true);
  }, []);

  const handleConfirmGoBack = useCallback(() => {
    if (currentQuestionIndex > 0) {
      const newIndex = currentQuestionIndex - 1;
      setCurrentQuestionIndex(newIndex);
      setChatHistory(prev => prev.slice(0, newIndex * 2 + 1));
      setUserTranscripts(prev => prev.slice(0, newIndex + 1));
      setQuestionAsked(false);
      setIsAlertOpen(false);
      if (synth.current?.cancel) synth.current.cancel();
      stopRecognition();
    }
  }, [currentQuestionIndex, stopRecognition]);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      recognitionRef.current = new window.webkitSpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        setUserTranscripts(prevTranscripts => {
          const updatedTranscripts = [...prevTranscripts];
          updatedTranscripts[updatedTranscripts.length - 1] = (updatedTranscripts[updatedTranscripts.length - 1] + ' ' + finalTranscript).trim();
          return updatedTranscripts;
        });

        setInterimTranscript(interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.log("Speech recognition not supported in this browser.");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const determineRecommendations = useCallback(() => {
    const roles = ['Junior Developer', 'Senior Developer', 'Project Manager', 'UI/UX Designer', 'Data Scientist'];
    const role = roles[Math.floor(Math.random() * roles.length)];
    
    // Generate a random number between 3 and 7, with higher probability for 3-4
    let salary = 3 + Math.random() * 4;
    if (Math.random() < 0.7) {
      salary = 3 + Math.random();
    }
    salary = Math.round(salary * 10) / 10; // Round to one decimal place
    
    setRecommendedRole(role);
    setSessionsPerWeek(salary);
  }, []);

  useEffect(() => {
    if (!isStarted) return;

    if (!questionAsked) {
      speakQuestion(questions[currentQuestionIndex]);
    }

    const timer = setTimeout(() => {
      stopRecognition();
      setChatHistory(prev => [...prev, { type: 'answer', content: userTranscripts[currentQuestionIndex] || '' }]);

      setIsPausing(true);

      setTimeout(() => {
        setIsPausing(false);
        if (currentQuestionIndex + 1 < questions.length) {
          setCurrentQuestionIndex(index => index + 1);
          setChatHistory(prev => [...prev, { type: 'question', content: questions[currentQuestionIndex + 1] }]);
          setUserTranscripts(prev => [...prev, '']);
          setInterimTranscript('');
          setQuestionAsked(false);
        } else {
          setIsStarted(false);
          setIsCompleted(true);
          setShowVideo(false);
          determineRecommendations(); // Call the new function here
        }
      }, 3000);

    }, 20000);

    return () => {
      clearTimeout(timer);
      if (synth.current?.cancel) synth.current.cancel();
    };
  }, [isStarted, currentQuestionIndex, speakQuestion, userTranscripts, startRecognition, stopRecognition, questions, questionAsked, determineRecommendations]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  if (isCompleted) {
    return (
      <div className="max-w-2xl mx-auto p-4 min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 text-white">
        <motion.h1 
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Career Counseling Completed
        </motion.h1>
        <motion.div
          className="bg-white text-gray-800 rounded-lg p-6 shadow-lg"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Your Results</h2>
          <motion.p 
            className="text-lg mb-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            Recommended Role: <span className="font-bold text-blue-600">{recommendedRole}</span>
          </motion.p>
          <motion.p 
            className="text-lg"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            Recommended Package: <span className="font-bold text-green-600">{sessionsPerWeek}k - {(sessionsPerWeek + 1).toFixed(1)}LPA</span>
          </motion.p>
        </motion.div>
        <motion.a 
          href="/profile" 
          className="mt-8 bg-white text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-full font-semibold text-center shadow-md transition duration-300 ease-in-out"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
        >
          View Profile
        </motion.a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 min-h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4 text-center">Career Counseling</h1>
      {!isStarted ? (
        <div className="flex-grow flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={startInterview}
          >
            Start Career Counseling
          </button>
        </div>
      ) : (
        <div className="flex-grow flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3">
            <VideoPlayer isAudioPlaying={isAudioPlaying} />
           
          </div>
          <div className="flex-grow flex flex-col">
            <div 
              ref={chatContainerRef}
              className="flex-grow overflow-y-auto space-y-4 p-4 bg-gray-100 rounded-lg"
            >
              <AnimatePresence>
                {chatHistory.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={messageVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className={`flex ${item.type === 'question' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[80%] p-3 rounded-lg ${
                      item.type === 'question' ? 'bg-blue-500 text-white' : 'bg-white'
                    }`}>
                      <p>{item.content}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            {isPausing && (
              <div className="text-center text-gray-500 my-2">
                Pausing for 3 seconds...
              </div>
            )}
            {isListening && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-yellow-100 p-4 rounded-lg mt-4"
              >
                <h3 className="font-bold mb-2">{recommendedRole}</h3>
                <p>{userTranscripts[currentQuestionIndex]}</p>
                <p className="text-gray-500 italic">{interimTranscript}</p>
              </motion.div>
            )}
          </div>
        </div>
      )}
      <AlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        onConfirm={handleConfirmGoBack}
        message="You will lose everything you have done till now. Are you sure you want to go back?"
      />
    </div>
  );
}

export default VoiceInterview;

