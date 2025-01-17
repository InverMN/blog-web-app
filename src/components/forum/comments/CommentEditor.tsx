import React, { useState, useContext } from 'react'
import { Grid, Avatar, Paper, Box, Button, Typography, Backdrop, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Send as SendIcon, Delete as DeleteIcon } from '@material-ui/icons'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useAPI } from '../../../lib/index'
import { UserContext, ForumContext } from '../../../contexts/index'

const useStyles = makeStyles({
  mediumAvatar: {
    width: '30px',
    height: '30px',
  },
})

const editorConfig = {
  toolbar: ['bold', 'italic', '|', 'link', 'imageUpload', 'mediaEmbed', 'blockQuote'],
}

interface Props {
  target: string
  handleClose: () => void
  editingExistingComment?: boolean
  existingCommentBody?: string
}

export const CommentEditor: React.FC<Props> = ({
  target,
  handleClose,
  editingExistingComment,
  existingCommentBody,
}) => {
  const classes = useStyles()
  const [body, setBody] = useState('')
  const api = useAPI()
  const { user } = useContext(UserContext)
  const { dispatch } = useContext(ForumContext)
  const [openBackdrop, setOpenBackdrop] = useState(false)

  const publishReply = () => {
    setOpenBackdrop(true)
    api
      .post(`comments/${target}`, { body })
      .then((res) => {
        dispatch({ type: 'CREATE_REPLY', payload: { reply: res.data, target } })
        handleClose()
      })
      .finally(() => {
        setOpenBackdrop(false)
      })
  }

  const editReply = () => {
    api.patch(`comments/${target}`, { body: body })
    dispatch({ type: 'EDIT_REPLY', payload: { id: target, body } })
    handleClose()
  }

  return (
    <div>
      <Paper variant="outlined">
        <Box m={1}>
          <Grid container spacing={1}>
            <Grid item container spacing={2} alignItems="center">
              <Grid item>
                <Avatar
                  alt={user!.username}
                  src={`${window.serverURL}/static/avatars/${user!.id}.png`}
                  className={classes.mediumAvatar}
                >
                  {user!.username}
                </Avatar>
              </Grid>
              <Grid item>
                <Typography>{editingExistingComment ? 'Edit' : 'Write'} a comment...</Typography>
              </Grid>
            </Grid>
            <Grid item style={{ flexGrow: 1 }}>
              <CKEditor
                editor={ClassicEditor}
                data={existingCommentBody !== undefined ? existingCommentBody : body}
                config={editorConfig}
                onChange={(event: undefined, editor: { getData: () => string }) => {
                  setBody(editor.getData())
                }}
                style={{ zIndex: 1000000000000 }}
              />
            </Grid>
            <Grid container item justify="space-evenly">
              <Grid item>
                <Button size="small" onClick={handleClose} style={{ color: 'red' }} startIcon={<DeleteIcon />}>
                  discard
                </Button>
              </Grid>
              <Grid item>
                <Button
                  disabled={body === ''}
                  size="small"
                  onClick={editingExistingComment ? editReply : publishReply}
                  color="primary"
                  startIcon={<SendIcon />}
                >
                  {editingExistingComment ? 'edit' : 'publish'}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Backdrop style={{ zIndex: 1000000 }} open={openBackdrop}>
        <CircularProgress color="primary" />
      </Backdrop>
    </div>
  )
}
