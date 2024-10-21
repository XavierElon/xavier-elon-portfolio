'use client'
import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../../lib/utils'

export const BackgroundBeams = React.memo(({ className }: { className?: string }) => {
  // Grid parameters
  const gridSize = 50
  const svgWidth = 800
  const svgHeight = 600

  // Generate grid-aligned paths
  const paths: any[] = []

  // Horizontal lines
  for (let y = 0; y <= svgHeight; y += gridSize) {
    paths.push(`M0 ${y} L${svgWidth} ${y}`)
  }

  // Vertical lines
  for (let x = 0; x <= svgWidth; x += gridSize) {
    paths.push(`M${x} 0 L${x} ${svgHeight}`)
  }

  // State to hold the beams
  const [beams, setBeams] = useState<Beam[]>([])

  interface Beam {
    id: number
    pathData: string
    gradientId: string
    duration: number
    pathLength: number
    beamLength: number
  }

  // Use useRef to keep beamId persistent across renders
  const beamIdRef = useRef(0)

  useEffect(() => {
    const maxBeams = 5 // Maximum number of beams at a time

    const interval = setInterval(() => {
      setBeams((prevBeams) => {
        if (prevBeams.length >= maxBeams) {
          return prevBeams
        }

        const duration = Math.random() * 5 + 5 // Duration between 5 and 10 seconds
        const newBeamId = beamIdRef.current++
        const pathData = paths[Math.floor(Math.random() * paths.length)]

        // Create a temporary path to calculate its length
        const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        tempPath.setAttribute('d', pathData)
        document.body.appendChild(tempPath) // Append temporarily to the DOM
        const totalPathLength = tempPath.getTotalLength()
        document.body.removeChild(tempPath) // Remove it from the DOM

        const beamLength = 50 // Beam length in pixels

        const newBeam: Beam = {
          id: newBeamId,
          pathData,
          gradientId: `linearGradient-${newBeamId}`,
          duration,
          pathLength: totalPathLength,
          beamLength
        }

        // Schedule the removal of the beam after its duration
        setTimeout(() => {
          setBeams((currentBeams) => currentBeams.filter((b) => b.id !== newBeamId))
        }, duration * 1000)

        return [...prevBeams, newBeam]
      })
    }, 1000) // Add a new beam every second (adjust as needed)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={cn('absolute h-full w-full inset-0 [mask-size:40px] [mask-repeat:no-repeat] flex items-center justify-center', className)}>
      <svg className="z-0 h-full w-full pointer-events-none absolute" width="100%" height="100%" viewBox={`0 0 ${svgWidth} ${svgHeight}`} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          {/* Define gradients */}
          {beams.map((beam) => (
            <linearGradient key={beam.gradientId} id={beam.gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#18CCFC" stopOpacity="0" />
              <stop offset="10%" stopColor="#18CCFC" stopOpacity="1" />
              <stop offset="50%" stopColor="#6344F5" stopOpacity="1" />
              <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
            </linearGradient>
          ))}
        </defs>

        <AnimatePresence>
          {beams.map((beam) => (
            <motion.path
              key={beam.id}
              d={beam.pathData}
              stroke={`url(#${beam.gradientId})`}
              strokeWidth="2"
              strokeOpacity="0.6"
              fill="none"
              strokeDasharray={`${beam.beamLength} ${beam.pathLength - beam.beamLength}`}
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -beam.pathLength }}
              transition={{
                duration: beam.duration,
                ease: 'linear'
              }}
            />
          ))}
        </AnimatePresence>
      </svg>
    </div>
  )
})

BackgroundBeams.displayName = 'BackgroundBeams'
