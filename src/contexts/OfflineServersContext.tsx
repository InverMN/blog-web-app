import React from 'react'

interface ContextObject {
  offlineServers: boolean
  setOfflineServers: React.Dispatch<React.SetStateAction<boolean>>
}

export const OfflineServersContext = React.createContext<ContextObject>(undefined!)

export const OfflineServersContextProvider: React.FC = ({ children }) => {
  const [offlineServers, setOfflineServers] = React.useState(false)
  return (
    <OfflineServersContext.Provider value={{ offlineServers, setOfflineServers }}>
      {children}
    </OfflineServersContext.Provider>
  )
}
