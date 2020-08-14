import React from 'react'
import { NotificationsReducer, NotificationsActionTypes } from '../reducers/index'
import { UserContext } from './UserContext'
import { useAPI } from '../lib/API'
import { socket } from '../socket/index'

interface User {
  id: string
  username: string
}

export type NotificationSubject = 'REPLIED_COMMENT' | 'REPLIED_POST'

export interface Notification {
  id: string
  sender: User
  receiver: User
  subject: NotificationSubject
  data: any
  checked: boolean
  createdAt: number
}

export const NotificationsContext = React.createContext<{
  notifications: Notification[]
  dispatch: React.Dispatch<NotificationsActionTypes>
}>(undefined!)

export const NotificationsContextProvider: React.FC = ({ children }) => {
  const [notifications, dispatch] = React.useReducer(NotificationsReducer, [])
  const { user } = React.useContext(UserContext)
  const api = useAPI()

  React.useEffect(() => {
    socket.on('notification', (notificationData: Notification) =>
      dispatch({ type: 'PUSH_NOTIFICATION', payload: notificationData }),
    )
  }, [])

  React.useEffect(() => {
    api
      .get('notifications')
      .then((res) => dispatch({ type: 'LOAD_NOTIFICATIONS', payload: res.data }))
      .catch(() => dispatch({ type: 'CLEAR_ALL_NOTIFICATIONS' }))
  }, [user])

  return <NotificationsContext.Provider value={{ notifications, dispatch }}>{children}</NotificationsContext.Provider>
}
