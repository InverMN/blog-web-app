import React from 'react'
import { Route } from 'react-router-dom'
import { Home } from './index'
import { SinglePost } from './SinglePost'

export const PageWrapper: React.FC = () => {
  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/post/:postId" component={SinglePost} />
    </div>
  )
}
