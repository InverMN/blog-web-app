import React, { useState } from 'react'
import { Grid, Avatar, Paper, Box, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Comment as CommentData } from '../../contexts/index'
import { Send as SendIcon, Delete as DeleteIcon } from '@material-ui/icons'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useAPI } from '../../lib/index'

const useStyles = makeStyles({
  mediumAvatar: {
    width: '30px',
    height: '30px',
  },
})

const editorConfig = {
  toolbar: ['bold', 'italic', '|', 'link', 'imageUpload', 'mediaEmbed', 'blockQuote'],
}

type Props = Pick<CommentData, 'author'> & { target: string; handleClose: () => void }

export const CommentEditor: React.FC<Props> = ({ target, author, handleClose }) => {
  const classes = useStyles()
  const [body, setBody] = useState('')
  const api = useAPI()

  const publishReply = () => {
    api.post(`comments/${target}`, { body }).then((res) => {
      handleClose()
    })
  }

  return (
    <div>
      <Paper variant="outlined">
        <Box m={1}>
          <Grid container spacing={1}>
            <Grid container item spacing={1} direction="row" style={{ flexWrap: 'nowrap' }}>
              <Grid item>
                <Avatar
                  alt={author.username}
                  src={`http://localhost:5500/static/avatars/${author.id}.png`}
                  className={classes.mediumAvatar}
                  style={{ marginTop: '8px' }}
                >
                  {author.username}
                </Avatar>
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
            </Grid>
            <Grid container item justify="space-evenly">
              <Grid item>
                <Button size="small" onClick={handleClose} style={{ color: 'red' }} startIcon={<DeleteIcon />}>
                  discard
                </Button>
              </Grid>
              <Grid item>
                <Button size="small" onClick={publishReply} color="primary" startIcon={<SendIcon />}>
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
