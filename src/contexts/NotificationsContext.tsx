import React from 'react'
import { NotificationsReducer, NotificationsActionTypes } from '../reducers/index'

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
  data: NotificationSubject
  checked: boolean
  createdAt: number
}

const initialState = {
  notifications: Array<Notification>(),
  dispatch: () => null,
}

export const NotificationsContext = React.createContext<{
  notifications: Notification[]
  dispatch: React.Dispatch<NotificationsActionTypes>
}>(initialState)

export const NotificationsContextProvider: React.FC = ({ children }) => {
  const [notifications, dispatch] = React.useReducer(NotificationsReducer, [])

  return <NotificationsContext.Provider value={{ notifications, dispatch }}>{children}</NotificationsContext.Provider>
}
