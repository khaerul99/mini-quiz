import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { authServices } from '../../../services/auth/authServices';// Sesuaikan path
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [message, setMessage] = useState('Memverifikasi keaslian token...');

  useEffect(() => {
    const verifyToken = async () => {
      // 1. Ambil token dari URL (contoh: localhost:5173/verify-email?token=ABCDEFG)
      const tokenFromUrl = searchParams.get('token');

      if (!tokenFromUrl) {
        setStatus('error');
        setMessage('Token tidak ditemukan di URL.');
        return;
      }

      try {
        await authServices.verifyEmail(tokenFromUrl);
        
        setStatus('success');
        setMessage('Email berhasil diverifikasi! Akunmu sudah aktif.');
        
        // Redirect otomatis ke login setelah 3 detik
        setTimeout(() => {
          navigate('/login');
        }, 3000);

      } catch (error) {
        console.error(error);
        setStatus('error');
        // Ambil pesan error dari backend jika ada
        setMessage(error.response?.data?.message || 'Token tidak valid atau sudah kadaluarsa.');
      }
    };

    // Jalankan fungsi
    verifyToken();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-sm w-full text-center space-y-4">
        
        {/* STATE: LOADING */}
        {status === 'loading' && (
          <div className="flex flex-col items-center animate-pulse">
            <Loader2 className="w-16 h-16 text-blue-500 animate-spin mb-4" />
            <h2 className="text-xl font-bold text-gray-800">Sedang Memproses...</h2>
            <p className="text-gray-500 text-sm">{message}</p>
          </div>
        )}

        {/* STATE: SUKSES */}
        {status === 'success' && (
          <div className="flex flex-col items-center animate-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Verifikasi Berhasil!</h2>
            <p className="text-gray-600 text-sm">{message}</p>
            <button 
              onClick={() => navigate('/login')}
              className="mt-6 w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login Sekarang
            </button>
          </div>
        )}

        {/* STATE: ERROR */}
        {status === 'error' && (
          <div className="flex flex-col items-center animate-in shake duration-300">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <XCircle className="w-10 h-10 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-800">Gagal Verifikasi</h2>
            <p className="text-red-500 text-sm">{message}</p>
            <button 
              onClick={() => navigate('/auth/login')}
              className="mt-6 w-full py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Kembali ke Login
            </button>
          </div>
        )}

      </div>
    </div>
  );
}