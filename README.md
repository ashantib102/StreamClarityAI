# Stream Clarity - YouTube Video Analysis Extension

AI-powered Chrome extension that provides multi-perspective analysis on any YouTube video with advanced AI insights.

## 🚀 Features

- **Deep Dive Mode** - Analyze educational content with key arguments, concepts, and counterarguments
- **Narrative Mode** - Explore movies and TV shows with character analysis, symbolism, and themes  
- **Tutorial Mode** - Transform how-to videos into actionable insights with tools, tips, and instructions
- **Review Mode** - Get balanced product analysis with pros, cons, and bias detection
- **Music Mode** - Interpret lyrics, musical techniques, and cultural references
- **Comment Analysis** - Analyze top comments for sentiment and community insights
- **Q&A Assistant** - Ask questions and get contextual answers about video content
- **Smart Summaries** - Choose sophistication levels (Simple, Standard, Expert)

## 🔧 Installation

### Prerequisites
- Google Chrome browser
- OpenAI API key ([Get one here](https://platform.openai.com/api-keys))
- YouTube Data API v3 key ([Get one here](https://console.developers.google.com/))

### Steps
1. **Download the extension**
   ```bash
   git clone https://github.com/YOUR_USERNAME/stream-clarity-extension.git
   cd stream-clarity-extension
   ```

2. **Install in Chrome**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the project folder

3. **Configure API Keys**
   - Click the Stream Clarity extension icon in Chrome toolbar
   - Enter your OpenAI API key
   - Enter your YouTube Data API v3 key
   - Click "Save API Keys"

## 🔐 Security

API keys are stored securely in Chrome's local storage and are never exposed in the code or transmitted anywhere except to the respective APIs (OpenAI and YouTube). The keys are encrypted and only accessible to the extension.

## 📖 Usage

1. Navigate to any YouTube video
2. Look for the red Stream Clarity floating button on the video player
3. Click the button to open the analysis sidebar
4. Choose your analysis mode and sophistication level
5. Click any analysis button or ask questions in the Q&A section

## 🛠️ Development

### Project Structure
```
stream-clarity-extension/
├── public/                 # Extension files
│   ├── manifest.json      # Extension manifest
│   ├── background.js      # Service worker
│   ├── content.js         # Content script
│   ├── popup.html         # Extension popup
│   └── popup.js           # Popup functionality
├── src/                   # Website source
│   ├── components/        # React components
│   └── App.tsx           # Main app component
└── README.md
```

### Building the Website
```bash
npm install
npm run build
```

## 🔑 API Key Setup

### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key (starts with `sk-proj-` or `sk-`)

### YouTube Data API v3 Key
1. Go to [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select existing
3. Enable YouTube Data API v3
4. Create credentials (API key)
5. Copy the key (starts with `AIza`)

## 🚨 Important Security Notes

- **Never commit API keys to version control**
- API keys are stored locally in Chrome storage
- Keys are only sent to OpenAI and YouTube APIs
- Clear your browser data to remove stored keys
- Regenerate keys if compromised

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📧 Support

For questions or support, email: ashantib102@gmail.com

## 🔗 Links

- [Website](https://streamclarityai.online/)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [YouTube Data API Documentation](https://developers.google.com/youtube/v3)
