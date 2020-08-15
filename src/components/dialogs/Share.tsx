import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Snackbar,
} from '@material-ui/core'
import { FileCopy as CopyIcon } from '@material-ui/icons'
import { Alert } from '@material-ui/lab'

interface Props {
  open: boolean
  onClose: () => void
  link: string
}

export const ShareDialog: React.FC<Props> = ({ open, onClose: handleClose, link }) => {
  const [openCopiedAlert, setOpenCopiedAlert] = React.useState(false)

  const handleOpenCopiedAlert = () => {
    setOpenCopiedAlert(true)
  }

  const handleCloseCopiedAlert = () => {
    setOpenCopiedAlert(false)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link)
    handleOpenCopiedAlert()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share link with your friends</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            value={link}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={copyToClipboard}>
                    <CopyIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Snackbar open={openCopiedAlert} autoHideDuration={3500} onClose={handleCloseCopiedAlert}>
        <Alert onClose={handleCloseCopiedAlert} severity="success">
          Link copied to clipboard
        </Alert>
      </Snackbar>
    </div>
  )
}
