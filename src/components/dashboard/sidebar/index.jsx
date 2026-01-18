import React from "react";
import useSidebar from "./useSidebar";
import { Link } from "react-router-dom";
import { LogOut, X } from "lucide-react";

export default function Sidebar({ isOpen, onClose }) {
  const { menus, location } = useSidebar();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/5 bg-opacity-50 z-20 "
          onClick={onClose}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 z-30 h-screen w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0 md:sticky`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-100">
          <span className="text-xl text-center font-bold text-blue-600 lg:w-full">
            Ambis Quiz
          </span>
          <button
            onClick={onClose}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menus.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <Link
                key={menu.name}
                to={menu.path}
                onClick={() => window.innerWidth < 768 && onClose()}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <menu.icon size={20} />
                {menu.name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
