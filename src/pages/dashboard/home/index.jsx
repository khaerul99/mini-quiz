import Layout from "../../../components/dashboard/layout";

import { RotateCcw } from "lucide-react";
import { useAuthStore } from "../../../store/useAuthStore";
import { PlayCircle } from "lucide-react";
import useDashboardPage from "./useDashboardPage";

export default function HomeDashboard() {
  const user = useAuthStore((state) => state.user);
  const {
    handleStart,
    handleResume, 
    getCategoryStyle,
    hasActiveSession,
    subtests,
    isSubtestLoading,
    isErrorSubtest,
    showSkeleton,
    showData,
  } = useDashboardPage();


  return (
    <Layout>
      <main className="mx-auto p-5">
        <header className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">
            Selamat Datang, {user?.name}
          </h2>
          <p className="text-gray-500">
            Pilih subtest di bawah untuk mulai berlatih.
          </p>
        </header>

        {!user?.is_verified && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-blue-800">Verifykasi Email</h3>
              <p className="text-sm text-blue-700">
                Anda belum Verifikasi akun anda coba cek email
              </p>
            </div>
          </div>
        )}

        {hasActiveSession && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-yellow-800">
                Sesi Belum Selesai
              </h3>
              <p className="text-sm text-yellow-700">
                Anda memiliki kuis Matematika yang belum disubmit.
              </p>
            </div>
            <button
              onClick={handleResume}
              className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition flex items-center gap-2"
            >
              <RotateCcw size={16} /> Lanjutkan
            </button>
          </div>
        )}

        {showSkeleton && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-48 bg-gray-200 rounded-xl animate-pulse"
              ></div>
            ))}
          </div>
        )}

        {isErrorSubtest && (
          <div className="p-4 bg-red-100 text-red-600 rounded-lg border border-red-200 text-center">
            Gagal memuat data: {isErrorSubtest}
          </div>
        )}

        {!isSubtestLoading && !isErrorSubtest && subtests.length === 0 && (
          <div className="text-center py-10 text-gray-400">
            Tidak ada kuis yang tersedia saat ini.
          </div>
        )}

        {showData && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subtests.map((subtest) => {
              const style = getCategoryStyle(subtest.name);

              return (
                <div
                  key={subtest.id}
                  className={`bg-white p-6 rounded-2xl shadow-sm border ${style.border} hover:shadow-md transition-all flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl ${style.color}`}>
                        {style.icon}
                      </div>
                      <span className="bg-gray-100 text-gray-500 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wide">
                        {subtest.is_active ? "Active" : "Closed"}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-gray-800 mb-2 leading-tight">
                      {subtest.name}
                    </h3>

                    <p className="text-sm text-gray-500 mb-6 line-clamp-3 leading-relaxed">
                      {subtest.description}
                    </p>
                  </div>

                  <button
                    onClick={() => handleStart(subtest.id)}
                    disabled={!subtest.is_active}
                    className="w-full py-3 px-4 bg-blue-200 hover:bg-blue-400 disabled:bg-gray-300 text-blue-700 hover:text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors"
                  >
                    <PlayCircle size={18} />
                    {subtest.is_active ? "Mulai Kuis" : "Belum Tersedia"}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </Layout>
  );
}
