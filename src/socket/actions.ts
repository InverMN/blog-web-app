import { socket, LoginResults } from './index'
import { Notification } from '../contexts/index'

export function connect(accessToken: string): void {
  socket.emit('login', { accessToken })
  socket.on('login', (results: LoginResults) => {
    if (results.status === 'success')
      socket.on('notification', (notificationData: Notification) => handleNewNotification(notificationData))
  })
}

export function disconnect(): void {
  socket.emit('logout')
}

function handleNewNotification(notification: Notification) {
  console.log('new notification:', notification)
}
