'use client'

import { motion } from 'framer-motion'

interface LoadingSpinnerProps {
  message?: string
}

export default function LoadingSpinner({ message = "Generating..." }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <motion.div
        className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <p className="mt-4 text-gray-600 font-medium">{message}</p>
    </div>
  )
}