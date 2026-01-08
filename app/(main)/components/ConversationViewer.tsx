'use client'

import { motion } from 'framer-motion'
import { User, Bot } from 'lucide-react'
import { ConversationMessage } from './UrlInput'

interface ConversationViewerProps {
  conversation: ConversationMessage[]
  onGenerateAudio: () => void
  isGeneratingAudio: boolean
}

export default function ConversationViewer({ 
  conversation, 
  onGenerateAudio, 
  isGeneratingAudio 
}: ConversationViewerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Generated Conversation
        </h2>
        
        <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
          {conversation.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: message.role === 'host' ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`flex gap-3 ${message.role === 'host' ? 'flex-row' : 'flex-row-reverse'}`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'host' 
                  ? 'bg-indigo-100 text-indigo-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {message.role === 'host' ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>
              
              <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                message.role === 'host'
                  ? 'bg-indigo-500 text-white rounded-bl-md'
                  : 'bg-gray-200 text-gray-900 rounded-br-md'
              }`}>
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        onClick={onGenerateAudio}
        disabled={isGeneratingAudio}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-green-600 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isGeneratingAudio ? 'Generating Audio...' : 'Generate Audio Podcast'}
      </motion.button>
    </motion.div>
  )
}