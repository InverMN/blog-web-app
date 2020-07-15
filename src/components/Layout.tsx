import React from 'react'
import { Forum } from './forum/index'
import { AppNav } from './appbar/index'

export const Layout: React.FC = () => {
  return (
    <div>
      <AppNav />
      <Forum />
    </div>
  )
}
