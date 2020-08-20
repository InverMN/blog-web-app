import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, Box } from '@material-ui/core'
import { OfflineServersContext } from '../../contexts/index'

export const OfflineServersDialog: React.FC = () => {
  const { offlineServers } = React.useContext(OfflineServersContext)

  return (
    <Dialog open={offlineServers} fullScreen={true}>
      <Box style={{ maxWidth: 500, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        <DialogTitle>Ups! Something has broken</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can&apos;t connect to the server. Try later or report it to our support for e-mail:
            support@microblog.com . Thanks for all feedback and we apologize for the problems!
          </DialogContentText>
        </DialogContent>
      </Box>
    </Dialog>
  )
}
