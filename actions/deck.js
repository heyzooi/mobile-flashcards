
export const SAVE_DECK = 'SAVE_DECK'
export const SET_DECKS = 'SET_DECKS'
export const LOAD_DECK = 'LOAD_DECK'
export const SAVE_CARD = 'SAVE_CARD'
export const DELETE_CARD = 'DELETE_CARD'
export const DELETE_DECK = 'DELETE_DECK'

export function saveDeck(deck) {
    return {
        type: SAVE_DECK,
        deck
    }
}

export function setDecks(decks) {
    return {
        type: SET_DECKS,
        decks
    }
}

export function loadDeck(deck) {
    return {
        type: LOAD_DECK,
        deck
    }
}

export function saveCard(deckId, card) {
    return {
        type: SAVE_CARD,
        deckId,
        card
    }
}

export function deleteCard(deckId, cardId) {
    return {
        type: DELETE_CARD,
        deckId,
        cardId
    }
}

export function deleteDeck(deckId) {
    return {
        type: DELETE_DECK,
        deckId
    }
}
