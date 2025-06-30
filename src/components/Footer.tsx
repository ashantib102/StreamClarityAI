import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="py-16 px-6 mt-16">
      <div className="max-w-4xl mx-auto text-center backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-12">
        <h2 className="text-3xl font-bold text-white mb-6">Contact Us</h2>
        <p className="text-gray-200 text-lg leading-relaxed mb-4">
          Have questions, concerns, or feedback? We'd love to hear from you. Please send an email to:
        </p>
        <a 
          href="mailto:ashantib102@gmail.com"
          className="text-[#FF0000] hover:text-red-400 text-xl font-semibold transition-colors duration-300 underline"
        >
          ashantib102@gmail.com
        </a>
      </div>
    </footer>
  );
};

export default Footer;