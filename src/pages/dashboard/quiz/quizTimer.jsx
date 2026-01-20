import React, { useEffect, useState, useRef } from "react";
import { useQuizStore } from "../../../store/useQuizStore";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function QuizTimer() {
  const navigate = useNavigate();
  const endTime = useQuizStore((state) => state.endTime);
  const finishQuiz = useQuizStore((state) => state.finishQuiz);
  
  const [timeLeft, setTimeLeft] = useState(0);
  const hasExpiredRef = useRef(false); 

  useEffect(() => {
    if (!endTime) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const end = new Date(endTime).getTime();
      const distance = end - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTimeLeft(0);

        if (!hasExpiredRef.current) {
            hasExpiredRef.current = true;
            
            toast.error("Waktu Habis! Sesi Berakhir.", { duration: 3000 });
            
            finishQuiz();
            navigate("/history") 
        }

      } else {
        setTimeLeft(distance);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime, finishQuiz, navigate]); 

  // Format MM:SS
  const formatTime = (ms) => {
    if (ms <= 0) return "00:00";
    const minutes = Math.floor((ms / (1000 * 60)) % 60);
    const seconds = Math.floor((ms / 1000) % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const isCritical = timeLeft < 60000;

  return (
    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl font-bold border transition-colors ${
        isCritical 
        ? "bg-red-50 text-red-600 border-red-200 animate-pulse" 
        : "bg-blue-50 text-blue-600 border-blue-200"
    }`}>
      <Clock size={20} />
      <span>{formatTime(timeLeft)}</span>
    </div>
  );
}