import React from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';

function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-colors duration-300 bg-black/50 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-red-600">DOTFLIX</h1>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-white hover:text-gray-300">Movies</a>
            <a href="#" className="text-white hover:text-gray-300">Shows</a>
            <a href="#" className="text-white hover:text-gray-300">Streaming</a>
            <a href="#" className="text-white hover:text-gray-300">Discover</a>
          </nav>
        </div>
        <div className="flex items-center gap-6">
          <FaSearch className="text-white cursor-pointer" />
          <FaBell className="text-white cursor-pointer" />
          <button className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;