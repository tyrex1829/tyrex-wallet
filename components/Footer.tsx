import React from "react";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-white/80 backdrop-blur-md border-t border-gray-200/50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-8 space-y-4">
          <p className="text-gray-600 text-center">
            Follow for updates and crypto insights
          </p>
          <a
            href="https://x.com/_tyrex__"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg"
          >
            <FaTwitter size={18} />
            <span className="font-medium">Follow @_tyrex__</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
