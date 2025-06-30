// Stream Clarity API Configuration
// Copy this file to api_keys.js and replace with your actual API keys

// OpenAI API Key - Get from https://platform.openai.com/api-keys
const OPENAI_API_KEY = "your-openai-api-key-here";

// YouTube Data API v3 Key - Get from https://console.developers.google.com/
const YOUTUBE_API_KEY = "your-youtube-api-key-here";

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        OPENAI_API_KEY,
        YOUTUBE_API_KEY
    };
}