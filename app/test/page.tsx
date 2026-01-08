'use client'

import React, { useState } from 'react'

const TestPage = () => {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const testNewGenEndpoint = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const response = await fetch('/api/new-gen', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // ✅ Murf returns audio binary — not JSON
      const blob = await response.blob()
      const audioUrl = URL.createObjectURL(blob)
      setResult(audioUrl)

      
      // Optional autoplay
      const audio = new Audio(audioUrl)
      audio.play()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const testMultiVoiceEndpoint = async () => {
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      // Test conversation data
      const testConversation = [
        { role: 'host', content: 'Welcome to today\'s podcast about artificial intelligence.' },
        { role: 'guest', content: 'Thank you for having me. AI has revolutionized many industries.' },
        { role: 'host', content: 'That\'s fascinating! Can you tell us more about the impact?' },
        { role: 'guest', content: 'Absolutely! AI is transforming healthcare, finance, and education.' }
      ]

      const response = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversation: testConversation }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      // Get the audio blob
      const blob = await response.blob()
      const audioUrl = URL.createObjectURL(blob)
      setResult(audioUrl)

      // Optional autoplay
      const audio = new Audio(audioUrl)
      audio.play()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Test Audio Generation Endpoints</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 space-y-4">
          <button
            onClick={testNewGenEndpoint}
            disabled={loading}
            className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? 'Testing...' : 'Test Single Voice (New-Gen)'}
          </button>

          <button
            onClick={testMultiVoiceEndpoint}
            disabled={loading}
            className={`w-full px-6 py-3 rounded-lg font-semibold transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {loading ? 'Testing...' : 'Test Multi-Voice Podcast'}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
              <h3 className="font-semibold">Error:</h3>
              <p>{error}</p>
            </div>
          )}

          {result && (
            <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
              <h3 className="font-semibold">Success! Audio Response:</h3>
              <audio controls src={result} className="mt-2 w-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TestPage
