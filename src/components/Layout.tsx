import React from 'react'
import { Forum } from './index'
import { AppNav } from './appbar/index'

export const Layout: React.FC = () => {
  return (
    <div>
      <AppNav />
      <Forum />
    </div>
  )
}
