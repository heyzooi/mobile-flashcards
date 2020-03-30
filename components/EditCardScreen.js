import React, { useState, useRef } from 'react'
import { View, TextInput, Animated, StyleSheet, Button } from 'react-native'
import { connect } from 'react-redux'
import { saveCard } from '../actions/deck'
import Card from './Card'

function EditCardScreen({
    route: {
        params: {
            deck,
            card,
        }
    },
    navigation,
    saveCard,
}) {
    const isNewCard = card.id == null
    const save = (card) => {
        if (card.frontText.trim().length === 0 || card.backText.trim().length === 0) {
            return
        }
        saveCard(deck.id, card)
        navigation.goBack() //goes back to the "Deck" screen
    }
    navigation.setOptions({
        title: isNewCard ? 'New Card' : 'Edit Card',
        headerRight: () => (
            <Button
                onPress={() => save(card)}
                title="Save"
            />
        )
    })
    return (
        <Card card={card}
            editable={true}
            onChange={(newCard) => card = {
                ...card,
                ...newCard
            }}
            onSave={() => save(card)}
        />
    )
}

export default connect(null, { saveCard })(EditCardScreen)