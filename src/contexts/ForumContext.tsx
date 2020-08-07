import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { UserContext } from './index'
import { useAPI } from '../lib/index'
import { ForumReducer, ForumActionTypes } from '../reducers/index'

export interface Forum {
  posts: Post[]
  edited?: EditedPost
}

export interface Popularity {
  sum: number
  feedback: string
}

export type FeedbackType = 'positive' | 'neutral' | 'negative'

export interface Post {
  id: string
  author: {
    id: string
    username: string
  }
  createdAt: number
  editedAt?: number
  body: string
  popularity: Popularity
  userReaction?: FeedbackType
  replies: Comment[]
}

export type Comment = Post & { replies: Subcomment[] }
export type Subcomment = Omit<Post, 'replies'>

export interface EditedPost {
  body: string
  editedPostId: string
}

const initialState: Forum = {
  posts: [],
  edited: undefined,
}

export const ForumContext = createContext<{ forum: Forum; dispatch: React.Dispatch<ForumActionTypes> }>({
  forum: initialState,
  dispatch: () => null,
})

export const ForumContextProvider: React.FC = ({ children }) => {
  const [forum, dispatch] = useReducer(ForumReducer, initialState)
  const { user } = useContext(UserContext)
  const api = useAPI()

  return <ForumContext.Provider value={{ forum, dispatch }}>{children}</ForumContext.Provider>
}
