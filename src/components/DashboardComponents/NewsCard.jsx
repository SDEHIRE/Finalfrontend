import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const newsArticles = [
  {
    id: 1,
    title: "New Algorithm Challenge Released",
    content: "Test your skills with our latest dynamic programming challenge",
    image: "/placeholder.svg?height=200&width=400",
    date: "2024-01-04"
  },
  {
    id: 2,
    title: "Interview Prep Workshop",
    content: "Join our upcoming workshop on system design interviews",
    image: "/placeholder.svg?height=200&width=400",
    date: "2024-01-03"
  },
  {
    id: 3,
    title: "Competitive Programming Contest",
    content: "Register now for our monthly coding competition",
    image: "/placeholder.svg?height=200&width=400",
    date: "2024-01-02"
  }
];

export default function NewsCard() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % newsArticles.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + newsArticles.length) % newsArticles.length);
  };

  const currentArticle = newsArticles[currentIndex];

  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl overflow-hidden shadow-lg">
      <div key={currentArticle.id} className="p-8">
        <h2 className="text-xl font-semibold text-white mb-2">
          {currentArticle.title}
        </h2>

        <p className="text-white/90 mb-4">
          {currentArticle.content}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-sm text-white/70">
            {new Date(currentArticle.date).toLocaleDateString()}
          </p>
          <div className="flex gap-2">
            <button
              onClick={goToPrevious}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full"
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
            <button
              onClick={goToNext}
              className="p-2 bg-white/10 hover:bg-white/20 rounded-full"
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        <div className="mt-4 text-sm text-white/70">
          Article {currentIndex + 1} of {newsArticles.length}
        </div>
      </div>
    </div>
  );
}

