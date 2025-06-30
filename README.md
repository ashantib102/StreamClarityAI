# Stream Clarity - YouTube Video Analysis Extension

AI-powered Chrome extension that provides multi-perspective analysis on any YouTube video.

## Features

- **Deep Dive Mode** - For educational videos and explainers
- **Narrative Mode** - For movies, TV shows, and story-driven content  
- **Tutorial Mode** - For how-to and DIY content
- **Review Mode** - For product reviews and critique content
- **Music Mode** - For music videos and performance-based content
- **Comment Analysis** - Analyze top comments for insights
- **Q&A Assistant** - Ask questions about video content
- **Smart Summaries** - Choose sophistication level (Simple, Standard, Expert)

## Installation

### Prerequisites

You'll need API keys for:
- **OpenAI API** - Get from [OpenAI Platform](https://platform.openai.com/api-keys)
- **YouTube Data API v3** - Get from [Google Cloud Console](https://console.developers.google.com/)

### Setup

1. **Clone or download this repository**
   ```bash
   git clone https://github.com/yourusername/stream-clarity-extension.git
   cd stream-clarity-extension
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API Keys**
   - Copy `.env.example` to `.env`
   - Replace the placeholder values with your actual API keys:
   ```env
   VITE_OPENAI_API_KEY=your_openai_api_key_here
   VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

4. **Build the extension**
   ```bash
   npm run build
   ```

5. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `dist` folder from your project

## Development

To run the development server for the website:
```bash
npm run dev
```

To build for production:
```bash
npm run build
```

## Usage

1. Navigate to any YouTube video
2. Look for the Stream Clarity floating button (red circle with logo)
3. Click the button to open the analysis sidebar
4. Choose your analysis mode and sophistication level
5. Get AI-powered insights about the video content

## Security

- API keys are stored in environment variables and injected at build time
- Keys are never exposed in the source code or committed to version control
- The `.env` file is automatically ignored by Git

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For questions or issues, contact: ashantib102@gmail.com