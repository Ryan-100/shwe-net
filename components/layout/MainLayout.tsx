"use client"
import React, { PropsWithChildren } from 'react'
import Header from './Header'

const MainLayout: React.FC<PropsWithChildren> = ({children}) => {
  return (
    <div className='relative bg-background'>
      <Header />
      <main className="min-h-[65vh]">
        {children}
      </main>
    </div>
  )
}

export default MainLayout