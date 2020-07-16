import React from 'react'
import { Forum } from './forum/index'
import { AppNav } from './appbar/index'
import { ForumContextProvider } from '../contexts/index'

export const Layout: React.FC = () => {
  return (
    <div>
      <AppNav />
      <ForumContextProvider>
        <Forum />
      </ForumContextProvider>
    </div>
  )
}
