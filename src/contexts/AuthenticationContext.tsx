import React from 'react'

const [open, setOpen] = React.useState(false)
const initialState = { open, setOpen }

export const AuthenticationContext = React.createContext(initialState)

export const AuthenticationContextProvider: React.FC = ({ children }) => {
  const [open, setOpen] = React.useState(false)
  return <AuthenticationContext.Provider value={{ open, setOpen }}>{children}</AuthenticationContext.Provider>
}
