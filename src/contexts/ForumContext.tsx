import React, { createContext, useState } from 'react'

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
  const [forum, setForum] = useState(null)

  return <ForumContext.Provider value={{ forum }}>{children}</ForumContext.Provider>
}
