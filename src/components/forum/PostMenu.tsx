import React, { useContext } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { User, Post as PostData, ForumContext } from '../../contexts/index'
import { Edit as EditIcon, Delete as DeleteIcon, Report as ReportIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { useAPI } from '../../lib/index'

interface Props {
  post: PostData
  user: User | null
  anchorElement: HTMLElement | null
  handleClose: () => void
}

const useStyles = makeStyles({
  icon: {
    marginRight: '5px',
  },
})

export const PostMenu: React.FC<Props> = ({ anchorElement, handleClose, post, user }) => {
  const { dispatch } = useContext(ForumContext)
  const api = useAPI()
  const classes = useStyles()

  const deletePost = () => {
    handleClose()
    dispatch({ type: 'DELETE_POST', payload: { id: post.id } })
    api.delete(`posts/${post.id}`)
  }

  const editPost = () => {
    handleClose()
    dispatch({ type: 'SET_EDITED', payload: { ...post } })
  }

  const reportPost = () => {
    handleClose()
    api.post(`report/post/${post.id}`)
  }

  return (
    <Menu
      id={`post-menu-${post.id}`}
      anchorEl={anchorElement}
      keepMounted
      open={Boolean(anchorElement)}
      onClose={handleClose}
    >
      {user !== null && (user.id === post.author.id || user.isModerator) ? (
        <div>
          <MenuItem onClick={editPost}>
            <EditIcon style={{ color: '#4caf50' }} className={classes.icon} />
            Edit
          </MenuItem>
          <MenuItem onClick={deletePost}>
            <DeleteIcon color="error" className={classes.icon} />
            Delete
          </MenuItem>
        </div>
      ) : (
        <MenuItem onClick={reportPost}>
          <ReportIcon color="error" className={classes.icon} />
          Report
        </MenuItem>
      )}
    </Menu>
  )
}
