import React from 'react';
import { CheckCircle, XCircle, Clock, Home, History, Calendar, AlertCircle, Loader2 } from 'lucide-react';
import useResultPage from './useResultPage';
import Layout from '../../../components/dashboard/layout';


export default function ResultPage() {
   const { resultData, navigate, isLoading  } = useResultPage();

   if (isLoading) {
    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
                <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
                <p className="text-gray-500 font-medium">Sedang menghitung nilai...</p>
            </div>
        </Layout>
    );
  }

  if (!resultData) {
    return (
        <Layout>
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 text-center">
                <AlertCircle className="text-red-500 mb-4" size={50} />
                <h2 className="text-xl font-bold text-gray-800">Data Tidak Ditemukan</h2>
                <p className="text-gray-500 mb-6">Hasil kuis tidak tersedia atau ID sesi salah.</p>
                <button onClick={() => navigate('/history')} className="px-6 py-2 bg-blue-600 text-white rounded-lg">
                    Kembali ke History
                </button>
            </div>
        </Layout>
    );
  }

  // const themeColor = resultData.passed ? 'green' : 'red';
  const scoreColor = resultData.passed ? 'text-emerald-600' : 'text-rose-600';
  const ringColor = resultData.passed ? 'border-emerald-100' : 'border-rose-100';
  const bgColor = resultData.passed ? 'bg-emerald-50' : 'bg-rose-50';
 

  return (
   <Layout>
    <div className="bg-gray-50/50 py-10 px-4 min-h-125 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        
        {/* Main Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden relative">
          
          {/* Header Section: Date & Subject */}
          <div className="p-8 pb-0 text-center relative z-10">
            <div className="flex items-center justify-center gap-2 text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">
              <Calendar size={14} />
              <span>{resultData.date}</span>
              <span>•</span>
              <span>{resultData.time}</span>
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              {resultData.subtestName}
            </h1>
            <p className="text-gray-500 text-sm">Hasil Evaluasi Kemampuan</p>
          </div>

          {/* Score Section: Big Circle */}
          <div className="py-10 flex flex-col items-center justify-center relative">
            {/* Background Glow Effect */}
            <div className={`absolute w-32 h-32 rounded-full blur-3xl opacity-20 ${bgColor}`}></div>

            <div className={`relative w-48 h-48 rounded-full flex flex-col items-center justify-center border-10 ${ringColor} ${bgColor} transition-transform hover:scale-105 duration-500`}>
              <span className={`text-6xl font-extrabold tracking-tighter ${scoreColor}`}>
                {resultData.score}
              </span>
              <span className="text-gray-400 text-sm font-medium mt-1">
                dari 100
              </span>
            </div>

            {/* Status Message */}
            <div className={`mt-6 px-6 py-2 rounded-full text-sm font-semibold border ${resultData.passed 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
              : 'bg-rose-50 text-rose-700 border-rose-100'}`}>
              {resultData.passed ? "Kompetensi Sangat Baik" : "Jangan menyerah, coba lagi!"}
            </div>
          </div>

          {/* Stats Grid: Modern Bento Box Style */}
          <div className="p-6 bg-gray-50/50 border-t border-gray-100">
            <div className="grid grid-cols-3 gap-4">
              
              {/* Benar */}
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-2">
                  <CheckCircle size={20} />
                </div>
                <span className="text-2xl font-bold text-gray-800">{resultData.correct}</span>
                <span className="text-xs text-gray-400 font-medium uppercase mt-1">Benar</span>
              </div>

              {/* Salah */}
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600 mb-2">
                  <XCircle size={20} />
                </div>
                <span className="text-2xl font-bold text-gray-800">{resultData.wrong}</span>
                <span className="text-xs text-gray-400 font-medium uppercase mt-1">Salah</span>
              </div>

              {/* Waktu */}
              <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-2">
                  <Clock size={20} />
                </div>
                <span className="text-lg font-bold text-gray-800 mt-1">{resultData.duration}</span>
                <span className="text-xs text-gray-400 font-medium uppercase mt-1">Waktu</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
    </Layout>
  );
}