import React from 'react'
import { Forum } from '../forum/index'
import { ForumContext } from '../../contexts/index'
import { useAPI } from '../../lib/API'
import { UserContext } from '../../contexts/UserContext'
import TrackVisibility from 'react-on-screen'
import { Grid, Container } from '@material-ui/core'
import { PostSkeleton } from '../forum/index'

export const Home: React.FC = () => {
  const api = useAPI()
  const { dispatch } = React.useContext(ForumContext)
  const { user } = React.useContext(UserContext)
  const [loadedPages, setLoadedPages] = React.useState(0)
  const [noMorePosts, setNoMorePosts] = React.useState(false)

  React.useEffect(() => {
    dispatch({ type: 'CLEAR_ALL_POSTS' })
    window.scrollTo(0, 0)
  }, [])

  React.useEffect(() => {
    api.get('posts').then((res) => {
      setLoadedPages(1)
      dispatch({ type: 'LOAD_POSTS', payload: res.data })
    })
  }, [user])

  const [loadingNewPage, setLoadingNewPage] = React.useState(false)

  const LoadPostsTrigger: React.FC<{ isVisible?: boolean }> = ({ isVisible }) => {
    React.useEffect(() => {
      if (isVisible === true) setLoadingNewPage(true)
    }, [isVisible])

    return <div style={{ height: 100 }} />
  }

  React.useEffect(() => {
    if (loadingNewPage === true) {
      api.get(`posts/?page=${loadedPages}`).then((res) => {
        console.log('posts:', res.data)
        if (res.data instanceof Array && res.data.length === 0) {
          setNoMorePosts(true)
        } else {
          setLoadedPages(loadedPages + 1)
          dispatch({ type: 'PUSH_POSTS', payload: res.data })
          setLoadingNewPage(false)
        }
      })
    }
  }, [loadingNewPage])

  const renderPostSkeletons = () => (
    <Container maxWidth="xs">
      <Grid container direction="column" spacing={6}>
        <div style={{ height: 24 }} />
        {Array.from(Array(3), () => (
          <Grid item key={Math.random().toString()}>
            <PostSkeleton />
          </Grid>
        ))}
      </Grid>
    </Container>
  )

  return (
    <>
      <Forum />
      <TrackVisibility>
        {!loadingNewPage ? <LoadPostsTrigger /> : noMorePosts ? <div /> : renderPostSkeletons()}
      </TrackVisibility>
      {noMorePosts && <div>Theres no more posts</div>}
    </>
  )
}
