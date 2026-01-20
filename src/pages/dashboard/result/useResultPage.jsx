import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { quizServices } from "../../../services/quiz/quizServices";
import toast from "react-hot-toast";

export default function useResultPage() {
  const navigate = useNavigate();
  const params = useParams();
  const sessionId = params.sessionId || params.subtestId;

  const [resultData, setResultData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchResult = async () => {
      setIsLoading(true);
      try {
        const response = await quizServices.getResult(sessionId);
        const data = response.data.result;

        const totalQuestions = data.total_questions || 0;
        const correct = Number(data.correct_answers || 0);
        const wrong = totalQuestions - correct;
        const totalSeconds = data.total_time_seconds || 0;
        const score = Number(data.percentage ?? data.score ?? 0);
        const startDate = new Date (data.created_at)

        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60

        const formattedResult = {
          subtestName: data.subtest_name || "Detail Kuis",
          score: score,
          passed: score >= 50,
          correct: correct,
          wrong: Math.max(0, wrong),
          total: totalQuestions,
          date: startDate.toLocaleDateString("id-ID", {day: "numeric", month: "short", year: "numeric"}),
          time: startDate.toLocaleTimeString("id-ID", {hour: "2-digit", minute: "2-digit"}) ,
          duration: `${minutes} m ${seconds}`,

        };

        setResultData(formattedResult);
      } catch (error) {
        console.error("Fetch Result Error:", error);
        toast.error("Gagal memuat hasil kuis.");
        setResultData(null);
      } finally {
        setIsLoading(false);
      }
    };
    if (sessionId) {
      fetchResult();
    }
  }, [sessionId, navigate]);

  return { navigate, resultData, isLoading };
}
