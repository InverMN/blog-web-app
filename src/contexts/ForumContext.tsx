import React, { createContext, useContext, useEffect, useReducer } from 'react'
import { UserContext } from './index'
import { useAPI } from '../lib/index'
import { ForumReducer, ForumActionTypes } from '../reducers/index'

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

const initialState: Forum = {
  posts: [],
}

export const ForumContext = createContext<{ forum: Forum; dispatch: React.Dispatch<ForumActionTypes> }>({
  forum: initialState,
  dispatch: () => null,
})

export const ForumContextProvider: React.FC = ({ children }) => {
  const [forum, dispatch] = useReducer(ForumReducer, initialState)
  // const [forum, setForum] = useState<Forum | null>(null)
  const { user } = useContext(UserContext)
  const api = useAPI()

  useEffect(() => {
    api.get('posts').then((res) => {
      dispatch({ type: 'LOAD_POSTS', payload: res.data })
    })
  }, [user])

  return <ForumContext.Provider value={{ forum, dispatch }}>{children}</ForumContext.Provider>
}
