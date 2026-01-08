'use client'

import { motion } from 'framer-motion'
import { Download } from 'lucide-react'

interface AudioPlayerProps {
  audioUrl: string
  title?: string
}

export default function AudioPlayer({ audioUrl, title = "Generated Podcast" }: AudioPlayerProps) {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = audioUrl
    link.download = `${title}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          🎧 Your Podcast is Ready!
        </h2>
        
        <div className="space-y-4">
          <audio
            controls
            className="w-full h-12"
            preload="metadata"
          >
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          
          <div className="flex justify-center">
            <motion.button
              onClick={handleDownload}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors font-semibold"
            >
              <Download className="h-4 w-4" />
              Download Podcast
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}