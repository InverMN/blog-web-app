import React from 'react'
import { Forum, AppNav } from './index'

export const Layout: React.FC = () => {
  return (
    <div>
      <AppNav />
      <Forum />
    </div>
  )
}
