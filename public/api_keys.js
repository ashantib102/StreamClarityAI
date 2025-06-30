// Stream Clarity API Configuration
// Replace these placeholder values with your actual API keys

// OpenAI API Key - Get from https://platform.openai.com/api-keys
const OPENAI_API_KEY = "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";

// YouTube Data API v3 Key - Get from https://console.developers.google.com/
const YOUTUBE_API_KEY = "AIzaSyDNdd8QpOFJZfc2tAxtpW8rALWfK-joY70";


// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        OPENAI_API_KEY,
        YOUTUBE_API_KEY
    };
}