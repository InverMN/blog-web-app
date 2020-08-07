import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import { Home } from './index'

export const PageWrapper: React.FC = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
    </BrowserRouter>
  )
}
