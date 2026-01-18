import React from 'react'
import { useLocation } from 'react-router-dom'
import { Home, History, User, LogOut, X } from 'lucide-react';


export default function useSidebar() {
    const location = useLocation();

    const menus = [
        {
            name: 'Home',
            icon: Home,
            path: '/'
        },
        {
            name: 'History',
            icon: History,
            path: '/history'
        },
    ];

  return { menus, location }
}
