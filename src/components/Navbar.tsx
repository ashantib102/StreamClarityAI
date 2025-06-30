import React from 'react';

interface NavbarProps {
  onInstallClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onInstallClick }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-20 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Left side - Logo and brand */}
        <div className="flex items-center">
          <img 
            src="/StreamClarity128x128.png" 
            alt="Stream Clarity Logo" 
            className="w-[100px] h-[90px] mr-4"
          />
          <span className="text-white text-2xl font-bold">Stream Clarity</span>
        </div>

        {/* Right side - Install button */}
        <button
          onClick={onInstallClick}
          className="bg-[#FF0000] hover:bg-red-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
        >
          How to Install
        </button>
      </div>
    </nav>
  );
};

export default Navbar;