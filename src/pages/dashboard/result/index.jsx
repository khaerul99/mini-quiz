import React from 'react';
import { CheckCircle, XCircle, Clock, Home, History } from 'lucide-react';
import useResultPage from './useResultPage';
import Layout from '../../../components/dashboard/layout';


export default function ResultPage() {
   const { result, navigate } = useResultPage();
 

  return (
   <Layout>
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden text-center p-8 md:p-12 relative">
         
          <div className={`absolute top-0 left-0 w-full h-2 ${result.passed ? 'bg-green-500' : 'bg-red-500'}`}></div>

          <h1 className="text-gray-500 font-medium uppercase tracking-widest text-sm mb-2">Hasil Kuis Anda</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{result.subtestName}</h2>

        
          <div className="flex justify-center mb-8">
            <div className={`w-40 h-40 rounded-full flex flex-col items-center justify-center border-8 
              ${result.passed ? 'border-green-100 bg-green-50 text-green-600' : 'border-red-100 bg-red-50 text-red-600'}`}>
              <span className="text-5xl font-extrabold">{result.score}</span>
              <span className="text-sm font-medium text-gray-500 mt-1">/ 100</span>
            </div>
          </div>

          <p className={`text-lg font-medium mb-8 ${result.passed ? 'text-green-600' : 'text-red-500'}`}>
            {result.passed ? "Selamat! Kompetensi Sangat Baik." : "Jangan menyerah, coba lagi!"}
          </p>

          <div className="grid grid-cols-3 gap-4 border-t pt-8">
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-green-600 mb-1">
                <CheckCircle size={20} />
                <span className="font-bold text-xl">{result.correct}</span>
              </div>
              <span className="text-xs text-gray-400">Benar</span>
            </div>
            <div className="flex flex-col items-center border-l border-r border-gray-100">
              <div className="flex items-center gap-2 text-red-500 mb-1">
                <XCircle size={20} />
                <span className="font-bold text-xl">{result.wrong}</span>
              </div>
              <span className="text-xs text-gray-400">Salah</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-blue-600 mb-1">
                <Clock size={20} />
                <span className="font-bold text-sm">12m</span>
              </div>
              <span className="text-xs text-gray-400">Waktu</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition"
          >
            <Home size={18} /> Ke Dashboard
          </button>
          <button 
            onClick={() => navigate('/history')} 
            className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium shadow-lg shadow-blue-200 transition"
          >
            <History size={18} /> History
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b bg-gray-50">
            <h3 className="font-bold text-gray-800">Review Jawaban</h3>
          </div>
          
          <div className="divide-y">
            {result.review.map((item, index) => (
              <div key={index} className="p-6 hover:bg-gray-50 transition">
                <div className="flex gap-4">
                  <div className={` w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mt-1
                    ${item.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {item.number}
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-gray-800 font-medium mb-3">{item.question}</p>
                    
                    <div className="space-y-2 text-sm">
                      <div className={`flex items-center gap-2 ${item.isCorrect ? 'text-green-700' : 'text-red-600'}`}>
                        <span className="w-24 text-gray-400 text-xs uppercase">Jawabanmu:</span>
                        {item.isCorrect ? <CheckCircle size={16}/> : <XCircle size={16}/>}
                        <span className="font-medium">{item.yourAnswer}</span>
                      </div>

                      {/* Jawaban Benar (Hanya muncul jika salah) */}
                      {!item.isCorrect && (
                        <div className="flex items-center gap-2 text-green-700">
                          <span className="w-24 text-gray-400 text-xs uppercase">Jawaban Benar:</span>
                          <CheckCircle size={16}/>
                          <span className="font-medium">{item.correctAnswer}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
    </Layout>
  );
}