import React, { useState, useEffect } from "react"

const curriculumData = {
  "Up to 10 LPA": {
    title: "Up to 10 LPA (Entry-Level)",
    objective:
      "Equip new developers with the essential technical skills and soft skills required for entry-level positions.",
    topics: [
      {
        name: "Data Structures & Algorithms (Basic)",
        description: "Understand and implement basic data structures and algorithms.",
        content:
          "Topics: Arrays, Linked Lists, Stacks, Queues, Basic Sorting (Bubble, Selection, Insertion), and Searching Algorithms (Linear, Binary).\nProjects: Implement a contact management system using arrays and linked lists.",
      },
      {
        name: "Programming Fundamentals",
        description: "Gain proficiency in a programming language and understand fundamental programming concepts.",
        content:
          "Topics: Basic syntax of Python/Java, Control structures, Functions, and Basic error handling.\nProjects: Develop simple applications like a calculator or a basic blog system.",
      },
      {
        name: "Operating Systems",
        description: "Understand the basics of how operating systems work.",
        content:
          "Topics: Overview of OS, Processes, Threads, CPU Scheduling, and Basic Memory Management.\nWorkshops: Interactive labs to simulate process scheduling and memory allocation.",
      },
      {
        name: "Networking",
        description: "Grasp the fundamentals of computer networks.",
        content:
          "Topics: OSI Model, TCP/IP basics, Introduction to HTTP and DNS.\nActivities: Set up a small network and analyze traffic using tools like Wireshark.",
      },
      {
        name: "Version Control",
        description: "Understand version control using Git.",
        content:
          "Topics: Git basics, Common commands (commit, push, pull, merge).\nWorkshops: Hands-on session on Git with simulation of team collaboration.",
      },
      {
        name: "Soft Skills",
        description: "Develop communication and teamwork abilities.",
        content:
          "Topics: Effective communication, Team collaboration, Time management.\nActivities: Team projects, presentations, and time management games.",
      },
    ],
  },
  "Up to 20 LPA": {
    title: "Up to 20 LPA (Mid-Level)",
    objective:
      "Prepare developers for more complex challenges including system design and more advanced programming tasks.",
    topics: [
      {
        name: "Data Structures & Algorithms (Intermediate)",
        description: "Master intermediate to advanced data structures and more complex algorithms.",
        content:
          "Topics: Trees, Graphs, Heaps, Intermediate Sorting Techniques, Graph Algorithms (DFS, BFS, Dijkstra's Algorithm).\nProjects: Build a navigation system using graph algorithms.",
      },
      {
        name: "Advanced Programming Techniques",
        description: "Enhance skills in more advanced programming aspects and paradigms.",
        content:
          "Topics: Exception handling, Multithreading, and Object-Oriented Programming in depth.\nProjects: Develop a multi-threaded file downloader.",
      },
      {
        name: "Operating Systems",
        description: "Delve deeper into Operating System concepts and management.",
        content:
          "Topics: Advanced Memory Management, File Systems, Device Management.\nWorkshops: Kernel simulation exercises.",
      },
      {
        name: "Networking",
        description: "Achieve a deeper understanding of network protocols and security.",
        content:
          "Topics: Detailed study of protocols (HTTP, HTTPS, SMTP, FTP), Introduction to network security (Firewalls, VPNs).\nActivities: Setup and secure a small corporate network.",
      },
      {
        name: "Database Management",
        description: "Understand relational and non-relational database management systems.",
        content:
          "Topics: SQL, NoSQL, Database design, Transactions, and Concurrency control.\nProjects: Design and implement a database for an e-commerce platform.",
      },
      {
        name: "Design Patterns",
        description: "Learn to apply common design patterns to solve software design problems.",
        content:
          "Topics: Structural, Creational, and Behavioral patterns.\nActivities: Case studies to refactor existing code using design patterns.",
      },
      {
        name: "Soft Skills",
        description: "Enhance leadership and project management skills.",
        content:
          "Topics: Advanced communication, Conflict resolution, Project management fundamentals.\nActivities: Lead a small team in project planning and execution exercises.",
      },
    ],
  },
  "Up to 50 LPA": {
    title: "Up to 50 LPA (Senior-Level)",
    objective:
      "Prepare senior developers for leadership roles and complex problem-solving in large-scale environments.",
    topics: [
      {
        name: "Data Structures & Algorithms (Advanced)",
        description: "Master complex algorithms and data structures for high-performance and scalable solutions.",
        content:
          "Topics: Advanced tree structures (Red-Black Trees, AVL), Complex graph algorithms, Dynamic programming.\nProjects: Implement a real-time data processing engine using advanced algorithms.",
      },
      {
        name: "System Design",
        description: "Understand and design large-scale distributed systems.",
        content:
          "Topics: Architectural patterns, Scalability, Fault tolerance, Microservices.\nProjects: Design a scalable microservices-based application for a simulated enterprise environment.",
      },
      {
        name: "Operating Systems",
        description: "Explore advanced topics in operating systems.",
        content:
          "Topics: Kernel development, Advanced concurrency, Real-time systems.\nWorkshops: Develop a small operating system module.",
      },
      {
        name: "Networking",
        description: "Master advanced networking concepts and infrastructure management.",
        content:
          "Topics: Network design and architecture, Advanced security (Intrusion detection systems, Advanced cryptographic techniques).\nActivities: Design and secure network infrastructure for a large organization.",
      },
      {
        name: "Security",
        description: "Deep dive into cybersecurity and advanced protection techniques.",
        content:
          "Topics: Cryptography, Secure coding practices, Penetration testing.\nWorkshops: Conduct a security audit and penetration testing for a simulated company network.",
      },
      {
        name: "Project and Team Management",
        description: "Develop skills in managing large teams and complex projects.",
        content:
          "Topics: Strategic planning, Agile methodologies, Risk management.\nActivities: Lead a mock product from conception to market launch, managing a team.",
      },
      {
        name: "Soft Skills",
        description: "Master high-level negotiation, leadership, and strategic decision-making skills.",
        content:
          "Topics: Negotiation techniques, Advanced leadership skills, Strategic decision making.\nActivities: Role-play scenarios involving negotiations and strategy formulation.",
      },
    ],
  },
}

