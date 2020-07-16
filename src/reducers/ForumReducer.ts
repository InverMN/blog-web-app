import { Forum } from '../contexts/index'
import { Post } from '../contexts/index'

export const LOAD_POSTS = 'LOAD_POSTS'

interface LoadPostsAction {
  type: typeof LOAD_POSTS
  payload: Post[]
}

export const ADD_POST = 'ADD_POST'

interface AddPostAction {
  type: typeof ADD_POST
  payload: Post
}

export const DELETE_POST = 'DELETE_POST'

interface DeletePostAction {
  type: typeof DELETE_POST
  payload: Pick<Post, 'id'>
}

export type ForumActionTypes = LoadPostsAction | AddPostAction | DeletePostAction

export const ForumReducer = (forum: Forum, action: ForumActionTypes): Forum => {
  switch (action.type) {
    case LOAD_POSTS:
      return { posts: action.payload }
    case ADD_POST:
      return { posts: [action.payload, ...forum.posts] }
    case DELETE_POST:
      return { posts: forum.posts.filter((singlePost) => singlePost.id !== action.payload.id) }
  }
}
