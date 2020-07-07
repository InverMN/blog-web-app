import React, { Component } from 'react'
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

export class Hangout extends Component {
  state: {
    posts: PostData[]
  } = {
    posts: [],
  }

  componentDidMount(): void {
    console.log('test')
    Axios.get('http://localhost:5500/api/v1/posts').then((res) => {
      console.log(res.data)
      this.setState({ posts: res.data })
    })
  }

  render(): JSX.Element {
    return (
      <div>
        <Container maxWidth="xs">
          <Grid container direction="column" spacing={6}>
            {this.state.posts === [] ? (
              <Typography variant="h6">NO POST TO DISPLAY</Typography>
            ) : (
              this.state.posts.map((post) => {
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
}