const staticInfo = `
Curriculum Enhancement for Software Development Engineers
To effectively update the curriculum for Software Development Engineers at various salary levels, it is essential to incorporate insights from current market trends, emerging technologies, and industry best practices. Below is a structured approach to enhancing the curriculum based on the specified salary levels.

For All Levels
Emerging Technologies

AI and Machine Learning: Integrate AI-powered development tools that assist in code generation and optimization. Tools like GitHub Copilot are becoming essential for speeding up development processes and improving code quality.
Low-Code/No-Code Platforms: Emphasize the use of platforms that allow rapid application development with minimal coding, catering to a broader audience.
Voice-Enabled Applications: Incorporate training on developing applications that utilize voice recognition and emotional intelligence to enhance user interaction.
Industry Standards

DevSecOps Practices: Embed security into every stage of the software development lifecycle, promoting a culture where security is a shared responsibility among all team members.
Agile Methodologies: Ensure that students are familiar with Agile practices, including Scrum and Kanban, to facilitate adaptive planning and iterative development.
Soft Skills

Communication and Collaboration: Strong emphasis on teamwork and effective communication skills, especially for those in leadership roles.
Critical Thinking and Problem Solving: Encourage analytical thinking to navigate complex challenges common in software development.
`

const goToLanding = () => {
  window.location.href = "/landing"
}

