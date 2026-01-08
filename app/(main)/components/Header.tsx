'use client'

import { Mic } from 'lucide-react'

export default function Header() {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center gap-3 mb-4">
        <Mic className="h-8 w-8 text-indigo-600" />
        <h1 className="text-4xl font-bold text-gray-900">PodWise</h1>
      </div>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Turn any article or webpage into an engaging AI-generated podcast conversation
      </p>
    </div>
  )
}