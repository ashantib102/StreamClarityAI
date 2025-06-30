import React from 'react';
import { Youtube, Film, Tv } from 'lucide-react';

const QuickLinksSection: React.FC = () => {
  const quickLinks = [
    {
      icon: <Youtube className="w-12 h-12 text-[#FF0000]" />,
      title: "Open YouTube",
      description: "Browse and analyze any video.",
      url: "https://www.youtube.com"
    },
    {
      icon: <Film className="w-12 h-12 text-[#FF0000]" />,
      title: "Free Movies on YouTube",
      description: "Discover full-length movies.",
      url: "https://www.youtube.com/playlist?list=PL30RAv-0lkxHdTcoGGgx5L6eXIHnnrEHC"
    },
    {
      icon: <Tv className="w-12 h-12 text-[#FF0000]" />,
      title: "Free TV Shows on YouTube",
      description: "Watch complete TV episodes.",
      url: "https://www.youtube.com/@TVShowsFullEpisodes/playlists"
    }
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Quick Links</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {quickLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="text-left">
                <div className="mb-4 group-hover:scale-110 transition-transform duration-300">
                  {link.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">{link.title}</h3>
                <p className="text-gray-200">{link.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickLinksSection;