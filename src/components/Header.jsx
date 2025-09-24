import React, { useState } from "react";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import { SiViaplay } from "react-icons/si";

function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (query) => {
    setIsSearchOpen(false);
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close search when opening mobile menu
    if (!isMobileMenuOpen) {
      setIsSearchOpen(false);
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    // Close mobile menu when opening search
    if (!isSearchOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav className="flex mx-auto justify-center items-center">
      <header className="fixed top-4 w-full z-50 transition-colors duration-300 max-w-7xl rounded-md border bg-transparent backdrop-blur-md px-4">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl sm:text-3xl font-bold !text-white flex flex-row gap-4"
          >
            <strong>DotfLix</strong>
            <SiViaplay className="mt-1" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a href="#" className="text-white hover:text-gray-300">
              Movies
            </a>
            <a href="#" className="text-white hover:text-gray-300">
              Shows
            </a>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <FaSearch
              className="text-white cursor-pointer h-5 w-5 hover:text-gray-300"
              onClick={toggleSearch}
            />
            <button className="bg-black/50 border border-white/20 text-white font-semibold py-2 px-5 rounded-lg text-sm hover:bg-black/70 transition-colors">
              Login
            </button>
          </div>

          {/* Mobile Actions */}
          <div className="flex md:hidden items-center gap-3">
            <FaSearch
              className="text-white cursor-pointer h-5 w-5 hover:text-gray-300"
              onClick={toggleSearch}
            />
            <button
              onClick={toggleMobileMenu}
              className="text-white hover:text-gray-300"
            >
              {isMobileMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md rounded-b-lg p-4 border-t border-white/10">
            <SearchBar onSearch={handleSearch} />
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/90 backdrop-blur-md rounded-b-lg border-t border-white/10">
            <nav className="flex flex-col p-4 space-y-4">
              <a
                href="#"
                className="text-white hover:text-gray-300 text-lg font-semibold py-2"
              >
                Movies
              </a>
              <a
                href="#"
                className="text-white hover:text-gray-300 text-lg font-semibold py-2"
              >
                Shows
              </a>
              <div className="pt-4 border-t border-white/10">
                <button className="w-full bg-black/50 border border-white/20 text-white font-semibold py-3 px-5 rounded-lg hover:bg-black/70 transition-colors">
                  Login
                </button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </nav>
  );
}

export default Header;
