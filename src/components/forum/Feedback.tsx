import React, { useState, useContext } from 'react'
import { Grid, Box, Button } from '@material-ui/core'
import { Add as Like, Remove as Dislike } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { Popularity, FeedbackType } from '../../contexts/index'
import { useAPI } from '../../lib/index'
import { ForumContext } from '../../contexts/index'

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
    minWidth: '30px',
    textAlign: 'center',
  },
})

interface Props {
  popularity: Popularity
  target: string
  userReaction?: FeedbackType
}

export const Feedback: React.FC<Props> = ({ popularity, target, userReaction }) => {
  const classes = useStyles()
  const api = useAPI()
  const { dispatch } = useContext(ForumContext)

  const sendFeedback = (sentFeedbackType: FeedbackType) => {
    if (userReaction === sentFeedbackType) {
      api.post(`unlike/${target}`)
      dispatch({ type: 'CHANGE_REACTION', payload: { id: target, reactionType: 'neutral' } })
    } else {
      sentFeedbackType === 'positive' ? api.post(`like/${target}`) : api.post(`dislike/${target}`)
      dispatch({ type: 'CHANGE_REACTION', payload: { id: target, reactionType: sentFeedbackType } })
    }
  }

  return (
    <Box m={1}>
      <Grid container spacing={1}>
        <Grid item>
          <Button
            disableElevation
            disabled={userReaction === undefined}
            style={userReaction === 'positive' ? { backgroundColor: '#D2D2D2', color: '#FFF' } : undefined}
            className={classes.actionButton}
            variant={userReaction === 'positive' ? 'contained' : 'outlined'}
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
            disabled={userReaction === undefined}
            style={userReaction === 'negative' ? { backgroundColor: '#D2D2D2', color: '#FFF' } : undefined}
            className={classes.actionButton}
            variant={userReaction === 'negative' ? 'contained' : 'outlined'}
            onClick={() => sendFeedback('negative')}
          >
            <Dislike />
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
