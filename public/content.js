let streamClarityEnabled = true;
let floatingButton = null;
let sidebar = null;
let currentVideoId = null;
let cachedTranscript = null;
let cachedComments = null;
let isDragging = false;
let dragOffset = { x: 0, y: 0 };
let initializationAttempts = 0;
let maxInitializationAttempts = 10;
let isInitializing = false;

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeStreamClarity);

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeStreamClarity);
} else {
    initializeStreamClarity();
}

// Listen for YouTube's navigation events
window.addEventListener('yt-navigate-start', handleYouTubeNavigation);
window.addEventListener('yt-navigate-finish', handleYouTubeNavigation);

// Fallback: Listen for URL changes using pushstate/popstate
let lastUrl = location.href;
const urlObserver = new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        console.log('URL changed to:', url);
        handleUrlChange(url);
    }
});

// Start observing for URL changes
urlObserver.observe(document, { subtree: true, childList: true });

function handleYouTubeNavigation() {
    console.log('YouTube navigation detected');
    setTimeout(() => {
        if (window.location.href.includes('youtube.com/watch')) {
            initializeStreamClarity();
        }
    }, 500);
}

function handleUrlChange(url) {
    if (url.includes('youtube.com/watch')) {
        console.log('Navigated to YouTube video page');
        // Clear any existing elements first
        removeStreamClarity();
        // Reset initialization state
        initializationAttempts = 0;
        isInitializing = false;
        // Initialize with a delay to ensure page is ready
        setTimeout(() => {
            initializeStreamClarity();
        }, 1000);
    } else {
        console.log('Navigated away from YouTube video page');
        removeStreamClarity();
    }
}

function initializeStreamClarity() {
    console.log('Initializing Stream Clarity...');
    
    // Prevent multiple simultaneous initializations
    if (isInitializing) {
        console.log('Already initializing, skipping...');
        return;
    }
    
    // Check if we're on a YouTube video page
    if (!window.location.href.includes('youtube.com/watch')) {
        console.log('Not on YouTube video page');
        return;
    }
    
    // Check if button already exists
    if (floatingButton && document.contains(floatingButton)) {
        console.log('Stream Clarity already initialized');
        return;
    }
    
    console.log('On YouTube video page, proceeding with initialization');
    isInitializing = true;
    
    // Wait for video player to load with retry mechanism
    waitForVideoPlayer();
}

function waitForVideoPlayer() {
    console.log('Waiting for video player... Attempt:', initializationAttempts + 1);
    
    const checkForPlayer = () => {
        // Multiple selectors to catch different YouTube layouts
        const playerSelectors = [
            '#movie_player',
            '.html5-video-player',
            '#player-container',
            '.ytp-chrome-top',
            '.video-stream'
        ];
        
        let player = null;
        for (const selector of playerSelectors) {
            player = document.querySelector(selector);
            if (player) {
                console.log('Video player found with selector:', selector);
                break;
            }
        }
        
        if (player) {
            // Double-check that the player is actually visible and has dimensions
            const rect = player.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                console.log('Video player is visible, creating floating button');
                createFloatingButton(player);
                extractVideoId();
                if (currentVideoId) {
                    console.log('Video ID extracted:', currentVideoId);
                    loadVideoContext();
                }
                isInitializing = false;
                initializationAttempts = 0;
                return;
            } else {
                console.log('Player found but not visible yet');
            }
        } else {
            console.log('Video player not found, retrying...');
        }
        
        initializationAttempts++;
        if (initializationAttempts < maxInitializationAttempts) {
            setTimeout(checkForPlayer, 1000); // Increased delay for more reliable detection
        } else {
            console.warn('Max initialization attempts reached, giving up');
            isInitializing = false;
            initializationAttempts = 0;
        }
    };
    
    checkForPlayer();
}

function extractVideoId() {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('v');
    if (videoId && videoId !== currentVideoId) {
        currentVideoId = videoId;
        clearCache();
        console.log('Video ID updated:', currentVideoId);
    }
}

function clearCache() {
    cachedTranscript = null;
    cachedComments = null;
    console.log('Cache cleared');
}

