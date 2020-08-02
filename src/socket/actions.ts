import { socket, LoginResults } from './index'
import { Notification } from '../contexts/index'

export function connect(accessToken: string): void {
  socket.emit('login', { accessToken })
}

export function disconnect(): void {
  socket.emit('logout')
}
