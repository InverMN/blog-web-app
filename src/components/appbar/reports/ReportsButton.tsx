import React from 'react'
import { IconButton, Badge } from '@material-ui/core'
import { Error as ErrorIcon } from '@material-ui/icons'
import { ReportsList } from './index'
import { ReportsContext } from '../../../contexts/index'

export const ReportsButton: React.FC = () => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>(null)
  const [reportsCount, setReportsCount] = React.useState(0)
  const { reports } = React.useContext(ReportsContext)

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorElement(event.currentTarget)
  }

  const handleClose = () => setAnchorElement(null)

  React.useEffect(() => {
    setReportsCount(reports.length)
  }, [reports])

  return (
    <div>
      <IconButton onClick={handleOpen}>
        <Badge badgeContent={reportsCount} max={99} color="error">
          <ErrorIcon style={{ color: 'white' }} />
        </Badge>
      </IconButton>
      <ReportsList anchorElement={anchorElement} handleClose={handleClose} />
    </div>
  )
}
