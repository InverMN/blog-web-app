import React, { useState, useContext } from 'react'
import { Grid, Avatar, Paper, Box, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Comment as CommentData } from '../../contexts/index'
import { Send as SendIcon, Delete as DeleteIcon } from '@material-ui/icons'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useAPI } from '../../lib/index'
import { UserContext, ForumContext } from '../../contexts/index'

const useStyles = makeStyles({
  mediumAvatar: {
    width: '30px',
    height: '30px',
  },
})

const editorConfig = {
  toolbar: ['bold', 'italic', '|', 'link', 'imageUpload', 'mediaEmbed', 'blockQuote'],
}

type Props = { target: string; handleClose: () => void }

export const CommentEditor: React.FC<Props> = ({ target, handleClose }) => {
  const classes = useStyles()
  const [body, setBody] = useState('')
  const api = useAPI()
  const { user } = useContext(UserContext)
  const { dispatch } = useContext(ForumContext)

  const publishReply = () => {
    api.post(`comments/${target}`, { body }).then((res) => {
      dispatch({ type: 'CREATE_REPLY', payload: { reply: res.data, target } })
      handleClose()
    })
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
                  src={`http://localhost:5500/static/avatars/${user!.id}.png`}
                  className={classes.mediumAvatar}
                >
                  {user!.username}
                </Avatar>
              </Grid>
              <Grid item>
                <Typography>Write a comment...</Typography>
              </Grid>
            </Grid>
            <Grid item style={{ flexGrow: 1 }}>
              <CKEditor
                editor={ClassicEditor}
                data={body}
                config={editorConfig}
                onChange={(event: undefined, editor: { getData: () => string }) => {
                  setBody(editor.getData())
                }}
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
                  onClick={publishReply}
                  color="primary"
                  startIcon={<SendIcon />}
                >
                  publish
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </div>
  )
}
