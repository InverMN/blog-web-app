import React from 'react'
import { useAPI } from '../lib/index'

interface ContextObject {
  offlineServers: boolean
  setOfflineServers: React.Dispatch<React.SetStateAction<boolean>>
}

export const OfflineServersContext = React.createContext<ContextObject>(undefined!)

export const OfflineServersContextProvider: React.FC = ({ children }) => {
  const [offlineServers, setOfflineServers] = React.useState(false)

  const api = useAPI()
  React.useEffect(() => {
    api.get('posts', { timeout: 5000 }).catch(() => setOfflineServers(true))
  }, [])

  return (
    <OfflineServersContext.Provider value={{ offlineServers, setOfflineServers }}>
      {children}
    </OfflineServersContext.Provider>
  )
}
