import { Forum, Post, FeedbackType, Comment } from '../contexts/index'

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

export const CHANGE_REACTION = 'CHANGE_REACTION'

interface ChangeReactionAction {
  type: typeof CHANGE_REACTION
  payload: {
    id: string
    reactionType: FeedbackType
  }
}

export const CREATE_REPLY = 'CREATE_REPLY'

interface CreateReplyAction {
  type: typeof CREATE_REPLY
  payload: {
    reply: Comment
    target: string
  }
}

export const DELETE_REPLY = 'DELETE_REPLY'

interface DeleteReplyAction {
  type: typeof DELETE_REPLY
  payload: {
    id: string
  }
}

export const EDIT_REPLY = 'EDIT_REPLY'

interface EditReplyAction {
  type: typeof EDIT_REPLY
  payload: Pick<Comment, 'id' | 'body'>
}

export const CLEAR_ALL_POSTS = 'CLEAR_ALL_POSTS'

interface ClearAllPostsAction {
  type: typeof CLEAR_ALL_POSTS
}

export const MOVE_REPLY_AT_TOP = 'MOVE_REPLY_AT_TOP'

interface MoveReplyAtTopAction {
  type: typeof MOVE_REPLY_AT_TOP
  payload: Pick<Post, 'id'>
}

export const PUSH_POSTS = 'PUSH_POSTS'

interface PushPostsAction {
  type: typeof PUSH_POSTS
  payload: Post[]
}

export type ForumActionTypes =
  | LoadPostsAction
  | AddPostAction
  | DeletePostAction
  | SetEditedAction
  | EmptyEditedAction
  | EditPostAction
  | ChangeReactionAction
  | CreateReplyAction
  | DeleteReplyAction
  | EditReplyAction
  | ClearAllPostsAction
  | MoveReplyAtTopAction
  | PushPostsAction

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
            return { ...singlePost, body: action.payload.body, editedAt: Date.now() }
          } else return singlePost
        }),
      }
    case CHANGE_REACTION:
      return {
        ...forum,
        posts: forum.posts.map((singlePost) => {
          if (singlePost.id === action.payload.id) {
            const oldFeedback = singlePost.userReaction
            const newFeedback = action.payload.reactionType
            let newFeedbackSum = singlePost.popularity.sum

            if (singlePost.userReaction !== undefined) {
              if (oldFeedback === 'positive') newFeedbackSum--
              else if (oldFeedback === 'negative') newFeedbackSum++

              if (newFeedback === 'positive') newFeedbackSum++
              else if (newFeedback === 'negative') newFeedbackSum--
            }

            return {
              ...singlePost,
              userReaction: action.payload.reactionType,
              popularity: { ...singlePost.popularity, sum: newFeedbackSum },
            }
          } else {
            singlePost.replies = singlePost.replies.map((singleComment) => {
              if (singleComment.id === action.payload.id) {
                const oldFeedback = singleComment.userReaction
                const newFeedback = action.payload.reactionType
                let newFeedbackSum = singleComment.popularity.sum

                if (singleComment.userReaction !== undefined) {
                  if (oldFeedback === 'positive') newFeedbackSum--
                  else if (oldFeedback === 'negative') newFeedbackSum++

                  if (newFeedback === 'positive') newFeedbackSum++
                  else if (newFeedback === 'negative') newFeedbackSum--
                }

                return {
                  ...singleComment,
                  userReaction: action.payload.reactionType,
                  popularity: { ...singleComment.popularity, sum: newFeedbackSum },
                }
              } else {
                singleComment.replies = singleComment.replies.map((singleSubcomment) => {
                  if (singleSubcomment.id === action.payload.id) {
                    const oldFeedback = singleSubcomment.userReaction
                    const newFeedback = action.payload.reactionType
                    let newFeedbackSum = singleSubcomment.popularity.sum

                    if (singleSubcomment.userReaction !== undefined) {
                      if (oldFeedback === 'positive') newFeedbackSum--
                      else if (oldFeedback === 'negative') newFeedbackSum++

                      if (newFeedback === 'positive') newFeedbackSum++
                      else if (newFeedback === 'negative') newFeedbackSum--
                    }

                    return {
                      ...singleSubcomment,
                      userReaction: action.payload.reactionType,
                      popularity: { ...singleSubcomment.popularity, sum: newFeedbackSum },
                    }
                  } else return singleSubcomment
                })

                return singleComment
              }
            })
            return singlePost
          }
        }),
      }
    case CREATE_REPLY:
      return {
        ...forum,
        posts: forum.posts.map((singlePost) => {
          if (singlePost.id === action.payload.target)
            singlePost.replies = [action.payload.reply, ...singlePost.replies]
          else {
            singlePost.replies = singlePost.replies.map((singleComment) => {
              if (singleComment.id === action.payload.target) {
                singleComment.replies.push(action.payload.reply)
                return singleComment
              } else return singleComment
            })
          }
          return singlePost
        }),
      }
    case DELETE_REPLY:
      return {
        ...forum,
        posts: forum.posts.map((singlePost) => {
          let deletedComment = false
          singlePost.replies = singlePost.replies.filter((singleComment) => {
            if (singleComment.id === action.payload.id) {
              deletedComment = true
              return false
            } else {
              return true
            }
          })

          if (deletedComment === false) {
            singlePost.replies.map((singleComment) => {
              singleComment.replies = singleComment.replies.filter((singleSubcomment) => {
                if (singleSubcomment.id === action.payload.id) {
                  deletedComment = true
                  return false
                } else {
                  return true
                }
              })

              return singleComment
            })
          }

          return singlePost
        }),
      }
    case EDIT_REPLY:
      return {
        ...forum,
        posts: forum.posts.map((singlePost) => {
          singlePost.replies = singlePost.replies.map((singleComment) => {
            if (singleComment.id === action.payload.id) singleComment.body = action.payload.body
            else {
              singleComment.replies = singleComment.replies.map((singleSubcomment) => {
                if (singleSubcomment.id === action.payload.id) singleSubcomment.body = action.payload.body
                return singleSubcomment
              })
            }
            return singleComment
          })
          return singlePost
        }),
      }
    case CLEAR_ALL_POSTS:
      return {
        ...forum,
        posts: [],
      }
    case MOVE_REPLY_AT_TOP: {
      return {
        ...forum,
        posts: forum.posts.map((post) => {
          const targetedComment: Comment | undefined = post.replies.find((comment) => {
            return (
              comment.id === action.payload.id ||
              comment.replies.find((subcomment) => subcomment.id === action.payload.id)
            )
          })

          if (targetedComment !== undefined) {
            post.replies = post.replies.filter((comment) => comment.id !== targetedComment.id)
            post.replies = [targetedComment, ...post.replies]
          }

          return post
        }),
      }
    }
    case PUSH_POSTS:
      return {
        ...forum,
        posts: [...forum.posts, ...action.payload],
      }
  }
}
