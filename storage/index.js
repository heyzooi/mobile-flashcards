import { AsyncStorage } from 'react-native'

const DECKS = 'DECKS'
const NOTIFICATION_ID = 'NOTIFICATION_ID'

export async function loadDecks() {
    return JSON.parse(await AsyncStorage.getItem(DECKS)) || {}
}

export async function saveDecks(decks) {
    if (decks) {
        return await AsyncStorage.setItem(DECKS, JSON.stringify(decks))
    } else {
        return await AsyncStorage.removeItem(DECKS)
    }
}

export async function getNotificationId() {
    return await AsyncStorage.getItem(NOTIFICATION_ID)
}

export async function setNotificationId(notificationId) {
    if (notificationId) {
        return await AsyncStorage.setItem(NOTIFICATION_ID, notificationId)
    } else {
        return await AsyncStorage.removeItem(NOTIFICATION_ID)
    }
}
