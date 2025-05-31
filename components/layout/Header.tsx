import React from 'react'
import Logo from '../shared/Logo'

const Header = () => {
  return (
    <header className="px-6 py-8 shadow w-full">
      <div className="flex items-center justify-between animate-fade-in">
        <Logo/>
      </div>
    </header>
  )
}

export default Header
