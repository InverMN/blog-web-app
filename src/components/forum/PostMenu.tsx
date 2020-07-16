import React, { useContext } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { User, Post as PostData, ForumContext } from '../../contexts/index'
import { useAPI } from '../../lib/index'

interface Props {
  post: PostData
  user: User | null
  anchorElement: HTMLElement | null
  handleClose: () => void
}

export const PostMenu: React.FC<Props> = ({ anchorElement, handleClose, post, user }) => {
  const { dispatch } = useContext(ForumContext)
  const api = useAPI()

  const deletePost = () => {
    handleClose()
    dispatch({ type: 'DELETE_POST', payload: { id: post.id } })
    api.delete(`posts/${post.id}`)
  }

  return (
    <Menu
      id={`post-menu-${post.id}`}
      anchorEl={anchorElement}
      keepMounted
      open={Boolean(anchorElement)}
      onClose={handleClose}
    >
      {user !== null && user.id === post.author.id ? (
        <div>
          <MenuItem>Edit</MenuItem>
          <MenuItem onClick={deletePost}>Delete</MenuItem>
        </div>
      ) : (
        <MenuItem>Report</MenuItem>
      )}
    </Menu>
  )
}
