import { Report } from '../contexts/index'

export const LOAD_REPORTS = 'LOAD_REPORTS'

interface LoadReportsAction {
  type: typeof LOAD_REPORTS
  payload: Report[]
}

export const DELETE_REPORT = 'DELETE_REPORT'

interface DeleteReportAction {
  type: typeof DELETE_REPORT
  payload: Pick<Report, 'id'>
}

export const CLEAR_ALL_REPORTS = 'CLEAR_ALL_REPORTS'

interface ClearAllReportsAction {
  type: typeof CLEAR_ALL_REPORTS
}

export type ReportsActionTypes = LoadReportsAction | DeleteReportAction | ClearAllReportsAction

export const ReportsReducer = (reports: Report[], action: ReportsActionTypes): Report[] => {
  switch (action.type) {
    case LOAD_REPORTS:
      return action.payload
    case DELETE_REPORT:
      return reports.filter((singleReport) => singleReport.id !== action.payload.id)
    case CLEAR_ALL_REPORTS:
      return []
  }
}
