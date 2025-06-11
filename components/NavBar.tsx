import React from "react";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const NavBar = () => {
  return (
    <nav className="w-full bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="group flex items-center space-x-2 hover:opacity-80 transition-opacity duration-200"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-semibold text-gray-900 tracking-tight">
              Tyrex Wallet
            </span>
          </Link>

          <a
            href="https://github.com/tyrex1829"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 transition-all duration-200 hover:scale-105"
            aria-label="Visit GitHub Profile"
          >
            <FaGithub
              size={20}
              className="text-gray-600 group-hover:text-gray-900 transition-colors duration-200"
            />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
