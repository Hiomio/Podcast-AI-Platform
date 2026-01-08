# 🎙️ PodWise Application Flow Diagram

```mermaid
graph TD
    A["User enters website URL"] --> B["UrlInput Component"]
    B --> C["POST /api/generate-script"]
    C --> D["Content Scraping Service"]
    D --> E["LoadingSpinner: Analyzing webpage..."]
    E --> F["ConversationViewer: Display chat bubbles"]
    F --> G["User clicks Generate Audio"]
    G --> H["AudioGenerator Component"]
    H --> I["POST /api/generate-audio"]
    I --> J["LoadingSpinner: Converting to audio..."]
    J --> K["AudioPlayer: Play podcast"]
    K --> L["Download/Regenerate options"]
    L --> M["Create Another Podcast"]
    M --> A

    subgraph "Frontend Components"
        B
        E
        F
        H
        J
        K
    end

    subgraph "API Routes"
        C
        I
    end

    subgraph "Services"
        D
    end

    subgraph "User Actions"
        A
        G
        L
        M
    end

    style A fill:#e1f5fe
    style K fill:#c8e6c9
    style C fill:#fff3e0
    style I fill:#fff3e0
    style H fill:#f3e5f5
    style D fill:#fff8e1
```

## 🏗️ Architecture Overview

```mermaid
graph TB
    subgraph "Frontend Layer"
        A["Next.js 14 App Router"]
        B["React Components"]
        C["Tailwind CSS"]
        D["Framer Motion"]
    end

    subgraph "Component Layer"
        E["Header.tsx"]
        F["UrlInput.tsx"]
        G["ConversationViewer.tsx"]
        H["AudioGenerator.tsx"]
        I["AudioPlayer.tsx"]
        J["LoadingSpinner.tsx"]
    end

    subgraph "API Layer"
        K["/api/generate-script"]
        L["/api/generate-audio"]
    end

    subgraph "Modular Services"
        M["podcastGenerator.ts"]
        N["audioGenerator.ts"]
        O["audioMerger.ts"]
        P["contentScraping.ts"]
        Q["gemini.service.ts"]
    end

    subgraph "External Services"
        R["Gemini API"]
        S["Murf TTS API"]
    end

    A --> B
    B --> E
    B --> F
    B --> G
    B --> H
    B --> I
    B --> J
    F --> K
    H --> L
    K --> P
    L --> M
    M --> N
    M --> O
    Q --> R
    N --> S

    style A fill:#bbdefb
    style R fill:#c8e6c9
    style S fill:#c8e6c9
    style H fill:#f3e5f5
    style M fill:#fff3e0
```

## 🔄 State Management Flow

```mermaid
stateDiagram-v2
    [*] --> input: App starts
    input --> conversation: Script generated
    conversation --> audio_ready: User clicks Generate Audio
    audio_ready --> input: Start over

    state input {
        [*] --> url_input
        url_input --> loading_script
        loading_script --> [*]
    }

    state conversation {
        [*] --> display_chat
        display_chat --> [*]
    }

    state audio_ready {
        [*] --> audio_generator
        audio_generator --> loading_audio
        loading_audio --> audio_player
        audio_player --> [*]
    }
```

## 🧩 Component Hierarchy

```mermaid
graph TD
    A["App Root"] --> B["Header Component"]
    A --> C["Main Page"]
    C --> D["UrlInput Component"]
    C --> E["ConversationViewer Component"]
    C --> F["AudioGenerator Component"]
    C --> G["LoadingSpinner Component"]

    D --> H["URL Form"]
    D --> I["Submit Button"]
    D --> J["Error Display"]

    E --> K["Chat Bubbles"]
    E --> L["Generate Audio Button"]

    F --> M["AudioPlayer Component"]
    F --> N["Download Button"]
    F --> O["Regenerate Button"]
    F --> P["Start Over Button"]
    F --> Q["Error Display"]

    M --> R["Audio Controls"]
    M --> S["Download Podcast Button"]

    G --> T["Spinner Animation"]
    G --> U["Loading Message"]

    style A fill:#e3f2fd
    style C fill:#f3e5f5
    style D fill:#fff8e1
    style E fill:#e8f5e8
    style F fill:#fce4ec
    style G fill:#f1f8e9
    style M fill:#e1f5fe
```

## 📊 Data Flow

```mermaid
sequenceDiagram
    participant U as User
    participant UI as Frontend
    participant API as API Routes
    participant AI as AI Services
    participant TTS as TTS Services
    participant MG as Modular Services

    U->>UI: Enter URL
    UI->>API: POST /generate-script
    API->>MG: contentScraping
    MG->>MG: Extract article content
    MG-->>API: Scraped content
    API->>AI: Analyze content
    AI-->>API: Return conversation
    API-->>UI: JSON response
    UI->>U: Show conversation

    U->>UI: Click Generate Audio
    UI->>UI: Show AudioGenerator
    UI->>API: POST /generate-audio
    API->>MG: podcastGenerator
    MG->>TTS: Parallel audio generation
    TTS-->>MG: Audio buffers
    MG->>MG: Buffer concatenation
    MG-->>API: Binary audio data
    API-->>UI: Binary response
    UI->>UI: Create blob URL
    UI->>U: Show audio player
```

## 🎯 Key Features

- **Modern UI**: Gradient backgrounds, smooth animations
- **Responsive Design**: Works on all devices
- **Real-time Feedback**: Loading states and progress indicators
- **Multi-Voice Audio**: Different voices for host and guest
- **Audio Controls**: Play, pause, download, regenerate
- **Error Handling**: Comprehensive error messages and recovery
- **State Management**: Clean flow between app states
- **TypeScript**: Full type safety
- **Modular Architecture**: Reusable and maintainable services
- **Binary Audio Processing**: Efficient audio generation and streaming
- **Parallel Processing**: Fast audio generation for multiple messages
