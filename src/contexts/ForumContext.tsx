import React from 'react'
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

export const ForumContext = React.createContext<{ forum: Forum; dispatch: React.Dispatch<ForumActionTypes> }>(
  undefined!,
)

export const ForumContextProvider: React.FC = ({ children }) => {
  const [forum, dispatch] = React.useReducer(ForumReducer, initialState)
  return <ForumContext.Provider value={{ forum, dispatch }}>{children}</ForumContext.Provider>
}
