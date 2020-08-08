import React from 'react'
import { Forum } from '../forum/index'
import { ForumContext } from '../../contexts/index'
import { useAPI } from '../../lib/API'
import { UserContext } from '../../contexts/UserContext'

export const Home: React.FC = () => {
  const api = useAPI()
  const { dispatch } = React.useContext(ForumContext)
  const { user } = React.useContext(UserContext)

  React.useEffect(() => {
    dispatch({ type: 'CLEAR_ALL_POSTS' })
    api.get('posts').then((res) => {
      dispatch({ type: 'LOAD_POSTS', payload: res.data })
    })
  }, [user])

  return <Forum />
}
