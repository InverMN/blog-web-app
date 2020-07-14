import React, { useContext, useEffect, useState } from 'react'
import { Layout } from './components/Layout'
import { useAPI } from './lib/index'
import { UserContext } from './contexts/index'

function App(): JSX.Element {
  const api = useAPI()
  const { user, setUser } = useContext(UserContext)
  const [isInitial, setInitial] = useState(true)

  useEffect(() => {
    if (isInitial) {
      setInitial(false)
      api.refresh().then((res) => {
        if (res === true) {
          console.log('setting up user')
          api.get('users/me').then((res) => {
            console.log(res.data)
            if (setUser !== null) setUser(res.data)
          })
        }
      })
    }
  })

  return (
    <div className="App">
      <Layout />
    </div>
  )
}

export default App
