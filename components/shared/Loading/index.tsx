import React from 'react'

interface LoadingProps {
  text?:string
}

const Loading:React.FC<LoadingProps> = ({text}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-50">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="relative mb-8">
          <div className="w-20 h-20 border-4 border-amber-200 rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-20 h-20 border-4 border-amber-500 rounded-full animate-spin border-t-transparent"></div>
        </div>
        {text && <div className="text-amber-600 font-semibold text-lg animate-pulse-soft">
         {text}
        </div>}
      </div>
    </div>
  )
}

export default Loading
