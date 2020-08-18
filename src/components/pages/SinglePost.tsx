import React from 'react'
import { Forum } from '../forum/index'
import { ForumContext } from '../../contexts/index'
import { useAPI } from '../../lib/index'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'

interface RouteProps {
  postId?: string
  replyId?: string
}

interface Props {
  match: RouteComponentProps<RouteProps>
}

export const SinglePost: React.FC<Props> = ({ match }) => {
  const { dispatch } = React.useContext(ForumContext)
  const { user } = React.useContext(UserContext)
  const api = useAPI()

  React.useEffect(() => {
    dispatch({ type: 'CLEAR_ALL_POSTS' })
  }, [])

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

  const [isInitialRender, setIsInitialRender] = React.useState(true)
  const history = useHistory()

  history.listen(() => {
    setIsInitialRender(true)
  })

  const scrollToTargetReply = () => {
    if (isInitialRender) {
      setTimeout(() => {
        //@ts-ignore
        const replyId = match.params.replyId
        if (replyId !== undefined) {
          const targetReplyElement = document.querySelector(`#reply-${replyId}`)
          targetReplyElement?.scrollIntoView({ behavior: 'smooth' })
        }
      }, 1250)
      setIsInitialRender(false)
    }
  }

  return (
    <div>
      <Forum skeletonsCount={1} />
      {scrollToTargetReply()}
    </div>
  )
}
