import React from 'react'
import { Card, CardHeader, IconButton, CardContent, CardActions, Grid } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'

export const PostSkeleton: React.FC = () => {
  const randomNumber = (max: number, min: number): number => Math.round(Math.random() * (max - min)) + min

  const renderPostContent = () => {
    const onlyMedia = Math.random() < 1 / 4

    return (
      <CardContent>
        {onlyMedia ? null : (
          <div>
            {[...Array(randomNumber(1, 5))].map((_, index) => (
              <Skeleton variant="text" key={index} />
            ))}
            <Skeleton variant="text" width={randomNumber(20, 90) + '%'} />
          </div>
        )}
        {Math.random() < 1 / 5 || onlyMedia ? (
          <Skeleton
            variant="rect"
            width="100%"
            height="250px"
            style={onlyMedia ? { marginTop: '-10px' } : { marginTop: '10px' }}
          />
        ) : null}
      </CardContent>
    )
  }

  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Skeleton variant="circle" width={40} height={40} />}
        title={<Skeleton variant="text" width={randomNumber(40, 100)} height={20} />}
        subheader={<Skeleton variant="text" width={randomNumber(30, 150)} />}
      />
      {renderPostContent()}
      <CardActions>
        <Grid container justify="space-around">
          <Grid item>
            <Skeleton variant="text" width={70} height={40} />
          </Grid>
          <Grid item>
            <Skeleton variant="text" width={70} height={40} />
          </Grid>
          <Grid item>
            <Skeleton variant="text" width={70} height={40} />
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  )
}
