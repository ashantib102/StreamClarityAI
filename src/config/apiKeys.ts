// API Keys configuration
// These are loaded from environment variables during build time

export const API_KEYS = {
  OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY || '',
  YOUTUBE_API_KEY: import.meta.env.VITE_YOUTUBE_API_KEY || ''
};

// Validation function to check if API keys are configured
export const validateApiKeys = (): { isValid: boolean; missing: string[] } => {
  const missing: string[] = [];
  
  if (!API_KEYS.OPENAI_API_KEY) {
    missing.push('VITE_OPENAI_API_KEY');
  }
  
  if (!API_KEYS.YOUTUBE_API_KEY) {
    missing.push('VITE_YOUTUBE_API_KEY');
  }
  
  return {
    isValid: missing.length === 0,
    missing
  };
};