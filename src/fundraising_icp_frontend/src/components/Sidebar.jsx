// src/components/Sidebar.jsx
import React, { useState } from 'react';
import logo from '../assets/logos/NusantaraLog.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      {/* Header untuk Mobile */}
      <header className="lg:hidden flex items-center justify-between p-4 z-50">
        <button onClick={toggleSidebar} className="text-gray-700 text-2xl focus:outline-none" aria-label={isOpen ? 'Close Sidebar' : 'Open Sidebar'}>
          ☰
        </button>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg py-6 px-4 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0 z-40`}
        aria-hidden={!isOpen}
      >
        {/* Close Button for Mobile */}
        <div className="flex justify-end lg:hidden mb-4">
          <button onClick={toggleSidebar} className="text-gray-700 text-2xl focus:outline-none" aria-label="Close Sidebar">
            ✖
          </button>
        </div>

        {/* Logo Section */}
        <div className="flex justify-center items-center mb-6">
          <img src={logo} alt="Nusantara Logo" className="w-28 h-auto object-contain" />
        </div>

        {/* Navigation Links */}
        <nav className="space-y-4">
          <ul className="flex flex-col">
            <li>
              <a href="#" className="flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-100 hover:text-indigo-600 transition-colors duration-200">
                <span className="text-2xl">🧡</span>
                <span className="ml-3 text-lg font-medium">Donasi</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-100 hover:text-indigo-600 transition-colors duration-200">
                <span className="text-2xl">📦</span>
                <span className="ml-3 text-lg font-medium">Galang Dana</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center p-3 text-gray-700 rounded-md hover:bg-gray-100 hover:text-indigo-600 transition-colors duration-200">
                <span className="text-2xl">👤</span>
                <span className="ml-3 text-lg font-medium">Akun</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Overlay untuk Mobile */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden" onClick={toggleSidebar} role="button" aria-label="Close Sidebar" />}
    </div>
  );
};

export default Sidebar;
