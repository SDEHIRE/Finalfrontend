import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionDisplayProps {
  text: string;
  isSpeaking: boolean;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ text, isSpeaking }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (isSpeaking && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1));
        setCurrentIndex(currentIndex + 1);
      }, 50); // Adjust this value to change the speed of text reveal

      return () => clearTimeout(timer);
    }
  }, [isSpeaking, currentIndex, text]);

  useEffect(() => {
    if (!isSpeaking) {
      setDisplayedText(text);
      setCurrentIndex(text.length);
    }
  }, [isSpeaking, text]);

  return (
    <AnimatePresence>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {displayedText}
      </motion.p>
    </AnimatePresence>
  );
};

export default QuestionDisplay;

