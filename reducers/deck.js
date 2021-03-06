import { SET_DECKS, SAVE_DECK, SAVE_CARD, DELETE_CARD, DELETE_DECK } from '../actions/deck'
import { saveDecks } from '../storage'

export default function decks(state = null, action) {
    switch (action.type) {
        case SET_DECKS:
            return action.decks
        case SAVE_DECK: {
            const { deck } = action
            if (!deck.id) {
                deck.id = `deck-${(Object.keys(state || {}).length + 1).toString()}`
            }
            const decks = {
                ...state,
                [deck.id]: deck
            }
            saveDecks(decks)
            return decks
        }
        case SAVE_CARD: {
            const { deckId, card } = action
            const deck = state[deckId]
            if (!card.id) {
                card.id = `card-${(Object.keys(deck.cards || {}).length + 1).toString()}`
            }
            const decks = {
                ...state,
                [deckId]: {
                    ...deck,
                    cards: {
                        ...deck.cards,
                        [card.id]: card
                    }
                }
            }
            saveDecks(decks)
            return decks
        }
        case DELETE_CARD: {
            const decks = {
                ...state
            }
            delete decks[action.deckId].cards[action.cardId]
            saveDecks(decks)
            return decks
        }
        case DELETE_DECK: {
            const decks = {
                ...state
            }
            delete decks[action.deckId]
            saveDecks(decks)
            return decks
        }
        default:
            return state
    }
}
