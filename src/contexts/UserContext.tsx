import React from 'react'

export interface User {
  id: string
  username: string
  email: string
  isModerator: boolean
}

export const UserContext = React.createContext<{
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>> | null
}>(undefined!)

export const UserContextProvider: React.FC = (props) => {
  const [user, setUser] = React.useState<User | null>(null)

  return <UserContext.Provider value={{ user, setUser }}>{props.children}</UserContext.Provider>
}
