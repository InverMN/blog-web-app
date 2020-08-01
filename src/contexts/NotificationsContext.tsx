import React from 'react'
import useState from 'react'

interface User {
  id: string
  username: string
}

type NotificationSubject = 'replied_post' | 'replied_comment'

export interface Notification {
  id: string
  sender: User
  receiver: User
  subject: NotificationSubject
  data: NotificationSubject
  checked: boolean
  createdAt: number
}

const initialState: Notification[] = []

export const NotificationsContext = React.createContext(initialState)

export const NotificationsContextProvider: React.FC = ({ children }) => {
  const [notifications] = React.useState(initialState)

  return <NotificationsContext.Provider value={notifications}>{children}</NotificationsContext.Provider>
}
