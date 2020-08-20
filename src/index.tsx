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
  OfflineServersContextProvider,
} from './contexts/index'

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <NotificationsContextProvider>
        <AuthenticationContextProvider>
          <ReportsContextProvider>
            <OfflineServersContextProvider>
              <App />
            </OfflineServersContextProvider>
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
