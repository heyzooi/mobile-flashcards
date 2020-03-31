import React, { useState } from 'react'
import { connect } from "react-redux"
import { View, StyleSheet, Button, Text, Animated } from 'react-native'
import Card from './Card'
import { cancelNotification } from '../notifications'

function QuizScreen({ route: { params: { deck } }, navigation }) {
    const [result, setResult] = useState(Object.keys(deck.cards).reduce((state, cardId) => ({
        ...state,
        [cardId]: null,
    }), {}))
    const [showingBack, setShowingBack] = useState(false)
    const unanswered = Object.entries(result).filter(([_, value]) => value === null).map(([key]) => key)
    const [animatedValue] = useState(new Animated.Value(0))
    if (unanswered.length == 0) {
        const answers = Object.values(result)
        const correct = answers.filter((answer) => answer).length
        const incorrect = (answers.length - correct) || 0
        const submit = () => {
            cancelNotification()
            navigation.pop()
        }
        return (
            <View>
                <Text>{`Correct: ${correct}`}</Text>
                <Text>{`Incorrect: ${incorrect}`}</Text>
                <Text>{`Total: ${answers.length}`}</Text>
                <Button onPress={submit} title='OK'/>
            </View>
        )
    }
    const currentCardKey = unanswered[0]
    const currentCard = deck.cards[currentCardKey]
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'column',
            justifyContent: 'flex-end',
        },
        submit: {
            position: 'absolute',
            bottom: 20,
            width: '100%',
            height: 40,
            justifyContent: 'center',
            alignItems: "center",
        },
        submitText: {
            fontSize: 30,
        },
        containerReply: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
        },
    })
    const reply = (isCorrect) => {
        setResult({
            ...result,
            [currentCardKey]: isCorrect,
        })
        setShowingBack(false)
        animatedValue.setValue(0)
    }
    return (
        <View>
            <Card
                card={currentCard}
                onFlip={(showingFront) => setShowingBack(!showingFront)}
                animatedValueState={[animatedValue]}
            />
            {showingBack && (
                <View style={styles.containerReply}>
                    <Button style={styles.reply} onPress={() => reply(false)} title='Incorrect'/>
                    <Button style={styles.reply} onPress={() => reply(true)} title='Correct'/>
                </View>
            )}
        </View>
    )
}

export default connect()(QuizScreen)