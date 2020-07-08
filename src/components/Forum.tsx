import React, { useState, useEffect } from 'react'
import { Container, Grid, Typography } from '@material-ui/core'
import { Post } from './index'
import Axios from 'axios'

interface PostData {
  id: string
  author: {
    id: string
    username: string
  }
  createdAt: number
  body: string
}

export const Forum: React.FC = () => {
  const [posts, setPosts] = useState<PostData[]>([])

  useEffect(() => {
    Axios.get('http://localhost:5500/api/v1/posts').then((res) => {
      setPosts(res.data as PostData[])
    })
  })

  return (
    <div>
      <Container maxWidth="xs">
        <Grid container direction="column" spacing={6}>
          {posts === [] ? (
            <Typography variant="h6">NO POST TO DISPLAY</Typography>
          ) : (
            posts.map((post: PostData) => {
              return (
                <Grid item key={post.id}>
                  <Post {...post} />
                </Grid>
              )
            })
          )}
        </Grid>
      </Container>
    </div>
  )
}
