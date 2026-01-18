import React from 'react'
import { useState } from 'react';
import Sidebar from '../sidebar';
import Navbar from '../navbar';

export default function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}

      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={toggleSidebar} 
      />
      {/* Konten Utama */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        
        <main className="flex-1 p-4 md:p-4 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
