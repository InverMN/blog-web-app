import React from 'react'
import { AuthenticationContext, UserContext } from '../../contexts/index'

export const AuthenticatedOnly: React.FC = ({ children }) => {
  const { setOpen } = React.useContext(AuthenticationContext)
  const { user } = React.useContext(UserContext)

  const handleClick = () => {
    if (user === null) setOpen(true)
  }

  return <div onClick={handleClick}>{children}</div>
}
