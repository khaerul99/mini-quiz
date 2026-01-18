import React from "react";
import Layout from "../../../components/dashboard/layout";
import { UserCircle, Pencil, AlertCircle, CheckCircle } from "lucide-react";
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
      <div className="mx-auto p-5">
        <h1 className="text-2xl font-bold mb-5">Profile</h1>
        <header className="relative mb-8 bg-white p-6 rounded-xl shadow-sm border border-gray-200 ">
          <div className="flex flex-col gap-6 py-8 justify-center items-center md:flex-row md:justify-start">
            <div className=" w-40 h-40 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
              <UserCircle size={180} />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-xl font-semibold mb-2">
                {dataProfile?.name}
              </h2>
              <div className="mb-2 flex gap-4 items-center">
                <p className="text-gray-600 flex items-center gap-2">
                  <span className="font-medium">Email:</span>
                  {dataProfile?.email}
                </p>
                {dataProfile?.is_verified || dataProfile?.email_verified_at ? (
                  <span className="flex items-center gap-1 text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full border border-green-200">
                    <CheckCircle size={12} /> Verified
                  </span>
                ) : (
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-xs font-medium text-red-600 bg-red-100 px-2 py-0.5 rounded-full border border-red-200 w-fit">
                      <AlertCircle size={12} /> Unverified
                    </span>
                    <span className="text-xs text-gray-500 italic">
                      (Cek email)
                    </span>
                  </div>
                )}
              </div>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Joined:</span>{" "}
                {dataProfile?.created_at
                  ? new Date(dataProfile.created_at).toLocaleDateString(
                      "id-ID",
                      {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "-"}
              </p>
              <p className="text-gray-600 mb-1 mt-4">
                <span className="font-bold bg-green-200 text-green-700 px-4 py-2 rounded-2xl">
                  Role:
                </span>{" "}
                {dataProfile?.role}{" "}
              </p>
            </div>
          </div>
          <button
            onClick={toggleModal}
            className="h-8 w-8 text-slate-500 hover:text-black transition absolute top-6 right-6 flex items-center justify-center rounded-lg"
          >
            <Pencil className="h-5 w-5" />
          </button>
        </header>

        <main>
          <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-bold mb-4">Change Password</h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Old Password</label>
                <PasswordInput
                  name="old_password"
                  placeholder="Old Password"
                  onChange={handlePassChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">New Password</label>
                <PasswordInput
                  name="new_password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                  placeholder="New Password"
                  onChange={handlePassChange}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-200 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-700 transition"
              >
                  Simpan
              </button>
            </form>
          </section>
        </main>
      </div>

      {/* ini modal */}
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center  transition-colors duration-300 
            ${
              modalOpen
                ? "visible bg-black/20 backdrop-blur-sm"
                : "invisible bg-black/0 pointer-events-none"
            }`}
      >
        <div
          className={`bg-gray-100 p-6 rounded-2xl shadow-lg w-full max-w-md 
      transition-all duration-300 ease-in-out
      ${
        modalOpen
          ? "translate-y-0 opacity-100 scale-100"
          : "-translate-y-10 opacity-0 scale-95"
      }`}
        >
          <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-200 text-blue-700 px-4 py-2 rounded-md hover:bg-blue-400 hover:text-white transition"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="bg-red-200 text-red-700 px-4 py-2 rounded-md hover:bg-red-400 hover:text-white transition"
              >
                Batal
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