function createFloatingButton(player) {
    console.log('Creating floating button...');
    
    // Remove existing button if it exists
    if (floatingButton) {
        floatingButton.remove();
        floatingButton = null;
    }
    
    // Find the best parent container for the button
    let buttonParent = player;
    
    // Try to find a more specific container
    const containerSelectors = [
        '#movie_player',
        '.html5-video-player',
        '#player-container'
    ];
    
    for (const selector of containerSelectors) {
        const container = document.querySelector(selector);
        if (container && container.contains(player)) {
            buttonParent = container;
            break;
        }
    }
    
    floatingButton = document.createElement('div');
    floatingButton.id = 'stream-clarity-button';
    floatingButton.innerHTML = `
        <img src="${chrome.runtime.getURL('StreamClarity128x128.png')}" alt="Stream Clarity" style="width: 100%; height: 100%;">
    `;
    
    // Style the button
    Object.assign(floatingButton.style, {
        position: 'absolute',
        top: '20px',
        right: '20px',
        width: '50px',
        height: '50px',
        backgroundColor: 'rgba(255, 0, 0, 0.9)',
        borderRadius: '50%',
        cursor: 'pointer',
        zIndex: '9999',
        transition: 'opacity 0.3s ease, transform 0.2s ease',
        opacity: '1',
        padding: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        pointerEvents: 'auto' // Ensure button is clickable
    });
    
    // Add hover effects
    floatingButton.addEventListener('mouseenter', () => {
        floatingButton.style.opacity = '1';
        floatingButton.style.transform = 'scale(1.1)';
    });
    
    floatingButton.addEventListener('mouseleave', () => {
        if (!isDragging) {
            setTimeout(() => {
                if (floatingButton) {
                    floatingButton.style.opacity = '0.1';
                    floatingButton.style.transform = 'scale(1)';
                }
            }, 2000);
        }
    });
    
    // Add drag functionality
    floatingButton.addEventListener('mousedown', startDrag);
    floatingButton.addEventListener('click', handleButtonClick);
    
    // Ensure parent has relative positioning
    if (getComputedStyle(buttonParent).position === 'static') {
        buttonParent.style.position = 'relative';
    }
    
    // Append to player
    buttonParent.appendChild(floatingButton);
    
    console.log('Floating button created and added to player');
    
    // Auto-fade after 3 seconds
    setTimeout(() => {
        if (floatingButton && !isDragging) {
            floatingButton.style.opacity = '0.1';
        }
    }, 3000);
    
    // Force a reflow to ensure the button is rendered
    floatingButton.offsetHeight;
}

function startDrag(e) {
    e.preventDefault();
    isDragging = true;
    
    const rect = floatingButton.getBoundingClientRect();
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;
    
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', stopDrag);
    
    floatingButton.style.opacity = '1';
}

function drag(e) {
    if (!isDragging) return;
    
    const player = floatingButton.parentElement;
    const playerRect = player.getBoundingClientRect();
    
    let newX = e.clientX - playerRect.left - dragOffset.x;
    let newY = e.clientY - playerRect.top - dragOffset.y;
    
    // Keep button within player bounds
    newX = Math.max(0, Math.min(newX, playerRect.width - floatingButton.offsetWidth));
    newY = Math.max(0, Math.min(newY, playerRect.height - floatingButton.offsetHeight));
    
    floatingButton.style.left = newX + 'px';
    floatingButton.style.top = newY + 'px';
    floatingButton.style.right = 'auto';
}

function stopDrag() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', stopDrag);
}

function handleButtonClick(e) {
    if (isDragging) {
        isDragging = false;
        return;
    }
    
    e.stopPropagation();
    console.log('Floating button clicked, opening sidebar');
    openSidebar();
}

function loadVideoContext() {
    if (!currentVideoId) return;
    
    console.log('Loading video context for:', currentVideoId);
    
    // Load transcript (fallback to video metadata)
    if (!cachedTranscript) {
        chrome.runtime.sendMessage({
            action: 'fetchTranscript',
            videoId: currentVideoId
        }, (response) => {
            if (response && response.success) {
                cachedTranscript = response.transcript;
                console.log('Transcript loaded successfully');
            } else {
                console.warn('Failed to load transcript:', response?.error);
                // Set a basic fallback
                cachedTranscript = `Video ID: ${currentVideoId}\nAnalysis available based on video context.`;
            }
        });
    }
    
    // Load comments
    if (!cachedComments) {
        chrome.runtime.sendMessage({
            action: 'fetchComments',
            videoId: currentVideoId
        }, (response) => {
            if (response && response.success) {
                cachedComments = response.comments;
                console.log('Comments loaded:', cachedComments.length, 'comments');
            } else {
                console.warn('Failed to load comments:', response?.error);
                // Set a basic fallback
                cachedComments = ['Comments not available for this video.'];
            }
        });
    }
}

