import React, { useState } from 'react'
import { Grid, Box, Button } from '@material-ui/core'
import { Add as Like, Remove as Dislike } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Popularity } from '../../contexts/index'

const useStyles = makeStyles({
  actionButton: {
    padding: '0',
    minWidth: '0',
    width: '30px',
    height: '30px',
    color: '#696969',
    lineHeight: '30px',
    borderRadius: '50%',
  },
  counter: {
    lineHeight: '30px',
    color: '#797979',
    fontWeight: 'bold',
    minWidth: '20px',
    textAlign: 'center',
  },
})

export type FeedbackType = 'positive' | 'neutral' | 'negative'

interface Props {
  popularity: Popularity
}

export const Feedback: React.FC<Props> = ({ popularity }) => {
  const classes = useStyles()
  const [feedbackType, setFeedbackType] = useState<FeedbackType>('neutral')

  const sendFeedback = (sentFeedbackType: FeedbackType) => {
    feedbackType === sentFeedbackType ? setFeedbackType('neutral') : setFeedbackType(sentFeedbackType)
  }

  return (
    <Box m={1}>
      <Grid container spacing={1}>
        <Grid item>
          <Button
            disableElevation
            style={feedbackType === 'positive' ? { backgroundColor: '#D2D2D2', color: '#FFF' } : undefined}
            className={classes.actionButton}
            variant={feedbackType === 'positive' ? 'contained' : 'outlined'}
            onClick={() => sendFeedback('positive')}
          >
            <Like />
          </Button>
        </Grid>
        <Grid item className={classes.counter}>
          {popularity.sum}
        </Grid>
        <Grid item>
          <Button
            disableElevation
            style={feedbackType === 'negative' ? { backgroundColor: '#D2D2D2', color: '#FFF' } : undefined}
            className={classes.actionButton}
            variant={feedbackType === 'negative' ? 'contained' : 'outlined'}
            onClick={() => sendFeedback('negative')}
          >
            <Dislike />
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
