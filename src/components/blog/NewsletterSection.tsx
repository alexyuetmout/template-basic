'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubscribed(true)
    setEmail('')
  }

  if (isSubscribed) {
    return (
      <div className="mt-20 bg-gradient-to-r from-green-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Thank You for Subscribing!
        </h2>
        <p className="text-green-100">
          You&apos;ll receive the latest AI development insights in your inbox soon.
        </p>
      </div>
    )
  }

  return (
    <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-8 md:p-12 text-center">
      <h2 className="text-3xl font-bold text-white mb-4">
        Stay Updated with AI Trends
      </h2>
      <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
        Get the latest AI development insights, tutorials, and news delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
          className="flex-1 border-0 focus:ring-2 focus:ring-white/20 bg-white/10 backdrop-blur text-white placeholder-white/70"
        />
        <Button 
          type="submit"
          disabled={isSubmitting}
          className="bg-white text-blue-600 font-semibold hover:bg-blue-50 disabled:opacity-50"
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </Button>
      </form>
    </div>
  )
}