const CurriculumPage = () => {
  const [selectedPackage, setSelectedPackage] = useState("Up to 10 LPA")
  const [openAccordion, setOpenAccordion] = useState(null)

  useEffect(() => {
    // Prevent right-click context menu
    const handleContextMenu = (e) => e.preventDefault()
    document.addEventListener("contextmenu", handleContextMenu)

    // Prevent keyboard shortcuts for print and screenshot
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P" || e.key === "s" || e.key === "S")) {
        e.preventDefault()
      }
    }
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const handleAccordionToggle = (index) => {
    setOpenAccordion(openAccordion === index ? null : index)
  }

  const goToDashboard = () => {
    window.location.href = "/dashboard"
  }

  const goToGuided = () => {
    window.location.href = "/guided"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] to-[#e6f7ff] py-12 px-4 sm:px-6 lg:px-8 relative">
      <style jsx global>{`
        @media print {
          body {
            display: none;
          }
        }
        body {
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-extrabold text-[#054454]">
            Elevate Your Tech Journey with Our SDE Hire Mastery Curriculum
          </h1>
          <button
            onClick={goToDashboard}
            className="px-4 py-2 bg-[#02b1fc] text-white rounded-full hover:bg-[#0080ff] transition-colors duration-200 shadow-lg"
          >
            Go Back
          </button>
        </div>

        {/* Package Selection */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-[#0f678c] mb-6">Select Your Package</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {Object.keys(curriculumData).map((pkg) => (
              <button
                key={pkg}
                onClick={() => setSelectedPackage(pkg)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  selectedPackage === pkg
                    ? "bg-[#02b1fc] text-white shadow-lg transform scale-105"
                    : "bg-[#e6f7ff] text-[#0f678c] hover:bg-[#7ccddc] hover:shadow-md"
                }`}
              >
                {pkg}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={goToGuided}
              className="px-4 py-2 bg-[#02b1fc] text-white rounded-full hover:bg-[#0080ff] transition-colors duration-200 shadow-lg"
            >
              Steve's Guided Learning
            </button>
            <button
              onClick={goToLanding}
              className="px-4 py-2 bg-[#02b1fc] text-white rounded-full hover:bg-[#0080ff] transition-colors duration-200 shadow-lg"
            >
              Lisa's Landing Page
            </button>
          </div>
        </div>

        {/* Curriculum Overview */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-10 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-[#0f678c] mb-6">Curriculum Overview</h2>
          <div className="prose max-w-none">
            <p className="whitespace-pre-line text-[#054454] leading-relaxed">{staticInfo}</p>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={goToGuided}
              className="px-4 py-2 bg-[#02b1fc] text-white rounded-full hover:bg-[#0080ff] transition-colors duration-200 shadow-lg"
            >
              Steve's Guided Learning
            </button>
            <button
              onClick={goToLanding}
              className="px-4 py-2 bg-[#02b1fc] text-white rounded-full hover:bg-[#0080ff] transition-colors duration-200 shadow-lg"
            >
              Lisa's Landing Page
            </button>
          </div>
        </div>

        {/* Curriculum Details */}
        <div className="bg-white rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-[#0f678c] mb-6">{curriculumData[selectedPackage].title}</h2>
          <p className="text-lg text-[#054454] mb-8 leading-relaxed">{curriculumData[selectedPackage].objective}</p>
          <div className="space-y-6">
            {curriculumData[selectedPackage].topics.map((topic, index) => (
              <div
                key={index}
                className="border border-[#7ccddc] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
              >
                <button
                  onClick={() => handleAccordionToggle(index)}
                  className="w-full text-left px-6 py-4 bg-[#f0f9ff] hover:bg-[#e6f7ff] transition-colors duration-200 flex justify-between items-center"
                >
                  <span className="font-medium text-[#0f678c] text-lg">{topic.name}</span>
                  <svg
                    className={`w-6 h-6 text-[#02b1fc] transform transition-transform duration-200 ${
                      openAccordion === index ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openAccordion === index && (
                  <div className="px-6 py-4 bg-white">
                    <p className="text-[#2180a7] mb-4 font-medium">{topic.description}</p>
                    <p className="text-[#054454] whitespace-pre-line leading-relaxed">{topic.content}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={goToGuided}
              className="px-4 py-2 bg-[#02b1fc] text-white rounded-full hover:bg-[#0080ff] transition-colors duration-200 shadow-lg"
            >
              Steve's Guided Learning
            </button>
            <button
              onClick={goToLanding}
              className="px-4 py-2 bg-[#02b1fc] text-white rounded-full hover:bg-[#0080ff] transition-colors duration-200 shadow-lg"
            >
              Lisa's Landing Page
            </button>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={goToDashboard}
            className="px-6 py-3 bg-[#02b1fc] text-white rounded-full hover:bg-[#0080ff] transition-colors duration-200 shadow-lg inline-flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default CurriculumPage

