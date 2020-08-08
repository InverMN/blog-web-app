import React from 'react'
import { Forum } from '../forum/index'
import { ForumContext } from '../../contexts/index'
import { useAPI } from '../../lib/index'
import { RouteComponentProps } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'

interface RouteProps {
  postId?: string
  commentId?: string
}

interface Props {
  match: RouteComponentProps<RouteProps>
}

export const SinglePost: React.FC<Props> = ({ match }) => {
  const { dispatch } = React.useContext(ForumContext)
  const { user } = React.useContext(UserContext)
  const api = useAPI()

  React.useEffect(() => {
    api
      // @ts-ignore
      .get(`posts/${match.params.postId}`)
      .then((res) => {
        dispatch({ type: 'LOAD_POSTS', payload: [res.data] })
      })
      .catch((error) => {
        console.log(error.response)
      })
  }, [user])

  return <Forum />
}
