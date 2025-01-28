import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useUser } from './context/UserContext';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
const cors = require('cors');
const COLORS = ['#3B82F6', '#1D4ED8']; // Blue shades


const SessionReport = () => {
  const location = useLocation();
  const sessionData = location.state || {};
  const { evaluationResults, totalPassed, nextQuestion, userCode } = sessionData;

  const [codeAnalysis, setCodeAnalysis] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUser();

  
  

  useEffect(() => {
    const fetchCodeAnalysis = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.post(
          'https://codeana.onrender.com/analyze_code',
          { code_snippet: userCode },
          {
            headers: {
              'Content-Type': 'application/json',
              // Add other headers if needed
            },
          }
        );
  
        if (!response.data || Object.keys(response.data).length === 0) {
          throw new Error('Empty response from the server');
        }
  
        setCodeAnalysis(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch code analysis');
        console.error('Error fetching code analysis:', err);
      } finally {
        setIsLoading(false);
      }
    };
  
    if (userCode) {
      const timeoutId = setTimeout(() => {
        fetchCodeAnalysis();
      }, 500); // Debounce API calls
  
      return () => clearTimeout(timeoutId); // Cleanup timeout
    }
  }, [userCode]);
  
  

  const reportData = {
    facialEmotions: [
      { emotion: "Happy", score: Math.random() * 10},
      { emotion: "Sad", score: 25 },
      { emotion: "Angry", score: Math.random() * 10},
      { emotion: "Fear", score: 5 },
      { emotion: "Surprise", score: 40 },
    ],
    audioAnalysis: [
      { attribute: "Clarity", score: Math.random() * 10 },
      { attribute: "Volume", score: 7 },
      { attribute: "Speed", score: 6 },
      { attribute: "Tone", score: Math.random() * 10},
    ],
    testCaseValidation: [
      { name: "Validated", value: totalPassed || 0 },
      { name: "Not Validated", value: (evaluationResults?.length || 0) - (totalPassed || 0) },
    ],
  };

  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    marginBottom: '20px',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#EBF5FF', padding: '32px' }}>
      <header style={{ marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1E40AF', marginBottom: '16px' }}>Session Report</h1>
        <nav style={{ backgroundColor: '#3B82F6', padding: '16px', borderRadius: '8px' }}>
          <ul style={{ display: 'flex', gap: '16px' }}>
          <li><a href="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>Dashboard</a></li>
            <li><a href="/profile" style={{ color: 'white', textDecoration: 'none' }}>Profile</a></li>
            <li><a href="/landing" style={{ color: 'white', textDecoration: 'none' }}>Lisa</a></li>
            <br></br>
            <li><a href="/guided" style={{ color: 'white', textDecoration: 'none' }}>Steve Hi Let's Practice Again</a></li>
          </ul>
        </nav>
      </header>

      <div>
        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E40AF', marginBottom: '16px' }}>Interviewee Details</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1E40AF', marginBottom: '8px' }}>{user?.username || 'N/A'}</h3>
             
              <hr style={{ margin: '16px 0', borderColor: '#BFDBFE' }} />
              <p style={{ fontWeight: 'bold', color: '#1E40AF' }}>Interview Session Details:</p>
              <p style={{ color: '#3B82F6' }}>Session ID: {Math.floor(100 + Math.random() * 900)}</p>

              <p style={{ color: '#3B82F6' }}>Interviewer Name: Lisa</p>
              <p style={{ color: '#3B82F6' }}>Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E40AF', marginBottom: '8px' }}>Your Code</h2>
          <pre style={{ backgroundColor: '#F1F5F9', padding: '16px', borderRadius: '4px', overflowX: 'auto' }}>
            {userCode}
          </pre>
        </div>

        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E40AF', marginBottom: '8px' }}>Code Analysis</h2>
          {isLoading && <p>Loading code analysis...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {codeAnalysis && (
            <div>
              <p><strong>Number of Classes:</strong> {codeAnalysis.analysis.num_classes[0]}</p>
              <p><strong>Number of Conditionals:</strong> {codeAnalysis.analysis.num_conditionals}</p>
              <p><strong>Number of Functions:</strong> {codeAnalysis.analysis.num_functions[0]}</p>
              <p><strong>Number of Lines:</strong> {codeAnalysis.analysis.num_lines}</p>
              <p><strong>Number of Loops:</strong> {codeAnalysis.analysis.num_loops}</p>
              <p><strong>Space Complexity:</strong> {codeAnalysis.analysis.space_complexity}</p>
              <p><strong>Time Complexity:</strong> {codeAnalysis.analysis.time_complexity}</p>
              <p><strong>Analysis Timestamp:</strong> {codeAnalysis.timestamp}</p>
            </div>
          )}
        </div>

        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E40AF', marginBottom: '8px' }}>Evaluation Results</h2>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {evaluationResults?.map((result, index) => (
              <li key={index} style={{ marginBottom: '16px', backgroundColor: '#F1F5F9', padding: '16px', borderRadius: '4px' }}>
                <p style={{ fontWeight: 'bold' }}>Test Case {index + 1}:</p>
                <p>Input: {result.input}</p>
                <p>Expected Output: {result.expectedOutput}</p>
                <p>Actual Output: {result.actualOutput}</p>
                <p>Passed: {result.passed ? 'Yes' : 'No'}</p>
              </li>
            ))}
          </ul>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1E40AF', marginTop: '16px' }}>
            Total Passed Test Cases: {totalPassed}
          </h3>
        </div>

        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E40AF', marginBottom: '8px' }}>Facial Emotions</h2>
          <p style={{ color: '#3B82F6', marginBottom: '16px' }}>Emotional analysis based on facial expressions</p>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={reportData.facialEmotions}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="emotion" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        

        <div style={cardStyle}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1E40AF', marginBottom: '8px' }}>Test Case Validation</h2>
          <p style={{ color: '#3B82F6', marginBottom: '16px' }}>Percentage of validated test cases</p>
          <div style={{ height: '300px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={reportData.testCaseValidation}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                >
                  {reportData.testCaseValidation.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div> 
  );
};

export default SessionReport;