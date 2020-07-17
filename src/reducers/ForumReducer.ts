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

export const SET_EDITED = 'SET_EDITED'

interface SetEditedAction {
  type: typeof SET_EDITED
  payload: Pick<Post, 'id' | 'body'>
}

export const EMPTY_EDITED = 'EMPTY_EDITED'

interface EmptyEditedAction {
  type: typeof EMPTY_EDITED
}

export const EDIT_POST = 'EDIT_POST'

interface EditPostAction {
  type: typeof EDIT_POST
  payload: Pick<Post, 'id' | 'body'>
}

export type ForumActionTypes =
  | LoadPostsAction
  | AddPostAction
  | DeletePostAction
  | SetEditedAction
  | EmptyEditedAction
  | EditPostAction

export const ForumReducer = (forum: Forum, action: ForumActionTypes): Forum => {
  switch (action.type) {
    case LOAD_POSTS:
      return { ...forum, posts: action.payload }
    case ADD_POST:
      return { ...forum, posts: [action.payload, ...forum.posts] }
    case DELETE_POST:
      return { ...forum, posts: forum.posts.filter((singlePost) => singlePost.id !== action.payload.id) }
    case SET_EDITED:
      return { ...forum, edited: { editedPostId: action.payload.id, body: action.payload.body } }
    case EMPTY_EDITED:
      return { ...forum, edited: undefined }
    case EDIT_POST:
      return {
        ...forum,
        posts: forum.posts.map((singlePost) => {
          if (singlePost.id === action.payload.id) {
            return { ...singlePost, body: action.payload.body }
          } else return singlePost
        }),
      }
  }
}
