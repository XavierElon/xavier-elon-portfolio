import React, { useState } from 'react'
import Layout from './layout'
import Navbar from './navbar'
import BeamAnimation from './BeamAnimation'
import { BackgroundBeams } from './aceternity/BackgroundBeams'
import { Vortex } from './aceternity/Vortex'

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

  const baseX = 520
  const baseW = 221.5

  const x = baseX + tabOffsets[tab] * baseW
  const w = baseW
  return (
    <div className="relative h-full w-full">
      {/* Base black background with grid */}
      <div className="absolute inset-0 bg-[#090c10] bg-[length:50px_50px] bg-grid-white/[0.2]"></div>

      {/* Color streaks overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-teal-900/20"></div>

      {/* Radial gradient for the faded look */}
      <div className="absolute inset-0 bg-[#090c10] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Beam Animation */}
      <BackgroundBeams />

      {/* Navbar */}
      <Navbar tab={tab} setTab={setTab} left={x} sliderWidth={w} />

      {/* Content */}
      {/* <Vortex backgroundColor="black" rangeY={800} particleCount={500} baseHue={120} className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"> */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <Layout tab={tab} setTab={setTab} left={x} sliderWidth={w} />
      </div>
      {/* </Vortex> */}
    </div>
  )
}
