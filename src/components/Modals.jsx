import React from 'react';

export const InstructionsModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">Interview Instructions</h2>
      <p>Welcome to the interview! Here are some instructions to help you get started:</p>
      <ul className="list-disc pl-5 space-y-2 mt-2">
        <li>Make sure your camera and microphone are working.</li>
        <li>Read the problem statement carefully before starting.</li>
        <li>Use the code pad to write and test your code.</li>
        <li>Click "Submit" to submit your code when ready.</li>
        <li>If you need hints, click on the hint buttons provided.</li>
      </ul>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  </div>
);

export const HintModal = ({ hint, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-md w-full">
      <h2 className="text-xl font-bold mb-4">Hint</h2>
      <p>{hint}</p>
      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Close
      </button>
    </div>
  </div>
);

