# 🎙️ PodWise - AI-Powered Podcast Generator

Transform any URL into a professional podcast conversation using AI. PodWise scrapes content, generates engaging host-guest conversations, and converts them into high-quality audio podcasts with different voices.

## ✨ Features

### 🚀 Current Features
- **📄 Content Scraping**: Extract content from any URL
- **🤖 AI Conversation Generation**: Create natural host-guest dialogues using Gemini AI
- **🎵 Multi-Voice Audio**: Generate audio with different voices for host and guest
- **📱 Modern UI**: Beautiful, responsive interface with smooth animations
- **⬇️ Download Support**: Download generated podcasts as MP3 files
- **🔄 Regenerate Options**: Easy regeneration of audio with different settings
- **⚡ Real-time Processing**: Fast audio generation with parallel processing
- **🛡️ Error Handling**: Comprehensive error handling and user feedback

### 🎯 Technical Highlights
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Murf AI** for text-to-speech
- **Google Gemini** for conversation generation
- **Modular Architecture** for maintainability

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Frontend      │    │   API Routes     │    │   Services      │
│   (Next.js)     │◄──►│   (Next.js API)  │◄──►│   (Modular)     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Components    │    │   Route Handlers │    │   AI Services   │
│   • UrlInput    │    │   • Script Gen   │    │   • Gemini      │
│   • AudioPlayer │    │   • Audio Gen    │    │   • Murf TTS    │
│   • AudioGen    │    │   • Error Handle │    │   • Content     │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Murf AI API key
- Google Gemini API key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/podwise.git
cd podwise
```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Add your API keys to `.env.local`:
   ```env
MURF_API_KEY=your_murf_api_key_here
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

1. **Enter a URL**: Paste any article or content URL
2. **Generate Script**: AI creates a natural host-guest conversation
3. **Review Conversation**: Check the generated dialogue
4. **Generate Audio**: Convert to multi-voice podcast
5. **Download**: Save your podcast as MP3

## 🛠️ Development

### Project Structure
```
podwise/
├── app/
│   ├── (main)/
│   │   ├── components/          # React components
│   │   └── page.tsx            # Main page
│   └── api/                    # API routes
│       ├── generate-script/    # Script generation
│       └── generate-audio/     # Audio generation
├── services/                   # Business logic
│   ├── gemini.service.ts      # AI conversation
│   ├── murf.ts               # Text-to-speech
│   └── contentScraping.ts    # Web scraping
├── utils/                     # Utilities
│   ├── voicePack.ts          # Voice configurations
│   └── debug-utils/          # Debugging tools
└── prompts/                   # AI prompts
    └── podcastPrompt.ts      # Conversation templates
```

### Key Components

#### 🎵 Audio Generation Pipeline
```typescript
Conversation → Voice Assignment → Parallel TTS → Buffer Concatenation → MP3 Output
```

#### 🧠 AI Conversation Flow
```typescript
URL → Content Scraping → Gemini AI → Host/Guest Dialogue → Audio Generation
```

## 🔧 Configuration

### Voice Settings
Edit `utils/voicePack.ts` to customize voices:
```typescript
export const voicePack = [
  { voiceId: "en-IN-isha", displayName: "Isha (F)" },
  { voiceId: "en-IN-eashwar", displayName: "Eashwar (M)" },
  // Add more voices...
];
```

### AI Prompts
Customize conversation style in `prompts/podcastPrompt.ts`:
```typescript
export const podcastPrompt = `
Create an engaging podcast conversation between a host and guest...
`;
```

## 🚀 Future Improvements

### 🎯 Phase 1: Performance & Scalability
- **📊 Message Queues**: Implement Redis/RabbitMQ for handling long conversations
- **⚡ Kafka Integration**: Real-time processing for 1000+ message conversations
- **🔄 Background Jobs**: Queue-based audio generation with progress tracking
- **💾 Caching Layer**: Redis caching for frequently requested content
- **📈 Load Balancing**: Horizontal scaling for high-traffic scenarios

### 🎯 Phase 2: Enhanced UI & Data
- **🎨 Advanced UI**: 
  - Drag-and-drop conversation editing
  - Real-time collaboration features
  - Advanced audio controls (speed, pitch, effects)
  - Custom voice mixing and effects
- **🗄️ Database Integration**:
  - PostgreSQL for podcast storage and metadata
  - User authentication and podcast libraries
  - Search and filtering capabilities
  - Podcast analytics and insights
- **☁️ Cloud Storage**: AWS S3/CloudFront for podcast hosting and CDN

### 🎯 Phase 3: Real-time Features
- **🎤 Live Podcast Creation**:
  - Murf WebSocket API integration
  - Real-time speech-to-text service
  - Live voice interaction as podcast host
  - Real-time audio streaming
- **🤝 Interactive Features**:
  - Live audience participation
  - Real-time Q&A integration
  - Voice command controls
  - Live transcription and subtitles

### 🎯 Phase 4: Advanced AI Features
- **🧠 Enhanced AI**:
  - Custom AI model training for better conversations
  - Emotion detection and voice modulation
  - Multi-language support with native accents
  - Context-aware conversation generation
- **🎵 Audio Intelligence**:
  - Automatic music and sound effect insertion
  - Dynamic volume and pacing adjustments
  - Background noise reduction
  - Audio quality enhancement

### 🎯 Phase 5: Platform Features
- **📱 Mobile App**: React Native app for mobile podcast creation
- **🔗 API Platform**: Public API for third-party integrations
- **📊 Analytics Dashboard**: Detailed podcast performance metrics
- **🌐 Multi-tenant**: White-label solutions for organizations
- **🔐 Enterprise Features**: SSO, advanced permissions, compliance

## 🛡️ Technical Considerations

### Performance Optimizations
- **Parallel Processing**: Concurrent audio generation for multiple messages
- **Memory Management**: Streaming for large audio files
- **CDN Integration**: Global content delivery for fast access
- **Database Optimization**: Indexing and query optimization

### Security & Compliance
- **API Rate Limiting**: Prevent abuse and ensure fair usage
- **Content Moderation**: AI-powered content filtering
- **GDPR Compliance**: Data privacy and user rights
- **Secure Storage**: Encrypted podcast and user data

### Monitoring & Reliability
- **Health Checks**: Automated system monitoring
- **Error Tracking**: Comprehensive error logging and alerting
- **Performance Metrics**: Real-time system performance monitoring
- **Backup Systems**: Automated backups and disaster recovery

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
```bash
# Install dependencies
npm install

# Run tests
npm test

# Run linting
npm run lint

# Build for production
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Murf AI** for high-quality text-to-speech
- **Google Gemini** for intelligent conversation generation
- **Next.js** for the amazing React framework
- **Tailwind CSS** for beautiful styling

## 📞 Support

- 📧 Email: support@podwise.com
- 💬 Discord: [Join our community](https://discord.gg/podwise)
- 📖 Documentation: [docs.podwise.com](https://docs.podwise.com)
- 🐛 Issues: [GitHub Issues](https://github.com/yourusername/podwise/issues)

---

**Made with ❤️ 

*Transform any content into engaging podcasts with the power of AI*