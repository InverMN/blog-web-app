import React from 'react'
import { AppNav } from './appbar/index'
import { ForumContextProvider } from '../contexts/index'
import { PageWrapper } from './pages/PageWrapper'
import { BrowserRouter } from 'react-router-dom'

export const Layout: React.FC = () => {
  return (
    <BrowserRouter>
      <AppNav />
      <ForumContextProvider>
        <PageWrapper />
      </ForumContextProvider>
    </BrowserRouter>
  )
}