function openSidebar() {
    console.log('Opening sidebar...');
    if (sidebar) {
        sidebar.remove();
    }
    
    sidebar = document.createElement('div');
    sidebar.id = 'stream-clarity-sidebar';
    sidebar.innerHTML = createSidebarHTML();
    
    // Style the sidebar
    Object.assign(sidebar.style, {
        position: 'fixed',
        top: '0',
        right: '0',
        width: '400px',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
        color: 'white',
        zIndex: '10000',
        overflowY: 'auto',
        padding: '20px',
        boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.5)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    });
    
    document.body.appendChild(sidebar);
    console.log('Sidebar added to DOM');
    
    // Add event listeners with a small delay to ensure DOM is ready
    setTimeout(() => {
        setupSidebarEventListeners();
        loadSidebarState();
    }, 100);
}

function createSidebarHTML() {
    return `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; border-bottom: 1px solid #333; padding-bottom: 15px;">
            <div style="display: flex; align-items: center; gap: 8px;">
                <h2 style="margin: 0; color: #FF0000; font-size: 24px;">Stream Clarity</h2>
                <a href="https://bolt.new/" target="_blank" rel="noopener noreferrer" style="display: inline-block; transition: opacity 0.3s ease;">
                    <img src="${chrome.runtime.getURL('black_circle_360x360.png')}" alt="Powered by Bolt.new" style="width: 20px; height: 20px; opacity: 0.8;">
                </a>
            </div>
            <button id="close-sidebar" style="background: none; border: none; color: white; font-size: 24px; cursor: pointer; padding: 5px;">×</button>
        </div>
        
        <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Response Sophistication:</label>
            <select id="sophistication-level" style="width: 100%; padding: 8px; background: #333; color: white; border: 1px solid #555; border-radius: 4px;">
                <option value="Simple">Simple</option>
                <option value="Standard" selected>Standard</option>
                <option value="Expert">Expert</option>
            </select>
        </div>
        
        <div style="margin-bottom: 20px;">
            <button id="analyze-comments" style="width: 100%; padding: 12px; background: #444; color: white; border: none; border-radius: 6px; cursor: pointer; font-size: 16px;">
                Analyze Comments
            </button>
        </div>
        
        <div style="margin-bottom: 20px;">
            <h3 style="margin-bottom: 15px; color: #FF0000;">Analysis Modes</h3>
            ${createAnalysisModesHTML()}
        </div>
        
        <div style="margin-bottom: 20px;">
            <label style="display: block; margin-bottom: 8px; font-weight: 500;">Q&A Assistant:</label>
            <textarea id="qa-input" placeholder="Ask anything about this video..." style="width: 100%; min-height: 80px; padding: 10px; background: #333; color: white; border: 1px solid #555; border-radius: 4px; resize: vertical; font-family: inherit;"></textarea>
            <button id="ask-question" style="width: 100%; padding: 10px; background: #FF0000; color: white; border: none; border-radius: 4px; cursor: pointer; margin-top: 8px;">
                Ask Question
            </button>
        </div>
        
        <div id="analysis-results" style="margin-top: 20px; padding: 15px; background: #222; border-radius: 6px; border-left: 4px solid #FF0000; display: none;">
            <h4 style="margin-top: 0; color: #FF0000;">Analysis Results</h4>
            <div id="results-content"></div>
        </div>
    `;
}

