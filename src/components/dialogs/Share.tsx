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
} from '@material-ui/core'
import { FileCopy as CopyIcon } from '@material-ui/icons'

interface Props {
  open: boolean
  onClose: () => void
}

export const ShareDialog: React.FC<Props> = ({ open, onClose: handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Share link with your friends</DialogTitle>
      <DialogContent>
        <TextField
          variant="outlined"
          value="test test test"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
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
  )
}
