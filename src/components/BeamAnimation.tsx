import React, { useEffect, useRef } from 'react'

const BeamAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let animationFrameId: number

    const gridSize = 50 // Match your grid size
    const beamWidth = 4 // Adjust beam width
    const beamColor = 'rgba(255, 255, 255, 0.8)' // Beam color
    const beams: Beam[] = []

    interface Beam {
      path: Point[]
      progress: number
      speed: number
    }

    interface Point {
      x: number
      y: number
    }

    // Set canvas size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Function to draw beams
    const drawBeams = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      beams.forEach((beam) => {
        const { path, progress } = beam
        const currentIndex = Math.floor(progress * (path.length - 1))
        const currentPath = path.slice(0, currentIndex + 1)

        ctx.strokeStyle = beamColor
        ctx.lineWidth = beamWidth
        ctx.lineCap = 'round'

        ctx.beginPath()
        ctx.moveTo(currentPath[0].x, currentPath[0].y)
        for (let i = 1; i < currentPath.length; i++) {
          ctx.lineTo(currentPath[i].x, currentPath[i].y)
        }
        ctx.stroke()
      })
    }

    // Function to update beams
    const updateBeams = () => {
      beams.forEach((beam) => {
        beam.progress += beam.speed
        if (beam.progress > 1) {
          beam.progress = 1
        }
      })

      // Remove completed beams
      for (let i = beams.length - 1; i >= 0; i--) {
        if (beams[i].progress >= 1) {
          beams.splice(i, 1)
        }
      }
    }

    // Function to generate a random path along grid lines
    const generateRandomPath = (): Point[] => {
      const path: Point[] = []
      let x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize
      let y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize

      path.push({ x, y })

      const steps = Math.floor(Math.random() * 10) + 5 // Random steps between 5 and 15

      for (let i = 0; i < steps; i++) {
        const direction = Math.floor(Math.random() * 4)

        switch (direction) {
          case 0: // Up
            y -= gridSize
            break
          case 1: // Right
            x += gridSize
            break
          case 2: // Down
            y += gridSize
            break
          case 3: // Left
            x -= gridSize
            break
        }

        // Keep within bounds
        x = Math.max(0, Math.min(x, canvas.width))
        y = Math.max(0, Math.min(y, canvas.height))

        path.push({ x, y })
      }

      return path
    }

    // Function to add a new beam
    const addBeam = () => {
      beams.push({
        path: generateRandomPath(),
        progress: 0,
        speed: Math.random() * 0.01 + 0.005 // Random speed
      })
    }

    // Animation loop
    const animate = () => {
      if (Math.random() < 0.02) {
        // 2% chance to add a new beam each frame
        addBeam()
      }

      updateBeams()
      drawBeams()
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
        zIndex: 5 // Ensure it's above the background but below other content
      }}
    />
  )
}

export default BeamAnimation
