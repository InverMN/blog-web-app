import React from 'react'
import { ReportsReducer, ReportsActionTypes } from '../reducers/index'
import { UserContext } from './index'
import { useAPI } from '../lib/API'

export interface Report {
  id: string
  target: string
  data: any
  checked: boolean
  createdAt: number
  times: number
}

interface ContextObject {
  reports: Report[]
  dispatch: React.Dispatch<ReportsActionTypes>
}

export const ReportsContext = React.createContext<ContextObject>(undefined!)

export const ReportsContextProvider: React.FC = ({ children }) => {
  const [reports, dispatch] = React.useReducer(ReportsReducer, [])
  const { user } = React.useContext(UserContext)
  const api = useAPI()

  React.useEffect(() => {
    if (user?.isModerator) api.get('reports').then((res) => dispatch({ type: 'LOAD_REPORTS', payload: res.data }))
    else dispatch({ type: 'CLEAR_ALL_REPORTS' })
  }, [user])

  return <ReportsContext.Provider value={{ reports, dispatch }}>{children}</ReportsContext.Provider>
}
