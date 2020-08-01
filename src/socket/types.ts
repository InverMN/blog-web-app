export interface LoginResults {
  status: 'success' | 'failed'
}

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
