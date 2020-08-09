import React, { useContext } from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Post, PostEditor, PostSkeleton } from './index'
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

  const renderPosts = () => {
    return forum.posts.length === 0
      ? Array.from(Array(3), () => (
          <Grid item>
            <PostSkeleton />
          </Grid>
        ))
      : forum.posts.map((post: PostData) => {
          return (
            <Grid item key={post.id}>
              <Post post={post} user={user} />
            </Grid>
          )
        })
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
