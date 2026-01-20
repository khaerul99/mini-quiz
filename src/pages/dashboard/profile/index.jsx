import React from "react";
import Layout from "../../../components/dashboard/layout";
import { UserCircle, Pencil, AlertCircle, CheckCircle, User, Edit3, Mail, Calendar, Shield, Save, X } from "lucide-react";
import { PasswordInput } from "../../../components/ui/password-input";
import useProfile from "./useProfile";

export default function ProfilePage() {
  const {
    modalOpen,
    toggleModal,
    setModalOpen,
    dataProfile,
    formData,
    setFormData,
    handleSubmit,
    handleChangePassword, 
    handlePassChange
  } = useProfile();



  return (
    <Layout>
     <div className="min-h-screen bg-gray-50/50 p-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 tracking-tight">Account Settings</h1>
          <p className="text-gray-500 mt-1">Kelola informasi profil dan keamanan akun Anda.</p>
        </div>

        <div className="grid grid-cols-1 gap-8">
          
          {/* --- LEFT COLUMN: PROFILE SUMMARY CARD --- */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100 relative overflow-hidden">
              
              <div className="absolute top-0 left-0 w-full h-24 bg-linear-to-r from-blue-500 to-indigo-600 opacity-10"></div>
              
              <div className="relative flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full bg-white p-1 shadow-lg">
                    <div className="w-full h-full bg-linear-to-br from-blue-50 to-indigo-50 rounded-full flex items-center justify-center text-blue-600">
                      <User size={64} />
                    </div>
                  </div>
                  
                  <button 
                    onClick={toggleModal}
                    className="absolute bottom-1 right-1 p-2 bg-white text-gray-600 rounded-full shadow-md border border-gray-100 hover:text-blue-600 hover:scale-110 transition"
                    title="Edit Profile"
                  >
                    <Edit3 size={16} />
                  </button>
                </div>

                <h2 className="text-2xl font-bold text-gray-800">{dataProfile?.name}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase tracking-wider">
                    {dataProfile?.role}
                  </span>
                </div>

                <div className="w-full border-b border-gray-100 my-6"></div>

                <div className="w-full space-y-4 text-left">
                  
                  <div className="group p-3 rounded-xl hover:bg-gray-50 transition">
                    <p className="text-xs text-gray-400 font-medium uppercase mb-1 flex items-center gap-2">
                      <Mail size={14} /> Email Address
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-gray-700 font-medium truncate">{dataProfile?.email}</p>
                      
                      {dataProfile?.is_verified || dataProfile?.email_verified_at ? (
                         <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md text-xs font-bold">
                            <CheckCircle size={14} fill="currentColor" className="text-emerald-200" />
                            <span className="text-emerald-700">Verified</span>
                         </div>
                      ) : (
                        <div className="flex items-center gap-1 text-rose-600 bg-rose-50 px-2 py-1 rounded-md text-xs font-bold cursor-pointer hover:bg-rose-100">
                            <AlertCircle size={14} />
                            <span>Verify Now</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Joined Date */}
                  <div className="group p-3 rounded-xl hover:bg-gray-50 transition">
                    <p className="text-xs text-gray-400 font-medium uppercase mb-1 flex items-center gap-2">
                      <Calendar size={14} /> Member Since
                    </p>
                    <p className="text-gray-700 font-medium">
                      {dataProfile?.created_at ? new Date(dataProfile.created_at).toLocaleDateString("id-ID", {
                          day: "numeric", month: "long", year: "numeric"
                      }) : "-"}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* --- RIGHT COLUMN: SECURITY & ACTIONS --- */}
          <div className="space-y-6">
            
            <div className="bg-white rounded-3xl p-8 shadow-xl shadow-gray-200/50 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                  <Shield size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800">Keamanan</h3>
                  <p className="text-sm text-gray-500">Update password anda secara berkala.</p>
                </div>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Password Lama</label>
                    <PasswordInput
                      name="old_password"
                      placeholder="••••••••"
                      onChange={handlePassChange}
                      className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700 ml-1">Password Baru</label>
                    <PasswordInput
                      name="new_password"
                      placeholder="••••••••"
                      onChange={handlePassChange}
                      className="w-full px-4 py-3 bg-gray-50 border-transparent focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 rounded-xl transition-all duration-200"
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-gray-900 text-white px-6 py-3 rounded-xl font-medium hover:bg-black hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Save size={18} />
                    Simpan Password
                  </button>
                </div>
              </form>
            </div>

            {/* Banner Info (Optional) */}
            {!dataProfile?.is_verified && !dataProfile?.email_verified_at && (
                <div className="bg-amber-50 border border-amber-100 rounded-2xl p-6 flex items-start gap-4">
                    <div className="p-2 bg-amber-100 text-amber-600 rounded-full shrink-0">
                        <AlertCircle size={24} />
                    </div>
                    <div>
                        <h4 className="font-bold text-amber-800">Akun Belum Terverifikasi</h4>
                        <p className="text-sm text-amber-700 mt-1">
                            Fitur kuis terkunci. Silakan cek email masuk atau folder spam Anda untuk link verifikasi.
                        </p>
                        <button className="mt-3 text-sm font-semibold text-amber-900 underline hover:no-underline">
                            Kirim ulang email
                        </button>
                    </div>
                </div>
            )}

          </div>
        </div>
      </div>

      {/* --- MODAL EDIT PROFILE --- */}
      <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 
          ${modalOpen ? "visible opacity-100 backdrop-blur-sm" : "invisible opacity-0 pointer-events-none "}`}
      >
        {/* Backdrop */}
        <div onClick={() => setModalOpen(false)} className="absolute inset-0 bg-gray-900/30  transition-all" />

        {/* Modal Content */}
        <div className={`bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden transform transition-all duration-300
            ${modalOpen ? "translate-y-0 scale-100" : "translate-y-10 scale-95"}`}
        >
          {/* Header Modal */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
             <h3 className="font-bold text-lg text-gray-800">Edit Profile</h3>
             <button onClick={() => setModalOpen(false)} className="p-1 rounded-full hover:bg-gray-200 transition text-gray-500">
                <X size={20} />
             </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Nama Lengkap</label>
              <div className="relative">
                 <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                 <input
                    type="text"
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                 />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Alamat Email</label>
              <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                 <input
                    type="email"
                    className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                 />
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="flex-1 py-3 px-4 bg-white border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-4 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>

    </div>
    </Layout>
  );
}
