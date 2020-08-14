import React from 'react'

interface ContextObject {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthenticationContext = React.createContext<ContextObject>(undefined!)

export const AuthenticationContextProvider: React.FC = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  return <AuthenticationContext.Provider value={{ open, setOpen }}>{children}</AuthenticationContext.Provider>
}