function createAnalysisModesHTML() {
    const modes = [
        {
            title: 'Deep Dive Mode',
            description: 'For educational videos and explainers',
            buttons: [
                { id: 'summarize-arguments', text: 'Summarize Key Arguments' },
                { id: 'explain-concepts', text: 'Explain Core Concepts' },
                { id: 'provide-counterarguments', text: 'Provide Counterarguments' },
                { id: 'suggest-learning', text: 'Suggest Further Learning' },
                { id: 'all-deep-dive', text: 'Get All Deep Dive Insights' }
            ]
        },
        {
            title: 'Narrative Mode',
            description: 'For movies, TV shows, and story-driven content',
            buttons: [
                { id: 'analyze-characters', text: 'Analyze Character Arcs' },
                { id: 'explain-symbolism', text: 'Explain Symbolism & Themes' },
                { id: 'find-easter-eggs', text: 'Find Easter Eggs & Trivia' },
                { id: 'plot-breakdown', text: 'Plot Breakdown' },
                { id: 'genre-tropes', text: 'Genre Tropes' },
                { id: 'all-narrative', text: 'Get All Narrative Insights' }
            ]
        },
        {
            title: 'Tutorial Mode',
            description: 'For how-to and DIY content',
            buttons: [
                { id: 'list-tools', text: 'List Required Tools & Materials' },
                { id: 'alternative-methods', text: 'Get Alternative Methods' },
                { id: 'common-pitfalls', text: 'Identify Common Pitfalls' },
                { id: 'pro-tips', text: 'Generate Pro-Tips' },
                { id: 'auto-instructions', text: 'Auto-Generate Instructions' },
                { id: 'all-tutorial', text: 'Full Tutorial Analysis' }
            ]
        },
        {
            title: 'Review Mode',
            description: 'For product reviews and critique content',
            buttons: [
                { id: 'summarize-pros', text: 'Summarize Pros' },
                { id: 'summarize-cons', text: 'Summarize Cons' },
                { id: 'analyze-bias', text: 'Analyze Reviewer\'s Bias' },
                { id: 'compare-alternatives', text: 'Compare to Alternatives' },
                { id: 'all-review', text: 'Get All Review Insights' }
            ]
        },
        {
            title: 'Music Mode',
            description: 'For music videos and performance-based content',
            buttons: [
                { id: 'interpret-lyrics', text: 'Interpret Lyrics' },
                { id: 'musical-techniques', text: 'Identify Musical Techniques' },
                { id: 'cultural-references', text: 'Find Cultural References' },
                { id: 'all-music', text: 'Get All Music Insights' }
            ]
        }
    ];
    
    return modes.map(mode => `
        <details style="margin-bottom: 15px; border: 1px solid #444; border-radius: 6px;">
            <summary style="padding: 12px; cursor: pointer; background: #333; border-radius: 6px; font-weight: 500;">
                ${mode.title}
            </summary>
            <div style="padding: 15px;">
                <p style="margin: 0 0 15px 0; color: #ccc; font-size: 14px;">${mode.description}</p>
                ${mode.buttons.map(button => `
                    <button class="analysis-button" data-action="${button.id}" style="width: 100%; padding: 8px; margin-bottom: 8px; background: #555; color: white; border: none; border-radius: 4px; cursor: pointer; text-align: left;">
                        ${button.text}
                    </button>
                `).join('')}
            </div>
        </details>
    `).join('');
}

function setupSidebarEventListeners() {
    console.log('Setting up sidebar event listeners...');
    
    // Close button
    const closeBtn = document.getElementById('close-sidebar');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
        console.log('Close button listener added');
    } else {
        console.error('Close button not found');
    }
    
    // Click outside to close
    document.addEventListener('click', (e) => {
        if (sidebar && !sidebar.contains(e.target) && e.target !== floatingButton) {
            closeSidebar();
        }
    });
    
    // Analyze comments
    const analyzeCommentsBtn = document.getElementById('analyze-comments');
    if (analyzeCommentsBtn) {
        analyzeCommentsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Analyze comments button clicked');
            showResults('🔄 Analyzing comments... Please wait.');
            analyzeContent('analyze-comments', 'Analyze the top comments for this video. Identify common themes, viewer sentiment, frequently asked questions, and notable insights from the community discussion.');
        });
        console.log('Analyze comments button listener added');
    } else {
        console.error('Analyze comments button not found');
    }
    
    // Q&A
    const askQuestionBtn = document.getElementById('ask-question');
    if (askQuestionBtn) {
        askQuestionBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const questionInput = document.getElementById('qa-input');
            const question = questionInput ? questionInput.value.trim() : '';
            if (question) {
                console.log('Q&A button clicked with question:', question);
                showResults('🔄 Processing your question... Please wait.');
                analyzeContent('qa', `Answer this question about the video: ${question}`);
            } else {
                showResults('❌ Please enter a question first.');
            }
        });
        console.log('Q&A button listener added');
    } else {
        console.error('Q&A button not found');
    }
    
    // Analysis mode buttons
    const analysisButtons = document.querySelectorAll('.analysis-button');
    console.log('Found', analysisButtons.length, 'analysis buttons');
    
    analysisButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const action = button.dataset.action;
            console.log('Analysis button clicked:', action);
            showResults('🔄 Analyzing... Please wait.');
            const prompt = getPromptForAction(action);
            analyzeContent(action, prompt);
        });
    });
    
    // Save state on changes
    const sophisticationSelect = document.getElementById('sophistication-level');
    if (sophisticationSelect) {
        sophisticationSelect.addEventListener('change', saveSidebarState);
        console.log('Sophistication select listener added');
    }
    
    console.log('All event listeners setup complete');
}

