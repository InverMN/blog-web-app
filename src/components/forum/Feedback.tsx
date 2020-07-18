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
    minHeight: '0',
    color: '#696969',
    borderRadius: '50%',
  },
  counter: {
    color: '#797979',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mediumActionButton: {
    width: '30px',
    height: '30px',
    lineHeight: '30px',
  },
  mediumCounter: {
    lineHeight: '30px',
    minWidth: '30px',
  },
  smallActionButton: {
    width: '20px',
    height: '20px',
    lineHeight: '20px',
  },
  smallCounter: {
    lineHeight: '23px',
    minWidth: '20px',
  },
})

interface Props {
  popularity: Popularity
  target: string
  userReaction?: FeedbackType
  size?: 'medium' | 'small'
}

export const Feedback: React.FC<Props> = ({ popularity, target, userReaction, size = 'medium' }) => {
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
            className={`${classes.actionButton} ${
              size === 'medium' ? classes.mediumActionButton : classes.smallActionButton
            }`}
            variant={userReaction === 'positive' ? 'contained' : 'outlined'}
            onClick={() => sendFeedback('positive')}
          >
            <Like style={size === 'small' ? { fontSize: '12px' } : {}} />
          </Button>
        </Grid>
        <Grid
          item
          className={`${classes.counter} ${size === 'medium' ? classes.mediumCounter : classes.smallCounter}`}
          style={size === 'small' ? { fontSize: '12px' } : {}}
        >
          {popularity.sum}
        </Grid>
        <Grid item>
          <Button
            disableElevation
            disabled={userReaction === undefined}
            style={userReaction === 'negative' ? { backgroundColor: '#D2D2D2', color: '#FFF' } : undefined}
            className={`${classes.actionButton} ${
              size === 'medium' ? classes.mediumActionButton : classes.smallActionButton
            }`}
            variant={userReaction === 'negative' ? 'contained' : 'outlined'}
            onClick={() => sendFeedback('negative')}
          >
            <Dislike style={size === 'small' ? { fontSize: '12px' } : {}} />
          </Button>
        </Grid>
      </Grid>
    </Box>
  )
}
