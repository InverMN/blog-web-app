import React, { useState, useEffect, useContext } from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Post, PostEditor } from './index'
import Axios from 'axios'
import { UserContext, User } from '../../contexts/index'

export interface PostData {
  id: string
  author: {
    id: string
    username: string
  }
  createdAt: number
  body: string
}

const useStyles = makeStyles({
  root: {
    marginTop: '96px',
  },
})

export const Forum: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([])
  const { user, setUser } = useContext(UserContext)
  const classes = useStyles()

  useEffect(() => {
    Axios.get('http://localhost:5500/api/v1/posts').then((res) => {
      setPosts(res.data as PostData[])
    })
  }, [user])

  return (
    <div>
      <Container className={classes.root} maxWidth="xs">
        <Grid container direction="column" spacing={6}>
          {posts === [] ? (
            <Typography variant="h6">NO POST TO DISPLAY</Typography>
          ) : (
            posts.map((post: PostData) => {
              return (
                <Grid item key={post.id}>
                  <Post post={post} user={user} />
                </Grid>
              )
            })
          )}
        </Grid>
        <PostEditor />
      </Container>
    </div>
  )
}
