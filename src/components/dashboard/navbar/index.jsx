import React, { useEffect, useRef, useState } from 'react'
import { LogOut, Menu, UserCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { authServices } from '../../../services/auth/authServices';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../../store/useAuthStore';


export default function Navbar({ onMenuClick }) {
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false)
    const logoutFromStore = useAuthStore((state) => state.logout)
    const user = useAuthStore((state) => state.user )

    
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    const toggleLogout = () =>{
      setModalOpen(!modalOpen)
    }

    useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handleLogout = async () => {

    const loadingToast = toast.loading("sedang logout...")

    try {
      await authServices.logout()
    } catch (error) {
      console.error(error);
    } finally {
      logoutFromStore();

      toast.dismiss(loadingToast);
      toast.success("Berhasil logout!");

      navigate("/auth/login")
    }
  }

  return (
    <header className="h-16 z-50 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 ">
      
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg md:hidden"
        >
          <Menu size={24} />
        </button>
        
        
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium text-gray-700">{user?.name}</p>
          <p className="text-xs text-gray-500">{user?.role}</p>
        </div>
        <div ref={menuRef} className="relative w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
          <button
            className="p-1"
            onClick={toggleMenu}
          >
            <UserCircle size={28} />
          </button>
          {showMenu && (
          <div className={`${showMenu ? 'block' : 'hidden'} absolute right-10 top-10 mt-2 w-60 bg-white shadow-lg rounded-lg p-2`}>
            <Link to="/profile" className=" w-full flex text-left items-center gap-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
              <UserCircle size={16} /> Profile
            </Link>
            <button
            onClick={toggleLogout}
            className=" w-full flex text-left items-center gap-4 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
              <LogOut size={16} /> Logout
            </button>
          </div>
          )}
        </div>
      </div>

      <div
          className={`fixed inset-0 z-99 flex items-center justify-center  transition-colors duration-300 
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
          <h2 className="text-xl font-bold mb-4">Logout</h2>
          <div className='flex flex-col items-center justify-center'>

            <p>apakaha anda yakin ingin keluar?</p>
            <div className='mt-4 flex justify-between w-full'>
              <button onClick={handleLogout} className='px-4 py-2 w-30 bg-blue-200 text-blue-700 rounded-xl'>
                <span>ya</span>
              </button>
              <button onClick={() => setModalOpen(false)} className='px-4 py-2 w-30 bg-red-200 text-red-700 rounded-xl'>
                <span>tidak</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
