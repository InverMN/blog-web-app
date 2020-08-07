import React from 'react'
import { AppNav } from './appbar/index'
import { ForumContextProvider } from '../contexts/index'
import { PageWrapper } from './pages/PageWrapper'

export const Layout: React.FC = () => {
  return (
    <div>
      <AppNav />
      <ForumContextProvider>
        <PageWrapper />
      </ForumContextProvider>
    </div>
  )
}
