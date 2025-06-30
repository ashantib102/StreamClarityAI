chrome.runtime.onInstalled.addListener(() => {
    console.log('Stream Clarity extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchTranscript') {
        fetchTranscript(request.videoId)
            .then(transcript => sendResponse({ success: true, transcript }))
            .catch(error => sendResponse({ success: false, error: error.message }));
        return true; // Keep message channel open for async response
    }
    
    if (request.action === 'fetchComments') {
        fetchComments(request.videoId)
            .then(comments => sendResponse({ success: true, comments }))
            .catch(error => sendResponse({ success: false, error: error.message }));
        return true;
    }
    
    if (request.action === 'analyzeWithOpenAI') {
        analyzeWithOpenAI(request.prompt, request.context, request.sophistication)
            .then(analysis => sendResponse({ success: true, analysis }))
            .catch(error => sendResponse({ success: false, error: error.message }));
        return true;
    }
});

async function fetchTranscript(videoId) {
    // Get API key from Chrome storage or use environment variable
    const result = await chrome.storage.local.get(['youtubeApiKey']);
    const YOUTUBE_API_KEY = result.youtubeApiKey || 'YOUR_YOUTUBE_API_KEY_HERE';
    
    if (YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY_HERE') {
        throw new Error('YouTube API key not configured. Please set up your API keys in the extension options.');
    }
    
    try {
        // Try to get video details first to ensure video exists
        const videoResponse = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${YOUTUBE_API_KEY}`
        );
        
        if (!videoResponse.ok) {
            throw new Error('Failed to fetch video details');
        }
        
        const videoData = await videoResponse.json();
        
        if (!videoData.items || videoData.items.length === 0) {
            throw new Error('Video not found');
        }
        
        // For now, return video title and description as context since direct transcript access is restricted
        const video = videoData.items[0];
        const fallbackTranscript = `Video Title: ${video.snippet.title}\n\nDescription: ${video.snippet.description}`;
        
        return fallbackTranscript;
        
    } catch (error) {
        console.error('Error fetching transcript:', error);
        // Return a basic fallback that indicates we have some video context
        return `Video ID: ${videoId}\nNote: Full transcript not available, but analysis can still be performed based on video metadata and comments.`;
    }
}

async function fetchComments(videoId) {
    // Get API key from Chrome storage
    const result = await chrome.storage.local.get(['youtubeApiKey']);
    const YOUTUBE_API_KEY = result.youtubeApiKey || 'YOUR_YOUTUBE_API_KEY_HERE';
    
    if (YOUTUBE_API_KEY === 'YOUR_YOUTUBE_API_KEY_HERE') {
        throw new Error('YouTube API key not configured. Please set up your API keys in the extension options.');
    }
    
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&order=relevance&maxResults=100&key=${YOUTUBE_API_KEY}`
        );
        
        if (!response.ok) {
            throw new Error('Failed to fetch comments');
        }
        
        const data = await response.json();
        
        if (!data.items || data.items.length === 0) {
            return ['No comments available for this video.'];
        }
        
        const comments = data.items.map(item => 
            item.snippet.topLevelComment.snippet.textDisplay
        );
        
        return comments;
        
    } catch (error) {
        console.error('Error fetching comments:', error);
        // Return a fallback that still allows analysis
        return ['Comments not available, but analysis can still be performed.'];
    }
}

async function analyzeWithOpenAI(prompt, context, sophistication = 'Standard') {
    // Get API key from Chrome storage
    const result = await chrome.storage.local.get(['openaiApiKey']);
    const OPENAI_API_KEY = result.openaiApiKey || 'YOUR_OPENAI_API_KEY_HERE';
    
    if (OPENAI_API_KEY === 'YOUR_OPENAI_API_KEY_HERE') {
        throw new Error('OpenAI API key not configured. Please set up your API keys in the extension options.');
    }
    
    // Add sophistication modifier to prompt
    let sophisticationModifier = '';
    switch (sophistication) {
        case 'Simple':
            sophisticationModifier = ' Explain this in simple, easy-to-understand terms.';
            break;
        case 'Expert':
            sophisticationModifier = ' Provide a detailed, expert-level analysis with technical depth.';
            break;
        default:
            sophisticationModifier = ' Provide a balanced, informative analysis.';
    }
    
    const fullPrompt = prompt + sophisticationModifier + '\n\nContext: ' + context;
    
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'user',
                        content: fullPrompt
                    }
                ],
                max_tokens: 1000,
                temperature: 0.7
            })
        });
        
        if (!response.ok) {
            throw new Error('Failed to get OpenAI response');
        }
        
        const data = await response.json();
        return data.choices[0].message.content;
        
    } catch (error) {
        console.error('Error with OpenAI analysis:', error);
        throw error;
    }
}