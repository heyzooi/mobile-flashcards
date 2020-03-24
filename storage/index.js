import { AsyncStorage } from 'react-native'

const DECKS = 'DECKS'

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
