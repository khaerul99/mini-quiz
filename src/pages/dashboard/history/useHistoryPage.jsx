import React, { useEffect, useState } from 'react'
import { quizServices } from '../../../services/quiz/quizServices';
import toast from 'react-hot-toast';

export default function useHistoryPage() {
  const [historyData, setHistoryData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [stats, setStats] = useState({
    avgScore: 0,
    totalQuiz: 0,
    totalHours: 0,
  })

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true);
      try {
        const response = await quizServices.getHistory();
        const data = response.data?.results || [];

        const formattedData = data.map((item) => {
        const startDate = new Date(item.created_at || item.start_time);
        const totalSeconds = item.total_time_seconds || 0;

          const minutes = Math.floor(totalSeconds / 60);
          const seconds = totalSeconds % 60;

          const finalScore = Number(item.percentage ?? 0);

          return {
            id: item.session_id,
            subtest: item.subtest_name ||  "Unknown Quiz",
            score: finalScore,
            maxScore: 100, 
            passed: (item.score || 0) >= 50, 
            date: startDate.toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' }),
            time: startDate.toLocaleTimeString("id-ID", { hour: '2-digit', minute: '2-digit' }),
            duration: `${minutes} m ${seconds} s`,
            rawDuration: (item.total_time_seconds || 0) * 1000
          };
        })

        setHistoryData(formattedData);

        if (formattedData.length > 0) {
          const totalScore = formattedData.reduce((acc, curr) => acc + curr.score, 0);
          const totalMs = formattedData.reduce((acc, curr) => acc + curr.rawDuration, 0);
          
          setStats({
            avgScore: (totalScore / formattedData.length).toFixed(1),
            totalQuiz: formattedData.length,
            totalHours: (totalMs / (1000 * 60 * 60)).toFixed(1)
          });
        }

      } catch (error) {
        console.error("History Error:", error);
        toast.error("Gagal memuat riwayat kuis.");
      } finally {
        setIsLoading(false)
      }
    }

    fetchHistory();

  }, [])

  return {stats, isLoading, historyData}
}
