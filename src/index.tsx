import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {
  UserContextProvider,
  NotificationsContextProvider,
  AuthenticationContextProvider,
  ReportsContextProvider,
} from './contexts/index'

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <NotificationsContextProvider>
        <AuthenticationContextProvider>
          <ReportsContextProvider>
            <App />
          </ReportsContextProvider>
        </AuthenticationContextProvider>
      </NotificationsContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()

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
