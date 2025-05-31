import React from 'react'
import Link from 'next/link'
import { Zap } from 'lucide-react'

const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-3">
      <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
        <Zap className="w-7 h-7 text-white" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-gray-900">ShweNet</h1>
        <p className="text-sm text-gray-600">Golden Network</p>
      </div>
    </Link>
  )
}

export default Logo
