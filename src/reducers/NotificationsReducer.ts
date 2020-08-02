import { Notification } from '../contexts/index'

export const LOAD_NOTIFICATIONS = 'LOAD_NOTIFICATIONS'

interface LoadNotificationsAction {
  type: typeof LOAD_NOTIFICATIONS
  payload: Notification[]
}

export const DELETE_NOTIFICATION = 'DELETE_NOTIFICATION'

interface DeleteNotificationAction {
  type: typeof DELETE_NOTIFICATION
  payload: Pick<Notification, 'id'>
}

export const CHECKOUT_NOTIFICATION = 'CHECKOUT_NOTIFICATION'

interface CheckoutNotificationAction {
  type: typeof CHECKOUT_NOTIFICATION
  payload: Pick<Notification, 'id'>
}

export const CLEAR_ALL_NOTIFICATIONS = 'CLEAR_ALL_NOTIFICATIONS'

interface ClearAllNotificationsAction {
  type: typeof CLEAR_ALL_NOTIFICATIONS
}

export const PUSH_NOTIFICATION = 'PUSH_NOTIFICATION'

interface PushNotificationAction {
  type: typeof PUSH_NOTIFICATION
  payload: Notification
}

export type NotificationsActionTypes =
  | LoadNotificationsAction
  | DeleteNotificationAction
  | CheckoutNotificationAction
  | ClearAllNotificationsAction
  | PushNotificationAction

export const NotificationsReducer = (
  notifications: Notification[],
  action: NotificationsActionTypes,
): Notification[] => {
  switch (action.type) {
    case LOAD_NOTIFICATIONS:
      return action.payload
    case DELETE_NOTIFICATION:
      return notifications.filter((singleNotification) => singleNotification.id !== action.payload.id)
    case CHECKOUT_NOTIFICATION:
      return notifications.map((singleNotification) =>
        singleNotification.id === action.payload.id ? { ...singleNotification, checked: true } : singleNotification,
      )
    case CLEAR_ALL_NOTIFICATIONS:
      return []
    case PUSH_NOTIFICATION:
      return [action.payload, ...notifications]
  }
}
