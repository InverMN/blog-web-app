import React, { useState, createContext } from 'react'

export interface User {
  id: string
  username: string
  email: string
}

export const UserContext = createContext<{
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>> | null
}>({ user: null, setUser: null })

export const UserContextProvider: React.FC = (props) => {
  const [user, setUser] = useState<User | null>(null)

  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>
}
