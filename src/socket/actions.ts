import { socket, LoginResults } from './index'

export function connect(accessToken: string): void {
  socket.emit('login', { accessToken })
  socket.on('login', (results: LoginResults) => {
    if (results.status === 'success') console.log('logged to socket successfully')
    else console.log('failed to log to socket')
  })
}
