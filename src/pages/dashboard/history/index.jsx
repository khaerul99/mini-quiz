import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../../components/dashboard/layout";
import {
  Search,
  Calendar,
  Clock,
  Trophy,
  ChevronRight,
  Filter,
  Loader2,
  X,
} from "lucide-react";
import useHistoryPage from "./useHistoryPage";

export default function HistoryPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const { historyData, stats, isLoading } = useHistoryPage();
  const [selectedDate, setSelectedDate] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredData = historyData.filter((item) => {
    const matchesSearch = item.subtest
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    let matchesDate = true;
    if (selectedDate) {
      const itemDateObj = new Date(item.date);
      const filterDateObj = new Date(selectedDate);

      matchesDate =
        itemDateObj.getDate() === filterDateObj.getDate() &&
        itemDateObj.getMonth() === filterDateObj.getMonth() &&
        itemDateObj.getFullYear() === filterDateObj.getFullYear();
    }

    return matchesSearch && matchesDate;
  });

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 mb-6">
            Riwayat Aktivitas
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-linear-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg shadow-blue-200">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 rounded-lg">
                  <Trophy size={24} />
                </div>
                <div>
                  <p className="text-blue-100 text-sm">Rata-rata Skor</p>
                  <p className="text-2xl font-bold">{stats.avgScore}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                <Calendar size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Kuis Selesai</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.totalQuiz}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                <Clock size={24} />
              </div>
              <div>
                <p className="text-gray-500 text-sm">Total Jam Belajar</p>
                <p className="text-2xl font-bold text-gray-800">
                  {stats.totalHours}{" "}
                  <span className="text-sm font-normal text-gray-400">Jam</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-10">
          <div className="relative w-full sm:w-96">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Cari mata pelajaran..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex relative flex-col items-center gap-2">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition
                        ${
                          isFilterOpen || selectedDate
                            ? "bg-blue-50 border-blue-200 text-blue-600"
                            : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                        }`}
            >
              <Filter size={18} />
              <span className="text-sm font-medium">
                {selectedDate ? "Filter Aktif" : "Filter Tanggal"}
              </span>
            </button>
            {isFilterOpen && (
              <div className="absolute top-10 items-center gap-2 bg-white border border-gray-300 rounded-lg px-2 py-1 animate-in fade-in duration-300">
                <input
                  type="date"
                  className="outline-none text-sm text-gray-600"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                />

                {selectedDate && (
                  <button
                    onClick={() => setSelectedDate("")}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* History List */}
        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden min-h-75">
          {isLoading ? (
            // --- LOADING STATE ---
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <Loader2 className="animate-spin mb-2" size={32} />
              <p>Memuat riwayat...</p>
            </div>
          ) : filteredData.length > 0 ? (
            // --- DATA ADA ---
            <div className="divide-y divide-gray-100">
              {filteredData.map((item) => (
                <div
                  key={item.id}
                  className="p-5 hover:bg-gray-50 transition cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group"
                >
                  {/* Info Kuis */}
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0
                                    ${item.passed ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}
                    >
                      {Math.round(item.score)}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 group-hover:text-blue-600 transition">
                        {item.subtest}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} /> {item.date} • {item.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {item.duration}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Status & Action */}
                  <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto mt-2 md:mt-0">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                                    ${item.passed ? "bg-green-50 text-green-700 border border-green-100" : "bg-red-50 text-red-700 border border-red-100"}`}
                    >
                      {item.passed ? "Lulus" : "Remedial"}
                    </span>

                    <button
                      onClick={() => navigate(`/quiz/result/${item.id}`)}
                      className="flex items-center text-gray-400 group-hover:text-blue-600 transition"
                    >
                      <span className="text-sm font-medium mr-2 hidden md:block">
                        Detail
                      </span>
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-10 text-center">
              <div className="inline-flex p-4 bg-gray-100 rounded-full text-gray-400 mb-4">
                <Search size={32} />
              </div>
              <h3 className="text-lg font-medium text-gray-900">
                Belum ada riwayat
              </h3>
              <p className="text-gray-500">
                Anda belum mengerjakan kuis apapun.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
