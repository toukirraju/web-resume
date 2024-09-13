"use client"
import { SpeedDial } from '@/components'
import { AppearanceSettings } from '@/lib/theme'
import React from 'react'

const Appearance = () => {
  return (
    <div>
      <SpeedDial />
      <AppearanceSettings />
    </div>
  )
}

export default Appearance
