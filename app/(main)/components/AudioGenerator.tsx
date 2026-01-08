'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ConversationMessage } from './UrlInput'
import AudioPlayer from './AudioPlayer'
import LoadingSpinner from './LoadingSpinner'

interface AudioGeneratorProps {
  conversation: ConversationMessage[]
  onStartOver: () => void
}

export default function AudioGenerator({ conversation, onStartOver }: AudioGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')
  const [error, setError] = useState('')

  const handleGenerateAudio = async () => {
    setIsGenerating(true)
    setError('')
    setAudioUrl('')
    
    try {
      const response = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversation }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error || `Failed to generate audio: ${response.status}`)
      }

      // Handle binary audio data properly
      const audioBlob = await response.blob()
      const audioUrl = URL.createObjectURL(audioBlob)
      setAudioUrl(audioUrl)
    } catch (error) {
      console.error('Error generating audio:', error)
      setError(error instanceof Error ? error.message : 'Failed to generate audio')
    } finally {
      setIsGenerating(false)
    }
  }


  if (isGenerating) {
    return <LoadingSpinner message="Converting conversation to audio podcast..." />
  }

  if (audioUrl) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <AudioPlayer audioUrl={audioUrl} title="Generated Podcast" />
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={handleGenerateAudio}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            🔄 Regenerate Audio
          </motion.button>
          
          <motion.button
            onClick={onStartOver}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-gray-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
          >
            🆕 Create Another Podcast
          </motion.button>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-6"
    >
      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-xl"
        >
          <p className="font-semibold">❌ Error:</p>
          <p>{error}</p>
        </motion.div>
      )}
      
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🎙️ Ready to Generate Audio
        </h2>
        <p className="text-gray-600 mb-6 text-lg">
          Your conversation has <span className="font-semibold text-indigo-600">{conversation.length}</span> messages. 
          Click below to generate the podcast audio with different voices for host and guest.
        </p>
        
        <motion.button
          onClick={handleGenerateAudio}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-8 rounded-xl font-semibold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg"
        >
          🎵 Generate Podcast Audio
        </motion.button>
      </div>
    </motion.div>
  )
}
