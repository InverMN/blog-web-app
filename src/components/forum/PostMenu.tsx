import React from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { PostData } from './index'
import { User } from '../../contexts/index'

interface Props {
  post: PostData
  user: User | null
  anchorElement: HTMLElement | null
  handleClose: () => void
}

export const PostMenu: React.FC<Props> = ({ anchorElement, handleClose, post, user }) => {
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
          <MenuItem>Delete</MenuItem>
        </div>
      ) : (
        <MenuItem>Report</MenuItem>
      )}
    </Menu>
  )
}
