import React, { useContext } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import { ForumContext, UserContext, Comment as CommentData } from '../../contexts/index'
import { Edit as EditIcon, Delete as DeleteIcon, Report as ReportIcon } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { useAPI } from '../../lib/index'

interface Props {
  comment: CommentData
  anchorElement: HTMLElement | null
  handleClose: () => void
}

const useStyles = makeStyles({
  icon: {
    marginRight: '5px',
  },
})

export const CommentMenu: React.FC<Props> = ({ anchorElement, handleClose, comment }) => {
  const { dispatch } = useContext(ForumContext)
  const { user } = useContext(UserContext)
  const api = useAPI()
  const classes = useStyles()

  const deleteComment = () => {
    handleClose()
    dispatch({ type: 'DELETE_REPLY', payload: { id: comment.id } })
    api.delete(`comments/${comment.id}`)
  }

  const editComment = () => {
    handleClose()
    dispatch({ type: 'SET_EDITED', payload: { ...comment } })
  }

  return (
    <Menu
      id={`post-menu-${comment.id}`}
      anchorEl={anchorElement}
      keepMounted
      open={Boolean(anchorElement)}
      onClose={handleClose}
    >
      {user !== null && user.id === comment.author.id ? (
        <div>
          <MenuItem onClick={editComment}>
            <EditIcon style={{ color: '#4caf50' }} className={classes.icon} />
            Edit
          </MenuItem>
          <MenuItem onClick={deleteComment}>
            <DeleteIcon color="error" className={classes.icon} />
            Delete
          </MenuItem>
        </div>
      ) : (
        <MenuItem>
          <ReportIcon color="error" className={classes.icon} />
          Report
        </MenuItem>
      )}
    </Menu>
  )
}
