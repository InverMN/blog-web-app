import io from 'socket.io-client'

//Initialize globals before everything
declare global {
  interface Window {
    pageURL: string
    serverURL: string
  }
}

const url = window.location.href
const arr = url.split('/')
window.pageURL = arr[0] + '//' + arr[2]
window.serverURL = 'http://localhost:5500'

export const socket = io(window.serverURL)
