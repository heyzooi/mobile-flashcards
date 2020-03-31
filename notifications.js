import * as Permissions from 'expo-permissions'
import { Notifications } from 'expo'
import { setNotificationId } from './storage'

function createLocalNotification() {
    return {
        title: 'Quiz Reminder',
        body: 'You have not yet complete a quiz today!',
        ios: {
            sound: true,
            _displayInForeground: true,
        },
        android: {
            sticky: false,
        },
    }
}

async function onPermissionGranted() {
    try {
        await cancelNotification()
        await setNotificationId(null)
        const date = new Date()
        date.setHours(20) //8pm
        localNotificationId = await Notifications.scheduleLocalNotificationAsync(createLocalNotification(), {
            time: date.getTime(),
            repeat: 'day',
        })
        await setNotificationId(localNotificationId)
    } catch (error) {
        alert(error)
    }
}

export async function cancelNotification() {
    await Notifications.cancelAllScheduledNotificationsAsync()
}

export async function scheduleNotifications() {
    try {
        const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS)
        if (status !== 'granted') {
            const { status, permissions } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
            if (status !== 'granted') {
                alert('👋 Please enable notifications so you can receive reminders every day.')
                return
            } else {
                onPermissionGranted()
            }
        } else {
            onPermissionGranted()
        }
    } catch (error) {
        alert(error)
    }
}
