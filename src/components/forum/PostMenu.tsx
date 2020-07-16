import React from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { User, Post as PostData } from '../../contexts/index'

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
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
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
