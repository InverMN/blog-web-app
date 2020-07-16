import React, { createContext, useState, useContext, useEffect } from 'react'
import { UserContext } from './index'
import { useAPI } from '../lib/index'

export interface Forum {
  posts: Post[]
}

export interface Post {
  id: string
  author: {
    id: string
    username: string
  }
  createdAt: number
  body: string
}

export const ForumContext = createContext<{ forum: Forum | null }>({ forum: null })

export const ForumContextProvider: React.FC = ({ children }) => {
  const [forum, setForum] = useState<Forum | null>(null)
  const { user } = useContext(UserContext)
  const api = useAPI()

  useEffect(() => {
    api.get('posts').then((res) => {
      setForum({ posts: res.data })
    })
  }, [user])

  return <ForumContext.Provider value={{ forum }}>{children}</ForumContext.Provider>
}
