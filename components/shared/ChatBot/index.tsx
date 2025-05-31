"use client"
import React from 'react'
import { Bot } from 'lucide-react'
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import ChatHistory from './_components/ChatBot';
import ChatHistory2 from './_components/ChatBot2';

const ChatBot = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className='fixed bottom-10 right-10'>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTitle hidden></SheetTitle>
        <SheetTrigger  asChild>
          <div className="w-12 h-12 lg:w-16 lg:h-16 cursor-pointer bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Bot size={32} className="text-white" />
          </div>
        </SheetTrigger>
        <SheetContent className="w-full md:w-1/2 lg:w-1/3 bg-background p-0" side="right">
          <ChatHistory2  onAnalyze={(query, response) => {
            // Handle analysis data
            console.log('User asked:', query);
            console.log('AI responded:', response);
          }}/>
        </SheetContent>

      </Sheet>
    </div>
  )
}

export default ChatBot
