import React, { useState, createContext, useEffect } from 'react'
import { useAPI } from '../lib/index'

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
  const api = useAPI()

  const [user, setUser] = useState<User | null>(null)

  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>
}
