document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('options-form');
    const openaiKeyInput = document.getElementById('openai-key');
    const youtubeKeyInput = document.getElementById('youtube-key');
    const statusDiv = document.getElementById('status');
    
    // Load saved keys
    chrome.storage.local.get(['openaiApiKey', 'youtubeApiKey'], function(result) {
        if (result.openaiApiKey) {
            openaiKeyInput.value = result.openaiApiKey;
        }
        if (result.youtubeApiKey) {
            youtubeKeyInput.value = result.youtubeApiKey;
        }
    });
    
    // Save keys
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const openaiKey = openaiKeyInput.value.trim();
        const youtubeKey = youtubeKeyInput.value.trim();
        
        if (!openaiKey || !youtubeKey) {
            showStatus('Please enter both API keys', 'error');
            return;
        }
        
        // Basic validation
        if (!openaiKey.startsWith('sk-')) {
            showStatus('OpenAI API key should start with "sk-"', 'error');
            return;
        }
        
        if (!youtubeKey.startsWith('AIza')) {
            showStatus('YouTube API key should start with "AIza"', 'error');
            return;
        }
        
        // Save to Chrome storage
        chrome.storage.local.set({
            openaiApiKey: openaiKey,
            youtubeApiKey: youtubeKey
        }, function() {
            if (chrome.runtime.lastError) {
                showStatus('Error saving keys: ' + chrome.runtime.lastError.message, 'error');
            } else {
                showStatus('API keys saved successfully!', 'success');
            }
        });
    });
    
    function showStatus(message, type) {
        statusDiv.textContent = message;
        statusDiv.className = 'status ' + type;
        statusDiv.style.display = 'block';
        
        setTimeout(function() {
            statusDiv.style.display = 'none';
        }, 3000);
    }
});