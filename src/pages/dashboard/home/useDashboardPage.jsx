import React, { useEffect, useState } from "react";
import { useQuizStore } from "../../../store/useQuizStore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useQuizList } from "../quiz/useQuizPage";
import { Calculator, BookOpen, PenTool, BrainCircuit } from "lucide-react";
import { quizServices } from "../../../services/quiz/quizServices";
import { useAuthStore } from "../../../store/useAuthStore";

export default function useDashboardPage() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user)
  const startSession = useQuizStore((state) => state.startSession);
  const resumeSession = useQuizStore((state) => state.resumeSession);
  const resetQuiz = useQuizStore((state) => state.resetQuiz);
  
  const { subtests, isLoading: isSubtestLoading, error: isErrorSubtest } = useQuizList();
  const [hasActiveSession, setHasActiveSession] = useState(false);

  const showSkeleton = isSubtestLoading && subtests.length === 0;

  const showData = subtests.length > 0;



 useEffect(() => {
    const checkSession = async () => {
      const handleClearSession = () => {
        setHasActiveSession(false);
        localStorage.removeItem("quiz-session-active"); 
        localStorage.removeItem("quiz-storage");
        resetQuiz();
    };

      const localFlag = localStorage.getItem("quiz-session-active");
      if (!localFlag) {
          return; 
      }

      try {
        const { data } = await quizServices.getActiveSession();
        
        const isExpired = new Date(data?.expires_at).getTime() <= Date.now();

        if (data?.session_id && !isExpired) {
           setHasActiveSession(true);
        } else {
          
           handleClearSession();
        }

      } catch  {
        handleClearSession();
      }
    };

   

    checkSession();
  }, [resetQuiz]); 

  const handleStart = async (id) => {
     if (!user?.is_verified) {
        toast.error("Harap verifikasi email Anda terlebih dahulu untuk memulai kuis!", {
           icon: '🔒',
           duration: 4000,
         });
         return; 
      }
      const toastId = toast.loading("Menuggu Soal");

    try {
      const response = await startSession(id);
      const data = response;

     

      const slug = data.generatedSlug;
      

      localStorage.setItem("quiz-session-active", "true");
      toast.dismiss(toastId);
      toast.success("Quiz dimulai...");
      navigate(`/quiz/active/${slug}`);
    } catch (err) {
      console.log();

      const msg =
        err.response?.data?.error.message || err.response?.data?.error;
      console.error(msg);
    }
  };

  const handleResume = async () => {
   const toastId = toast.loading("Kembali mengerjakan soal...");

    try {
      const response = await resumeSession();
      const data = response;

      const slug = data.generatedSlug;
      toast.dismiss(toastId);

      toast.success("Quiz dimulai...");
      navigate(`/quiz/active/${slug}`);
    } catch (err) {
      console.log(err);
    }
  };

  const getCategoryStyle = (name) => {
    const lowerName = name.toLowerCase();

    if (lowerName.includes("matematika")) {
      return {
        icon: <Calculator size={24} />,
        color: "bg-blue-100 text-blue-600",
        border: "border-blue-200",
      };
    }
    if (lowerName.includes("inggris") || lowerName.includes("bacaan")) {
      return {
        icon: <BookOpen size={24} />,
        color: "bg-yellow-100 text-yellow-600",
        border: "border-yellow-200",
      };
    }
    if (lowerName.includes("menulis") || lowerName.includes("pbm")) {
      return {
        icon: <PenTool size={24} />,
        color: "bg-purple-100 text-purple-600",
        border: "border-purple-200",
      };
    }
    return {
      icon: <BrainCircuit size={24} />,
      color: "bg-gray-100 text-gray-600",
      border: "border-gray-200",
    };
  };

  return {
    handleStart,
    handleResume,
    getCategoryStyle,
    hasActiveSession,
    subtests,
    isSubtestLoading,
    isErrorSubtest,
    showSkeleton,
    showData,
  };
}
