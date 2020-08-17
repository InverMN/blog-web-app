import React from 'react'
import { List, Popover } from '@material-ui/core'
import { ReportsListTopBar, ReportItem } from './index'
import { makeStyles } from '@material-ui/core/styles'
import { ReportsContext } from '../../../contexts/index'
import { useAPI } from '../../../lib/index'

interface Props {
  anchorElement: HTMLElement | null
  handleClose: () => void
}

const useStyles = makeStyles({
  list: {
    minWidth: '375px',
    minHeight: '300px',
  },
})

export const ReportsList: React.FC<Props> = ({ anchorElement, handleClose }) => {
  const { reports, dispatch } = React.useContext(ReportsContext)
  const api = useAPI()
  const classes = useStyles()

  const generateNotificationItems = () =>
    reports.map((report) => (
      <ReportItem
        key={report.id}
        data={report}
        handleDelete={() => {
          api.delete(`reports/${report.id}`)
          dispatch({ type: 'DELETE_REPORT', payload: { id: report.id } })
        }}
        handleReportsListClose={handleClose}
      />
    ))

  return (
    <Popover
      open={Boolean(anchorElement)}
      anchorEl={anchorElement}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={handleClose}
    >
      <List className={classes.list} subheader={<ReportsListTopBar />}>
        {generateNotificationItems()}
      </List>
    </Popover>
  )
}