function getPromptForAction(action) {
    const prompts = {
        'analyze-comments': 'Analyze the top comments for this video. Identify common themes, viewer sentiment, frequently asked questions, and notable insights from the community discussion.',
        'summarize-arguments': 'Based on the video content, identify and list the main arguments or points being made. Extract the key claims and supporting evidence presented.',
        'explain-concepts': 'Break down the core concepts and foundational theories presented in this video into simple, easy-to-understand terms.',
        'provide-counterarguments': 'Identify potential counterarguments, alternative viewpoints, or common critiques to the main points presented in this video.',
        'suggest-learning': 'Based on the topics covered in this video, recommend related subjects, key figures, books, or external resources for further learning.',
        'all-deep-dive': 'Provide a comprehensive deep dive analysis including: key arguments, core concepts explanation, potential counterarguments, and suggestions for further learning.',
        
        'analyze-characters': 'Analyze the character development, motivations, and arcs of the main characters in this content.',
        'explain-symbolism': 'Identify and explain the symbolism, themes, metaphors, and literary devices used in this content.',
        'find-easter-eggs': 'Find hidden references, easter eggs, inside jokes, trivia, and fun facts related to this content.',
        'plot-breakdown': 'Break down the plot structure, identifying the setup, conflict, climax, and resolution of the story.',
        'genre-tropes': 'Identify common genre tropes, storytelling conventions, and any subverted expectations in this content.',
        'all-narrative': 'Provide a comprehensive narrative analysis including: character analysis, symbolism and themes, easter eggs, plot breakdown, and genre tropes.',
        
        'list-tools': 'Create a comprehensive checklist of all tools, materials, and equipment mentioned or used in this tutorial.',
        'alternative-methods': 'Describe different approaches, techniques, or methods that could be used to achieve the same result as shown in this tutorial.',
        'common-pitfalls': 'Identify typical mistakes, common errors, and potential pitfalls that beginners might encounter when following this tutorial.',
        'pro-tips': 'Extract advanced techniques, time-saving tips, and professional advice that can improve the process shown in this tutorial.',
        'auto-instructions': 'Transform this video tutorial into a clear, step-by-step written guide with numbered instructions.',
        'all-tutorial': 'Provide a complete tutorial analysis including: required tools and materials, alternative methods, common pitfalls, pro-tips, and step-by-step instructions.',
        
        'summarize-pros': 'List and explain all the positive aspects, strengths, and advantages mentioned in this review.',
        'summarize-cons': 'List and explain all the negative aspects, weaknesses, and disadvantages mentioned in this review.',
        'analyze-bias': 'Analyze potential bias in this review, looking for signs of sponsorship, personal preferences, or conflicts of interest.',
        'compare-alternatives': 'Summarize any comparisons made to similar products or alternatives mentioned in this review.',
        'all-review': 'Provide a comprehensive review analysis including: pros and cons summary, bias analysis, and comparisons to alternatives.',
        
        'interpret-lyrics': 'Analyze and interpret the lyrics of this song, explaining the meaning, themes, and deeper messages.',
        'musical-techniques': 'Identify musical techniques, production elements, vocal styles, and artistic choices used in this music.',
        'cultural-references': 'Find cultural references, historical allusions, and influences present in this music content.',
        'all-music': 'Provide a comprehensive music analysis including: lyrical interpretation, musical techniques, and cultural references.'
    };
    
    return prompts[action] || 'Analyze this video content and provide relevant insights.';
}

