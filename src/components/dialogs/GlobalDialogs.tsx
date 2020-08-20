import React from 'react'
import { MustBeLogged, OfflineServersDialog } from './index'

export const GlobalDialogs: React.FC = () => {
  return (
    <div>
      <MustBeLogged />
      <OfflineServersDialog />
    </div>
  )
}
