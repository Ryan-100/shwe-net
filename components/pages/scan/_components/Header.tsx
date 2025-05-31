import { Sparkles, Zap } from "lucide-react"

export const Header = () => {
  return (
    <div className="text-center mb-12 relative">
      <div className="inline-flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-2xl flex items-center justify-center shadow-2xl">
          <Sparkles className="h-6 w-6 text-white" />
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-amber-600 via-yellow-600 to-orange-600 bg-clip-text text-transparent">
          Document Scanner
        </h1>
        <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-600 rounded-2xl flex items-center justify-center shadow-2xl" style={{ animationDelay: '0.5s' }}>
          <Zap className="h-6 w-6 text-white" />
        </div>
      </div>
      <p className="text-xl text-gray-700 max-w-2xl mx-auto leading-relaxed">
        Unlock the power of AI to extract financial insights from your documents with 
        <span className="font-semibold text-amber-600"> lightning-fast precision</span>
      </p>
    </div>
  )
} 