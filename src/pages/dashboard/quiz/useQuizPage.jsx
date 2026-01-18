import React, { useEffect } from "react";
import { useState } from "react";
import { useQuizStore } from "../../../store/useQuizStore";
import { useNavigate } from "react-router-dom";

export const useQuizList = () => {
  const { fetchSubtests, isLoading, error, subtests } = useQuizStore();

  useEffect(() => {
    fetchSubtests();
  }, []);

  return { isLoading, error, subtests };
};

export const useQuizAvtive = () => {
  const navigate = useNavigate();
  const { sessionId, userAnswers, setAnswer, questions, isLoading, finishQuiz } =
    useQuizStore();

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!questions || questions.length === 0) {
      navigate("/");
    }
  }, [questions, navigate]);

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const jumpToQuestion = (index) => {
    setCurrentIndex(index);
  };

  const handleFinish = () => {
      const isConfirmed = window.confirm("Apakah anda yakin ingin mengakhiri kuis? Jawaban tidak bisa diubah lagi.");
    
    if (isConfirmed) {
      finishQuiz(navigate); 
    }
  }

  return {
    questions,
    setAnswer,
    userAnswers,
    isLoading,
    nextQuestion,
    prevQuestion,
    jumpToQuestion,
    handleFinish,
    sessionId,
    currentIndex,
    currentQuestion: questions[currentIndex],
    totalQuestions: questions.length,
    
  };
};
