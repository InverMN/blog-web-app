import React from 'react'
import { Route } from 'react-router-dom'
import { Home } from './index'

export const PageWrapper: React.FC = () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
    </div>
  )
}
