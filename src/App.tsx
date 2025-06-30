import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HookSection from './components/HookSection';
import QuickLinksSection from './components/QuickLinksSection';
import FeatureCardsSection from './components/FeatureCardsSection';
import Footer from './components/Footer';
import InstallModal from './components/InstallModal';

function App() {
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Fixed background image with overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url(/WebsiteBackground.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar onInstallClick={() => setIsInstallModalOpen(true)} />
        <main>
          <HookSection />
          <QuickLinksSection />
          <FeatureCardsSection />
        </main>
        <Footer />
      </div>

      {/* Install Modal */}
      <InstallModal 
        isOpen={isInstallModalOpen} 
        onClose={() => setIsInstallModalOpen(false)} 
      />
    </div>
  );
}

export default App;