function analyzeContent(action, prompt) {
    console.log('=== ANALYZE CONTENT CALLED ===');
    console.log('Action:', action);
    console.log('Prompt:', prompt);
    
    const sophisticationSelect = document.getElementById('sophistication-level');
    const sophistication = sophisticationSelect ? sophisticationSelect.value : 'Standard';
    const context = buildContext();
    
    console.log('Sophistication level:', sophistication);
    console.log('Context length:', context.length);
    console.log('Current video ID:', currentVideoId);
    
    // Check if we have the required elements
    if (!currentVideoId) {
        console.error('No video ID available');
        showResults('❌ Error: No video ID found. Please refresh the page and try again.');
        return;
    }
    
    console.log('Sending message to background script...');
    
    chrome.runtime.sendMessage({
        action: 'analyzeWithOpenAI',
        prompt: prompt,
        context: context,
        sophistication: sophistication
    }, (response) => {
        console.log('=== OPENAI RESPONSE RECEIVED ===');
        console.log('Response:', response);
        
        if (chrome.runtime.lastError) {
            console.error('Chrome runtime error:', chrome.runtime.lastError);
            showResults(`❌ Error: ${chrome.runtime.lastError.message}`);
            return;
        }
        
        if (response && response.success) {
            console.log('Analysis successful, showing results');
            showResults(response.analysis);
            saveSidebarState();
        } else {
            const errorMsg = response?.error || 'Failed to analyze content. Please check your API keys and try again.';
            console.error('Analysis error:', errorMsg);
            showResults(`❌ Error: ${errorMsg}`);
        }
    });
}

function buildContext() {
    let context = '';
    
    // Always include video ID and URL for context
    if (currentVideoId) {
        context += `Video ID: ${currentVideoId}\n`;
        context += `Video URL: ${window.location.href}\n\n`;
    }
    
    if (cachedTranscript) {
        context += `Video Information:\n${cachedTranscript}\n\n`;
    }
    
    if (cachedComments && cachedComments.length > 0) {
        context += `Top Comments:\n${cachedComments.slice(0, 50).join('\n')}\n\n`;
    }
    
    // If no specific context is available, provide a basic fallback
    if (!context.trim()) {
        context = `Video URL: ${window.location.href}\nAnalysis requested for current YouTube video.`;
    }
    
    console.log('Built context preview:', context.substring(0, 200) + '...');
    return context;
}

function showResults(content) {
    console.log('Showing results:', content.substring(0, 100) + '...');
    
    const resultsDiv = document.getElementById('analysis-results');
    const resultsContent = document.getElementById('results-content');
    
    if (resultsDiv && resultsContent) {
        resultsContent.innerHTML = content.replace(/\n/g, '<br>');
        resultsDiv.style.display = 'block';
        resultsDiv.scrollIntoView({ behavior: 'smooth' });
        console.log('Results displayed successfully');
    } else {
        console.error('Results elements not found');
        console.log('resultsDiv:', resultsDiv);
        console.log('resultsContent:', resultsContent);
    }
}

function closeSidebar() {
    console.log('Closing sidebar');
    if (sidebar) {
        sidebar.remove();
        sidebar = null;
    }
}

function saveSidebarState() {
    if (!currentVideoId || !sidebar) return;
    
    const sophisticationSelect = document.getElementById('sophistication-level');
    const qaInput = document.getElementById('qa-input');
    const resultsContent = document.getElementById('results-content');
    
    const state = {
        sophistication: sophisticationSelect ? sophisticationSelect.value : 'Standard',
        qaInput: qaInput ? qaInput.value : '',
        results: resultsContent ? resultsContent.innerHTML : ''
    };
    
    chrome.storage.local.set({
        [`sidebarState_${currentVideoId}`]: state
    });
}

function loadSidebarState() {
    if (!currentVideoId) return;
    
    chrome.storage.local.get([`sidebarState_${currentVideoId}`], (result) => {
        const state = result[`sidebarState_${currentVideoId}`];
        if (state) {
            const sophisticationSelect = document.getElementById('sophistication-level');
            const qaInput = document.getElementById('qa-input');
            const resultsContent = document.getElementById('results-content');
            const resultsDiv = document.getElementById('analysis-results');
            
            if (sophisticationSelect) {
                sophisticationSelect.value = state.sophistication || 'Standard';
            }
            
            if (qaInput) {
                qaInput.value = state.qaInput || '';
            }
            
            if (state.results && resultsContent && resultsDiv) {
                resultsContent.innerHTML = state.results;
                resultsDiv.style.display = 'block';
            }
        }
    });
}

function removeStreamClarity() {
    console.log('Removing Stream Clarity elements');
    if (floatingButton) {
        floatingButton.remove();
        floatingButton = null;
    }
    if (sidebar) {
        sidebar.remove();
        sidebar = null;
    }
    // Reset state
    currentVideoId = null;
    clearCache();
    initializationAttempts = 0;
    isInitializing = false;
}