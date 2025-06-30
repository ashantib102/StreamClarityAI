import React from 'react';
import { X, Copy } from 'lucide-react';

interface InstallModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstallModal: React.FC<InstallModalProps> = ({ isOpen, onClose }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText('chrome://extensions/');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-75" onClick={onClose}></div>
      <div className="relative backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
        
        <h2 className="text-3xl font-bold text-white mb-6">How to Install Stream Clarity</h2>
        
        <div className="space-y-6 text-gray-200">
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Step 1: Download the Extension</h3>
            <p>Download the Stream Clarity extension files from our repository or build them locally.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Step 2: Enable Developer Mode</h3>
            <p>Open Chrome and navigate to the extensions page:</p>
            <div className="flex items-center space-x-2 mt-2 p-3 bg-black/30 rounded-lg">
              <code className="text-[#FF0000] font-mono">chrome://extensions/</code>
              <button
                onClick={copyToClipboard}
                className="text-white hover:text-gray-300 transition-colors"
                title="Copy to clipboard"
              >
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <p className="mt-2">Toggle on "Developer mode" in the top right corner.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Step 3: Load the Extension</h3>
            <p>Click "Load unpacked" and select the folder containing the Stream Clarity extension files.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Step 4: Configure API Keys</h3>
            <p>Open the extension popup and configure your OpenAI and YouTube API keys in the settings.</p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-white mb-2">Step 5: Start Analyzing</h3>
            <p>Navigate to any YouTube video and click the Stream Clarity floating button to begin your analysis!</p>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-[#FF0000]/20 border border-[#FF0000]/30 rounded-lg">
          <p className="text-white text-sm">
            <strong>Note:</strong> You'll need valid OpenAI and YouTube Data API v3 keys for full functionality. 
            The extension will guide you through the setup process.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InstallModal;