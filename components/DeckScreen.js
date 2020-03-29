import React from 'react'
import { FlatList, Button, Animated, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native'
import { connect } from 'react-redux'
import Card from './Card'
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { deleteCard } from '../actions/deck'

const mapStateToProps = ({ decks }) => {
    return {
        decks
    }
}

function DeckScreen({ route: { params: { deck: { id } }}, navigation, decks, deleteCard }) {
    const deck = decks[id]
    navigation.setOptions({
        title: deck.name,
        headerRight: () => (
            <Button
                onPress={() => navigation.navigate("Edit Card", { deck, card: {} }) }
                title="Add New Card"
            />
        )
    })
    const styles = StyleSheet.create({
        container: {
            flexDirection: 'column',
            justifyContent: 'flex-end',
        },
        takeQuiz: {
            position: 'absolute',
            bottom: 20,
            width: '100%',
            height: 40,
            justifyContent: 'center',
            alignItems: "center",
        },
        takeQuizText: {
            fontSize: 30,
        },
    })
    const cards = Object.values(deck.cards || {})
    return (
        <SafeAreaView style={[styles.container]}>
            <FlatList
                contentContainerStyle={{ height: '100%' }}
                data={cards}
                renderItem={({ item }) => {
                    const renderActions = () => {
                        return (
                        <RectButton onPress={() => deleteCard(id, item.id)}>
                            <Animated.Text>Delete</Animated.Text>
                        </RectButton>
                        );
                    };
                    return (
                        <Swipeable renderRightActions={renderActions}>
                            <Card card={item}/>
                        </Swipeable>
                    )
                }}
                keyExtractor={card => card.id}
            />
            {cards.length > 0 && (
                <TouchableOpacity style={[styles.takeQuiz]} onPress={() => navigation.push("Quiz", { deck })}>
                    <Text style={[styles.takeQuizText]}>Take a Quiz</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    )
}

export default connect(mapStateToProps, { deleteCard })(DeckScreen)