import React, { useEffect } from "react";
import { useState } from "react";
import { useQuizStore } from "../../../store/useQuizStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useQuizList = () => {
  const { fetchSubtests, isLoading, error, subtests } = useQuizStore();

  useEffect(() => {
    fetchSubtests();
  }, [fetchSubtests]);

  return { isLoading, error, subtests };
};

export const useQuizAvtive = () => {
  const navigate = useNavigate();
  const {
    sessionId,
    userAnswers,
    setAnswer,
    questions,
    isLoading,
    finishQuiz,
  } = useQuizStore();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalConfirm, setModalConfirm] = useState(false);

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

  const openModalConfirm = () => {
    setModalConfirm(true);
  };

  const handleFinish = async () => {
    try {
      const response = await finishQuiz();

      const id = response?.session_id || sessionId;

      localStorage.removeItem("quiz-session-active");
      toast.success("Quiz berhasil disubmit!");
      navigate(`/quiz/result/${id}`);
    } catch (err) {
      if (err.response?.status === 400) {
        toast.error("Waktu habis. Sesi ditutup otomatis.");
      } else {
        toast.error("Terjadi kesalahan saat submit, kembali ke menu utama.");
      }
    }
  };

  return {
    questions,
    setAnswer,
    userAnswers,
    isLoading,
    modalConfirm,
    openModalConfirm,
    setModalConfirm,
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
