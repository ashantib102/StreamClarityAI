import React from 'react';

const HookSection: React.FC = () => {
  return (
    <section className="pt-32 pb-16 px-6">
       <a 
              href="https://bolt.new/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="fixed top-15 right-6 z-50 transition-opacity duration-300 hover:opacity-70"
            >
              <img 
                src="/black_circle_360x360.png" 
                alt="Powered by Bolt.new" 
                className="w-12 h-12 sm:w-16 sm:h-16 md:w-18 md:h-18"
              />
        </a>
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-7xl font-bold text-[#FF0000] mb-8 leading-tight">
          Go beyond<br />summaries.
        </h1>
        <h2 className="text-xl md:text-2xl text-white leading-relaxed max-w-3xl mx-auto">
          Get real-time, multi-perspective analysis on any YouTube video, from tutorials and reviews to movies and documentaries. The ultimate AI Assistant for curious viewers.
        </h2>
      </div>
    </section>
  );
};

export default HookSection;