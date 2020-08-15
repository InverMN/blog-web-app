import React, { useContext } from 'react'
import { Menu, MenuItem } from '@material-ui/core'
import {
  ForumContext,
  UserContext,
  Comment as CommentData,
  Subcomment as SubcommentData,
} from '../../../contexts/index'
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Report as ReportIcon,
  Reply as ReplyIcon,
  Share as ShareIcon,
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { useAPI } from '../../../lib/index'
import { ShareDialog } from '../../dialogs/Share'

interface Props {
  comment: CommentData | SubcommentData
  anchorElement: HTMLElement | null
  handleClose: () => void
  handleOpenEditor: () => void
  handleBodyEditor: () => void
}

const useStyles = makeStyles({
  icon: {
    marginRight: '5px',
  },
})

export const ReplyMenu: React.FC<Props> = ({
  anchorElement,
  handleClose,
  comment,
  handleOpenEditor,
  handleBodyEditor,
}) => {
  const { dispatch } = useContext(ForumContext)
  const { user } = useContext(UserContext)
  const api = useAPI()
  const classes = useStyles()
  const [openShare, setOpenShare] = React.useState(false)

  const handleOpenShare = () => {
    // handleClose()
    setOpenShare(true)
  }

  const handleCloseShare = () => {
    setOpenShare(false)
  }

  const deleteComment = () => {
    handleClose()
    dispatch({ type: 'DELETE_REPLY', payload: { id: comment.id } })
    api.delete(`comments/${comment.id}`)
  }

  const editComment = () => {
    handleClose()
    handleBodyEditor()
  }

  const openEditor = () => {
    handleClose()
    handleOpenEditor()
  }

  const renderOptions = () => {
    if (user !== null && user.id === comment.author.id) {
      return (
        <div>
          <MenuItem onClick={editComment}>
            <EditIcon style={{ color: '#4caf50' }} className={classes.icon} />
            Edit
          </MenuItem>
          <MenuItem onClick={deleteComment}>
            <DeleteIcon color="error" className={classes.icon} />
            Delete
          </MenuItem>
          <MenuItem onClick={openEditor}>
            <ReplyIcon color="primary" className={classes.icon} />
            Reply
          </MenuItem>
          <MenuItem onClick={handleOpenShare}>
            <ShareIcon color="secondary" className={classes.icon} />
            Share
          </MenuItem>
        </div>
      )
    } else if (user !== null && user.id !== comment.author.id) {
      return (
        <div>
          <MenuItem>
            <ReportIcon color="error" className={classes.icon} />
            Report
          </MenuItem>
          <MenuItem onClick={openEditor}>
            <ReplyIcon color="primary" className={classes.icon} />
            Reply
          </MenuItem>
          <MenuItem onClick={handleOpenShare}>
            <ShareIcon color="secondary" className={classes.icon} />
            Share
          </MenuItem>
        </div>
      )
    } else {
      return (
        <MenuItem onClick={handleOpenShare}>
          <ShareIcon color="secondary" className={classes.icon} />
          Share
        </MenuItem>
      )
    }
  }

  return (
    <div>
      <Menu
        id={`post-menu-${comment.id}`}
        anchorEl={anchorElement}
        keepMounted
        open={Boolean(anchorElement)}
        onClose={handleClose}
      >
        {renderOptions()}
      </Menu>
      {openShare && (
        <ShareDialog open={openShare} onClose={handleClose} link={`http://localhost:3000/comment/${comment.id}`} />
      )}
    </div>
  )
}
