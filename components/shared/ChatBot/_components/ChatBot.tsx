"use client"
import React, { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Send, Bot, User, TrendingUp, DollarSign, BarChart3 } from 'lucide-react';

interface Message {
  id: number;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

interface ChatHistoryProps {
  onAnalyze?: (input: string, response: string) => void;
  className?: string;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ onAnalyze = null, className = "" }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: 'bot',
      content: "Hello! I'm your Revionix AI Financial Advisor. I can help analyze your finances, explain cash flow patterns, and provide strategic insights. What would you like to know about your business?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateFinancialAnalysis = (query: string): string => {
    const responses = {
      'cash flow': "Based on your recent transactions, your cash flow shows a positive trend with 15% growth this month. Your main income sources are performing well, but I notice irregular payment patterns that could be optimized.",
      'expenses': "Your expense analysis reveals that operational costs account for 60% of spending. Marketing expenses increased by 8% last month, which correlates with a 12% revenue boost - a positive ROI.",
      'revenue': "Revenue analysis shows steady growth with Q3 performing 23% better than Q2. Your top revenue streams are diversified across 3 main categories, reducing business risk.",
      'trends': "Key financial trends indicate seasonal patterns in your business. Revenue peaks occur in months 3, 7, and 11, while expenses remain relatively stable throughout the year.",
      'default': "I've analyzed your financial data and found several key insights. Your business shows healthy fundamentals with opportunities for optimization in payment processing and expense categorization."
    };

    const query_lower = query.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (query_lower.includes(key)) {
        return response;
      }
    }
    return responses.default;
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        type: 'bot',
        content: simulateFinancialAnalysis(input),
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);

      // Call external analysis function if provided
      if (onAnalyze) {
        onAnalyze(input, botResponse.content);
      }
    }, 1500);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const QuickActions = () => (
    <div className="flex gap-2 mb-4 flex-wrap">
      {[
        { icon: TrendingUp, text: "Analyze trends", query: "Show me my financial trends" },
        { icon: DollarSign, text: "Cash flow", query: "How is my cash flow?" },
        { icon: BarChart3, text: "Expenses", query: "Break down my expenses" }
      ].map((action, index) => (
        <button
          key={index}
          onClick={() => setInput(action.query)}
          className="flex items-center gap-2 px-3 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg text-sm text-amber-700 transition-colors"
        >
          <action.icon size={14} />
          {action.text}
        </button>
      ))}
    </div>
  );

  return (
    <div className={`flex flex-col bg-white rounded-xl shadow-lg h-full ${className}`}>
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-gray-100 bg-gradient-to-r from-amber-50 to-yellow-50">
        <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
          <Bot size={16} className="text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Revionix AI Advisor</h3>
          <p className="text-xs text-gray-600">Your Golden Network for Smarter Finance</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 h-full overflow-y-auto space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.type === 'bot' && (
              <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot size={12} className="text-white" />
              </div>
            )}
            <div className={`max-w-[80%] px-4 py-3 rounded-lg ${
              message.type === 'user' 
                ? 'bg-blue-500 text-white rounded-br-sm' 
                : 'bg-gray-100 text-gray-800 rounded-bl-sm'
            }`}>
              <p className="text-sm leading-relaxed">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            {message.type === 'user' && (
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <User size={12} className="text-white" />
              </div>
            )}
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3 justify-start">
            <div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <Bot size={12} className="text-white" />
            </div>
            <div className="bg-gray-100 px-4 py-3 rounded-lg rounded-bl-sm">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4">
        <QuickActions />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-100">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about your finances, cash flow, trends..."
            className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-sm"
            disabled={isTyping}
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 disabled:bg-gray-300 text-white rounded-lg transition-colors flex items-center justify-center"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHistory;