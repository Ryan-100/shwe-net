"use client"

import React, { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, TrendingUp, DollarSign, BarChart3, Sparkles } from 'lucide-react'

interface Message {
  id: number
  type: 'user' | 'bot'
  content: string
  timestamp: Date
  isAnimating?: boolean
}

interface QuickAction {
  icon: React.ComponentType<{ size?: number; className?: string }>
  text: string
  query: string
  gradient: string
}

interface ChatHistory2Props {
  onAnalyze?: (query: string, response: string) => void
  className?: string
}

const ChatHistory2: React.FC<ChatHistory2Props> = ({ 
  onAnalyze = null, 
  className = "" 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Welcome to Revionix! ✨ I'm your AI Financial Advisor, ready to unlock insights from your golden network of financial data. Ask me about cash flow, expenses, trends, or any financial analysis you need.",
      timestamp: new Date(),
      isAnimating: true
    }
  ])
  const [input, setInput] = useState<string>('')
  const [isTyping, setIsTyping] = useState<boolean>(false)
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Remove animation flag after animation completes
    const timer = setTimeout(() => {
      setMessages(prev => prev.map(msg => ({ ...msg, isAnimating: false })))
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const simulateFinancialAnalysis = (query: string): string => {
    const responses: Record<string, string> = {
      'cash flow': "📊 Your cash flow analysis reveals a **23% improvement** this quarter! Incoming payments show consistent growth, with your fastest-paying clients settling invoices 12 days earlier than average. However, I've identified $3,200 in pending receivables that need attention.",
      'expenses': "💰 Expense breakdown shows **operational efficiency gains** of 15%! Your largest expense categories: Staff (45%), Technology (18%), Marketing (12%). Marketing ROI is exceptional at 4.2x return. Consider reallocating 8% from operational to growth investments.",
      'revenue': "🚀 Revenue trajectory is **stellar**! Q4 shows 34% growth with diversification across 5 revenue streams. Your premium services generate 67% higher margins. Seasonal patterns suggest Q1 will be your strongest quarter yet.",
      'trends': "📈 **Key trends identified**: Customer payment cycles improved by 23%, subscription revenue grew 156%, and your average transaction value increased by $89. The golden pattern shows Friday invoicing gets paid 40% faster!",
      'profit': "💎 Profit margins are **gleaming**! Net profit increased 28% with improved operational efficiency. Your top 3 profit centers generate 78% of total margins. Consider expanding these golden revenue streams.",
      'budget': "🎯 Budget analysis shows you're **14% under budget** across all categories! Highest savings in technology (22% under) and marketing (18% under). You have $4,500 available for strategic investments this quarter.",
      'default': "✨ **Financial Health Score: 8.7/10** - Your business fundamentals are strong! I've identified 3 optimization opportunities: faster invoice processing, strategic expense reallocation, and cash flow timing improvements. Your golden network is performing exceptionally well!"
    }

    const queryLower = query.toLowerCase()
    for (const [key, response] of Object.entries(responses)) {
      if (queryLower.includes(key)) {
        return response
      }
    }
    return responses.default
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date(),
      isAnimating: true
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI processing delay with realistic timing
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: simulateFinancialAnalysis(input),
        timestamp: new Date(),
        isAnimating: true
      }

      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)

      if (onAnalyze) {
        onAnalyze(input, botResponse.content)
      }
    }, 1800 + Math.random() * 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickActions: QuickAction[] = [
    { 
      icon: TrendingUp, 
      text: "Analyze Trends", 
      query: "Show me my financial trends and patterns",
      gradient: "from-amber-400 to-yellow-500"
    },
    { 
      icon: DollarSign, 
      text: "Cash Flow", 
      query: "How is my cash flow performing?",
      gradient: "from-emerald-400 to-teal-500"
    },
    { 
      icon: BarChart3, 
      text: "Expense Analysis", 
      query: "Break down my expenses and identify savings",
      gradient: "from-orange-400 to-red-500"
    }
  ]

  return (
    <div className={`flex flex-col h-full bg-white/80 backdrop-blur-sm border border-amber-200/50 shadow-2xl overflow-hidden transition-all duration-500 ${className}`}>
      {/* Animated Header */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 opacity-90"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'30\' cy=\'30\' r=\'2\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
        
        <div className="relative flex items-center gap-4 p-6">
          <div className="relative">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
              <Bot size={24} className="text-white drop-shadow-lg" />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping"></div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full"></div>
          </div>
          <div>
            <h3 className="font-bold text-xl text-white drop-shadow-md">Revionix AI Advisor</h3>
            <p className="text-white/90 text-sm font-medium">Your Golden Network for Smarter Finance</p>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 p-6 h-full overflow-y-auto space-y-6 bg-gradient-to-b from-amber-50/50 to-white/50">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`flex gap-4 ${message.type === 'user' ? 'justify-end' : 'justify-start'} ${
              message.isAnimating ? 'animate-fade-in-up' : ''
            }`}
          >
            {message.type === 'bot' && (
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg animate-pulse">
                <Bot size={24} className="text-white" />
              </div>
            )}
            <div className={`max-w-[85%] px-6 py-4 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 ${
              message.type === 'user' 
                ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-br-md shadow-blue-500/25' 
                : 'bg-white/90 text-gray-800 rounded-bl-md border border-amber-100 shadow-amber-500/10'
            }`}>
              <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {message.content.split('**').map((part, index) => 
                  index % 2 === 1 ? <strong key={index} className="font-bold text-amber-600">{part}</strong> : part
                )}
              </div>
              <div className={`text-xs mt-2 flex items-center gap-2 ${
                message.type === 'user' ? 'text-white/80' : 'text-gray-500'
              }`}>
                <span>{message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                {message.type === 'bot' && <Sparkles size={12} className="animate-pulse" />}
              </div>
            </div>
            {message.type === 'user' && (
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg">
                <User size={24} className="text-white" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-4 justify-start animate-fade-in-up">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg animate-pulse">
              <Bot size={24} className="text-white" />
            </div>
            <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl rounded-bl-md border border-amber-100 shadow-lg">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-4 bg-gradient-to-r from-amber-50/80 to-yellow-50/80 backdrop-blur-sm border-t border-amber-100/50">
        <div className="flex gap-3 flex-wrap">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => setInput(action.query)}
              className={`group flex items-center gap-2 px-4 py-3 bg-gradient-to-r ${action.gradient} hover:shadow-lg hover:scale-105 text-white rounded-xl text-sm font-medium transition-all duration-300 transform hover:-translate-y-1`}
            >
              <action.icon size={16} className="group-hover:rotate-12 transition-transform duration-300" />
              <span className="drop-shadow-sm">{action.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Input */}
      <div className="p-6 bg-white/90 backdrop-blur-sm border-t border-amber-100/50">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setIsExpanded(true)}
              onBlur={() => setIsExpanded(false)}
              placeholder="Ask about your finances, cash flow, trends..."
              className="w-full p-4 border-2 border-amber-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 text-sm bg-white/80 backdrop-blur-sm placeholder-gray-500 transition-all duration-300 shadow-inner"
              disabled={isTyping}
            />
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-4 py-2 md:px-6 md:py-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transform disabled:scale-100 disabled:hover:scale-100"
          >
            <Send size={18} className={`${isTyping ? 'animate-pulse' : 'group-hover:translate-x-1'} transition-transform duration-300`} />
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default ChatHistory2