import React, { useContext } from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Post, PostEditor } from './index'
import { UserContext, Post as PostData, ForumContext } from '../../contexts/index'

const useStyles = makeStyles({
  root: {
    marginTop: '96px',
  },
})

export const Forum: React.FC = () => {
  const { forum } = useContext(ForumContext)
  const { user } = useContext(UserContext)
  const classes = useStyles()

  // useEffect(() => {
  //   Axios.get('http://localhost:5500/api/v1/posts').then((res) => {
  //     setPosts(res.data as PostData[])
  //   })
  // }, [user])

  const renderPosts = () => {
    return forum === null ? (
      <Typography variant="h6">NO POST TO DISPLAY</Typography>
    ) : (
      forum.posts.map((post: PostData) => {
        return (
          <Grid item key={post.id}>
            <Post post={post} user={user} />
          </Grid>
        )
      })
    )
  }

  return (
    <div>
      <Container className={classes.root} maxWidth="xs">
        <Grid container direction="column" spacing={6}>
          {renderPosts()}
        </Grid>
        <PostEditor />
      </Container>
    </div>
  )
}
