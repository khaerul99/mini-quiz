import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../../components/dashboard/layout';
import { Search, Calendar, Clock, Trophy, ChevronRight, Filter } from 'lucide-react';

export default function HistoryPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // DUMMY DATA (Simulasi response dari API /quiz/history)
  const historyData = [
    {
      id: "sess_001",
      subtest: "Pengetahuan Umum",
      score: 85,
      maxScore: 100,
      passed: true,
      date: "14 Jan 2026",
      time: "10:30",
      duration: "12m 30s",
    },
    {
      id: "sess_002",
      subtest: "Matematika Dasar",
      score: 40,
      maxScore: 100,
      passed: false,
      date: "13 Jan 2026",
      time: "14:15",
      duration: "28m 10s",
    },
    {
      id: "sess_003",
      subtest: "Bahasa Inggris",
      score: 90,
      maxScore: 100,
      passed: true,
      date: "12 Jan 2026",
      time: "09:00",
      duration: "18m 45s",
    },
    {
      id: "sess_004",
      subtest: "Logika Aritmatika",
      score: 65,
      maxScore: 100,
      passed: false, // Misal KKM 70
      date: "10 Jan 2026",
      time: "16:20",
      duration: "30m 00s",
    },
  ];

  // Filter data berdasarkan search
  const filteredData = historyData.filter(item => 
    item.subtest.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* 1. Header & Statistik Ringkas */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Riwayat Aktivitas</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg shadow-blue-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Trophy size={24} />
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Rata-rata Skor</p>
                  <p className="text-2xl font-bold">70.0</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Kuis Selesai</p>
                <p className="text-2xl font-bold text-gray-800">12</p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Jam Belajar</p>
                <p className="text-2xl font-bold text-gray-800">4.5 <span className="text-sm font-normal text-gray-400">Jam</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input 
                    type="text" 
                    placeholder="Cari mata pelajaran..." 
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <Filter size={18} />
                <span className="text-sm font-medium">Filter Tanggal</span>
            </button>
        </div>

        {/* History List */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            {filteredData.length > 0 ? (
                <div className="divide-y divide-gray-100">
                    {filteredData.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => navigate(`/result/${item.id}`)}
                            className="p-5 hover:bg-gray-50 transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                        >
                            {/* Left: Info Kuis */}
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg
                                    ${item.passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                    {item.score}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition">{item.subtest}</h3>
                                    <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                        <span className="flex items-center gap-1">
                                            <Calendar size={14} /> {item.date}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock size={14} /> {item.duration}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-2 md:mt-0">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold
                                    ${item.passed ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
                                    {item.passed ? 'Lulus' : 'Tidak Lulus'}
                                </span>
                                
                                <div className="flex items-center text-gray-400 group-hover:text-blue-600 transition">
                                    <span className="text-sm font-medium mr-2 hidden md:block">Detail</span>
                                    <ChevronRight size={20} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                
                <div className="p-10 text-center">
                    <div className="inline-flex p-4 bg-gray-100 rounded-full text-gray-400 mb-4">
                        <Search size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Tidak ditemukan</h3>
                    <p className="text-gray-500">Coba cari dengan kata kunci lain.</p>
                </div>
            )}
        </div>
        
        <div className="flex justify-center pt-4">
            <button className="text-sm text-gray-500 hover:text-blue-600 font-medium">
                Muat Lebih Banyak
            </button>
        </div>

      </div>
    </Layout>
  );
}