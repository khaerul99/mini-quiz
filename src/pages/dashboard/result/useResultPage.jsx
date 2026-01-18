import React from 'react'
import { useNavigate } from 'react-router-dom'



export default function useResultPage() {
    const navigate = useNavigate();

  const result = {
    score: 80,
    totalQuestions: 10,
    correct: 8,
    wrong: 2,
    timeSpent: "12 Menit 30 Detik",
    subtestName: "Pengetahuan Umum",
    passed: true, 
    review: [
      {
        number: 1,
        question: "Apa ibukota dari Indonesia?",
        yourAnswer: "Jakarta",
        correctAnswer: "Jakarta",
        isCorrect: true,
      },
      {
        number: 2,
        question: "Siapa penemu lampu pijar?",
        yourAnswer: "Nikola Tesla", 
        correctAnswer: "Thomas Alva Edison",
        isCorrect: false,
      },
      
    ]
  };
  return { navigate, result }
}
