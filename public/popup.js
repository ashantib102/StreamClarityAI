document.addEventListener('DOMContentLoaded', function() {
    const openaiKeyInput = document.getElementById('openai-key');
    const youtubeKeyInput = document.getElementById('youtube-key');
    const saveButton = document.getElementById('save-keys');
    const clearButton = document.getElementById('clear-keys');
    const saveStatus = document.getElementById('save-status');
    
    const openaiStatus = document.getElementById('openai-status');
    const openaiText = document.getElementById('openai-text');
    const youtubeStatus = document.getElementById('youtube-status');
    const youtubeText = document.getElementById('youtube-text');
    
    // Load existing keys on popup open
    loadApiKeys();
    
    // Save keys
    saveButton.addEventListener('click', function() {
        const openaiKey = openaiKeyInput.value.trim();
        const youtubeKey = youtubeKeyInput.value.trim();
        
        if (!openaiKey || !youtubeKey) {
            showStatus('Please enter both API keys', 'error');
            return;
        }
        
        // Basic validation
        if (!openaiKey.startsWith('sk-')) {
            showStatus('Invalid OpenAI API key format', 'error');
            return;
        }
        
        if (!youtubeKey.startsWith('AIza')) {
            showStatus('Invalid YouTube API key format', 'error');
            return;
        }
        
        saveButton.disabled = true;
        saveButton.textContent = 'Saving...';
        
        chrome.runtime.sendMessage({
            action: 'saveApiKeys',
            openaiKey: openaiKey,
            youtubeKey: youtubeKey
        }, function(response) {
            saveButton.disabled = false;
            saveButton.textContent = 'Save API Keys';
            
            if (response && response.success) {
                showStatus('API keys saved successfully!', 'success');
                updateKeyStatus();
                // Clear the input fields for security
                openaiKeyInput.value = '';
                youtubeKeyInput.value = '';
            } else {
                showStatus('Failed to save API keys', 'error');
            }
        });
    });
    
    // Clear keys
    clearButton.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all API keys?')) {
            chrome.storage.local.remove(['openaiApiKey', 'youtubeApiKey'], function() {
                showStatus('API keys cleared', 'success');
                openaiKeyInput.value = '';
                youtubeKeyInput.value = '';
                updateKeyStatus();
            });
        }
    });
    
    function loadApiKeys() {
        chrome.runtime.sendMessage({ action: 'getApiKeys' }, function(response) {
            if (response && response.success) {
                // Don't populate the input fields for security, just update status
                updateKeyStatus();
            }
        });
    }
    
    function updateKeyStatus() {
        chrome.runtime.sendMessage({ action: 'getApiKeys' }, function(response) {
            if (response && response.success) {
                // Update OpenAI status
                if (response.openaiKey) {
                    openaiStatus.classList.add('configured');
                    openaiText.textContent = 'Configured';
                } else {
                    openaiStatus.classList.remove('configured');
                    openaiText.textContent = 'Not configured';
                }
                
                // Update YouTube status
                if (response.youtubeKey) {
                    youtubeStatus.classList.add('configured');
                    youtubeText.textContent = 'Configured';
                } else {
                    youtubeStatus.classList.remove('configured');
                    youtubeText.textContent = 'Not configured';
                }
            }
        });
    }
    
    function showStatus(message, type) {
        saveStatus.innerHTML = `<div class="status ${type}">${message}</div>`;
        setTimeout(() => {
            saveStatus.innerHTML = '';
        }, 3000);
    }
});