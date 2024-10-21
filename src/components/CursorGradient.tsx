import React, { useState, useEffect } from 'react'

const CursorGradient = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (e: any) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', updatePosition)

    return () => window.removeEventListener('mousemove', updatePosition)
  }, [])

  return (
    <div
      className="fixed pointer-events-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '20vmax',
        height: '20vmax',
        transform: 'translate(-50%, -50%)',
        background: 'linear-gradient(90deg, #3effe8 1.98%, #3effe8 1.99%, #8c0fee)',
        filter: 'blur(60px)',
        zIndex: -1,
        animation: 'breathe 8s linear infinite'
      }}
    />
  )
}

export default CursorGradient
