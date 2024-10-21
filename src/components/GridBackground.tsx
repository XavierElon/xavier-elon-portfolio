import React, { useState } from 'react'
import Layout from './layout'
import Navbar from './navbar'
import { BackgroundBeams } from './aceternity/BackgroundBeams'
import { TracingBeam } from './aceternity/TracingBeam'
import CursorGradient from './CursorGradient'

export enum TabKey {
  Home = 'Home',
  Work = 'Work',
  Blog = 'Blog',
  Contact = 'Contact'
}

export function GridBackground() {
  const [tab, setTab] = useState<TabKey>(TabKey.Home)

  const tabOffsets: { [key in TabKey]: number } = {
    Home: 0,
    Work: 1,
    Blog: 2,
    Contact: 3
  }

  const baseX = 10
  const baseW = 200

  const x = baseX + tabOffsets[tab] * baseW
  const w = baseW

  return (
    // Remove 'h-full' to allow the container to be as tall as its content
    <div className="relative w-full">
      <div className="relative">
        {/* Background Layers */}
        {/* Base black background with grid */}
        <div className="absolute inset-0 bg-[#090c10] bg-[length:50px_50px] bg-grid-white/[0.2]"></div>

        {/* Color streaks overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>

        {/* Radial gradient for the faded look */}
        <div className="absolute inset-0 bg-[#090c10] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        {/* Beam Animation */}
        <BackgroundBeams />

        {/* Tracing Beam Wrapper */}
        <TracingBeam className="px-6">
          {/* Content Container */}
          <div className="antialiased pt-4 relative">
            {/* Navbar */}
            <Navbar tab={tab} setTab={setTab} left={x} sliderWidth={w} />

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center">
              <Layout tab={tab} setTab={setTab} left={x} sliderWidth={w} />
              <CursorGradient />
            </div>
          </div>
        </TracingBeam>
      </div>
    </div>
  )
}
