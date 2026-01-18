import React from "react";
import Layout from "../../../components/dashboard/layout";
// import useQuizPage from "./useQuizPage";
import { Clock, ChevronRight, ChevronLeft, CheckCircle } from "lucide-react";
import { Flag } from "lucide-react";
import { useQuizAvtive } from "./useQuizPage";
import QuizTimer from "./quizTimer";


export default function QuizPage() {
  const {setAnswer, userAnswers, questions, isLoading, prevQuestion, nextQuestion, jumpToQuestion, currentIndex, currentQuestion, totalQuestions, handleFinish} = useQuizAvtive();
  

  if (isLoading || !currentQuestion) {
    return <div className="h-screen flex items-center justify-center">Memuat Soal...</div>;
  }

  const questionNumber = currentQuestion.question_number; 
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  const allAnswered = Object.keys(userAnswers).length === questions.length;

  return (
    //    <Layout>
    <div className="min-h-screen bg-white flex flex-col">
      <header className="px-6 py-4 border-b flex justify-between items-center sticky top-0 bg-white z-10">
        <div>
          <span className="text-sm text-gray-500 uppercase tracking-wider">
            Soal {currentIndex + 1} dari {totalQuestions}
          </span>
          <div className="w-full h-2.5 bg-gray-100 rounded-full mt-2 overflow-hidden">
            <div 
              className="h-full bg-blue-600 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1 rounded-full font-mono font-bold">
          <Clock size={18} />
          <QuizTimer/>
        </div>
      </header>

      <div className=" w-full p-4 md:p-6 flex flex-col md:flex-row gap-6 md:gap-8">
       
        <main className="flex-1 bg-white p-6  rounded-xl border border-gray-200 shadow-sm">
    
            <div className="flex justify-between items-start mb-6">
              <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                Soal No. {questionNumber}
              </span>
              <button
                className="text-gray-400 hover:text-yellow-500 transition"
                title="Tandai Ragu-ragu"
              >
                <Flag size={20} />
              </button>
            </div>

            <h2 className="text-sm lg:text-lg font-medium text-gray-800 mb-8 leading-relaxed">
              {currentQuestion.question_text}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((opt, index) => {
                const answerLabel = String.fromCharCode(65 + index); 
   
                const isSelected = userAnswers[questionNumber] === answerLabel;
                
                  return(
                <button
                  key={index}
                  onClick={() => setAnswer(questionNumber, answerLabel)}
                  className={` relative w-full text-left p-4 rounded-xl border-2 transition-all flex items-center group ${
                    isSelected
                      ? "border-blue-600 bg-blue-50 text-blue-800 font-medium"
                      : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                  }`}
                >
                  <span
                    className={`flex items-center justify-center w-8 h-8 rounded-lg mr-4 text-sm font-bold transition-colors ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-blue-500"
                    }`}
                  >
                   {answerLabel}
                  </span>
                  <span className="font-medium">{opt}</span>

                    {isSelected && (
                        <CheckCircle className="absolute right-4 text-blue-600 animate-in zoom-in" size={20} />
                    )}
                </button>
                  )
                })}
          </div>

          <div className="mt-10 pt-6 border-t flex justify-between items-center">
            <button
              onClick={prevQuestion}
              className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg flex items-center gap-2 disabled:opacity-50 font-medium transition"
            >
              <ChevronLeft size={20} /> Sebelumnya
            </button>

            <button
              onClick={nextQuestion}
              className="px-4 py-2 bg-blue-200 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white shadow-lg shadow-blue-200 flex items-center gap-2 font-medium transition transform active:scale-95"
            >
              Selanjutnya <ChevronRight size={20} />
            </button>
          </div>
        </main>

        <aside className="w-full md:w-80 md:sticky top-24">
          <div className="bg-white p-6  rounded-xl border border-gray-200 shadow-sm">
            <h3 className="text-gray-800 font-bold mb-4">Navigasi Soal</h3>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, i) => {

                const qNum = q.question_number;
                const isAnswered = !!userAnswers[qNum]; 
                const isCurrent = i === currentIndex;

                return (
               <button
                    key={i}
                    onClick={() => jumpToQuestion(i)} 
                    className={`h-10 w-full rounded-lg text-sm font-bold border transition-all flex items-center justify-center
                      ${isCurrent 
                        ? "border-blue-600 bg-blue-200 text-blue-600 ring-2 ring-blue-200" 
                        : isAnswered 
                            ? "bg-green-200 text-green-600 border-green-600" 
                            : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
                      }
                    `}
                  >
                    {i + 1}
                  </button>
              )})}
            </div>

            <div className="mt-6 pt-4 border-t space-y-2">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-3 h-3 bg-blue-200 rounded-full"></div>{" "}
                Sekarang
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-3 h-3 bg-green-200 rounded-full"></div> Sudah
                Dijawab
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <div className="w-3 h-3 border border-gray-300 rounded-full"></div>{" "}
                Belum Dijawab
              </div>
            </div>

            <button onClick={handleFinish} disabled={!allAnswered} className="w-full mt-6 bg-green-200 text-green-600 py-2.5 rounded-lg hover:bg-green-500 hover:text-white font-semibold shadow-lg shadow-green-100 transition">
              Selesai & Submit
            </button>
          </div>
        </aside>
      </div>
    </div>
    //    </Layout>
  );
}
