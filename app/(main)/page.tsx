'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from './components/Header'
import UrlInput, { ConversationMessage } from './components/UrlInput'
import ConversationViewer from './components/ConversationViewer'
import AudioGenerator from './components/AudioGenerator'

type AppState = 'input' | 'conversation' | 'audio-ready'

export default function Home() {
  const [appState, setAppState] = useState<AppState>('input')
  const [conversation, setConversation] = useState<ConversationMessage[]>([])

  const handleScriptGenerated = (newConversation: ConversationMessage[]) => {
    setConversation(newConversation)
    setAppState('conversation')
  }

  const handleGenerateAudio = () => {
    setAppState('audio-ready')
  }

  const handleStartOver = () => {
    setAppState('input')
    setConversation([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >
          {appState === 'input' && (
            <UrlInput onScriptGenerated={handleScriptGenerated} />
          )}

          {appState === 'conversation' && (
            <ConversationViewer
              conversation={conversation}
              onGenerateAudio={handleGenerateAudio}
              isGeneratingAudio={false}
            />
          )}

          {appState === 'audio-ready' && (
            <AudioGenerator 
              conversation={conversation}
              onStartOver={handleStartOver}
            />
          )}
        </motion.div>
      </div>
    </div>
  )
}