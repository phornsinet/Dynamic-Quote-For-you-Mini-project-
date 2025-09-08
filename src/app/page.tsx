"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Quote, RefreshCw } from "lucide-react"

interface QuoteData {
  id: number
  text: string
  author: string
}

export default function QuoteGenerator() {
  const [quote, setQuote] = useState<QuoteData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchRandomQuote = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/quotes")
      const data = await response.json()

      if (data.success) {
        setQuote(data.quote)
      }
    } catch (error) {
      console.error("Failed to fetch quote:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4 relative"
      style={{ backgroundImage: "url(/b1.jpg)" }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="w-full max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Quote className="w-8 h-8 text-white/90" />
            <h1 className="text-4xl md:text-5xl font-bold text-balance drop-shadow-2xl">
              <span className="text-red-400" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
                Dynamic
              </span>{" "}
              <span className="text-yellow-400" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
                Quote
              </span>{" "}
              <span className="text-purple-400" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.8)" }}>
                For you
              </span>
            </h1>
          </div>
          <p className="text-lg text-white/90 text-pretty drop-shadow-md">Discover inspiration with every click</p>
        </div>
        <Card className="p-8 mb-8 bg-white-90 backdrop-blur-md border-white/20 shadow-2xl">
          {quote ? (
            <div className="text-center space-y-6">
              <blockquote className="text-2xl md:text-3xl font-medium text-white/90  dark:text-slate-200 leading-relaxed text-balance">
                "{quote.text}"
              </blockquote>
              <cite className="block text-lg text-white-600 dark:text-slate-400 font-medium">— {quote.author}</cite>
            </div>
          ) : (
            <div className="text-center py-12">
              <Quote className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-xl text-white/90 dark:text-slate-500 dark:text-slate-400">
                Click the button below to get your first inspiring quote 
              </p>
            </div>
          )}
        </Card>
        <div className="text-center">
          <Button
            onClick={fetchRandomQuote}
            disabled={isLoading}
            size="lg"
            className="px-8 py-4 text-lg font-semibold bg-white/90 hover:bg-white text-slate-900 hover:text-slate-800 transition-all duration-200 shadow-lg hover:shadow-xl backdrop-blur-sm"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Quote className="w-5 h-5 mr-2" />
                {quote ? "Get Another Quote" : "Generate Quote"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
