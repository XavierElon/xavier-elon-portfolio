import React, { useState, useEffect } from 'react'

interface CursorGradientProps {
  radius?: number // Radius in pixels for the gradient circle
  dotSize?: number // Diameter in pixels for the central dot
}

const CursorGradient: React.FC<CursorGradientProps> = ({
  radius = 100, // Default radius
  dotSize = 10 // Default dot size
}) => {
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
      className="fixed pointer-events-none rounded-full"
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
      }}>
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10000
        }}
      />
    </div>
  )
}

export default CursorGradient
