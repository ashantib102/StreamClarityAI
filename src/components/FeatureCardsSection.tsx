import React from 'react';
import { Brain, MessageSquare, Search, BookOpen, Film, Wrench, Star, Music } from 'lucide-react';

const FeatureCardsSection: React.FC = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-[#FF0000]" />,
      title: "Deep Dive Mode",
      description: "Deconstruct complex topics in educational videos. Extract key arguments, explain core concepts, provide counterarguments, and get suggestions for further learning."
    },
    {
      icon: <Film className="w-8 h-8 text-[#FF0000]" />,
      title: "Narrative Mode",
      description: "Explore storytelling elements in movies and TV shows. Analyze character arcs, symbolism, themes, easter eggs, plot structure, and genre tropes."
    },
    {
      icon: <Wrench className="w-8 h-8 text-[#FF0000]" />,
      title: "Tutorial Mode",
      description: "Transform how-to videos into actionable insights. Get tool lists, alternative methods, common pitfalls, pro-tips, and step-by-step instructions."
    },
    {
      icon: <Star className="w-8 h-8 text-[#FF0000]" />,
      title: "Review Mode",
      description: "Get balanced product analysis from review videos. Summarize pros and cons, analyze reviewer bias, and compare to alternatives."
    },
    {
      icon: <Music className="w-8 h-8 text-[#FF0000]" />,
      title: "Music Mode",
      description: "Dive deep into music videos and performances. Interpret lyrics, identify musical techniques, and discover cultural references."
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-[#FF0000]" />,
      title: "Comment Analysis",
      description: "Analyze the top 200 comments to understand viewer sentiment, common questions, and community insights about the video content."
    },
    {
      icon: <Search className="w-8 h-8 text-[#FF0000]" />,
      title: "Q&A Assistant",
      description: "Ask anything about the video content. Get instant, contextual answers based on the video transcript and community discussions."
    },
    {
      icon: <BookOpen className="w-8 h-8 text-[#FF0000]" />,
      title: "Smart Summaries",
      description: "Choose your sophistication level - Simple, Standard, or Expert. Get video summaries tailored to your preferred depth of analysis."
    }
  ];

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-white text-center mb-12">Powerful Analysis Features</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 p-3 bg-white/10 rounded-lg">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-200 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCardsSection;