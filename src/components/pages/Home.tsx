import React from 'react'
import { Forum } from '../forum/index'
import { ForumContext } from '../../contexts/index'
import { useAPI } from '../../lib/API'

export const Home: React.FC = () => {
  const api = useAPI()
  const { dispatch } = React.useContext(ForumContext)

  React.useEffect(() => {
    api.get('posts').then((res) => {
      dispatch({ type: 'LOAD_POSTS', payload: res.data })
    })
  }, [])

  return <Forum />
}
