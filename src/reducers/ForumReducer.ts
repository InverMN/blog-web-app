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

export type ForumActionTypes = LoadPostsAction | AddPostAction

export const ForumReducer = (forum: Forum, action: ForumActionTypes): Forum => {
  switch (action.type) {
    case LOAD_POSTS:
      return { posts: action.payload }
    case ADD_POST:
      return { posts: [...forum.posts, action.payload] }
  }
}
