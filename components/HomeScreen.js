import React, { useEffect } from 'react';
import { FlatList, Button, Animated, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux'
import { setDecks } from '../actions/deck'
import { loadDecks } from '../storage'
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { deleteDeck } from '../actions/deck'

const mapStateToProps = ({ decks }) => {
    return {
        decks
    }
}
  
function HomeScreen({ navigation, decks, setDecks, deleteDeck }) {
    navigation.setOptions({
        headerRight: () => (
            <Button
                onPress={() => navigation.navigate("Edit Deck", { deck: {} }) }
                title="Add New Deck"
            />
        )
    })
    if (!decks) {
        useEffect(() => {
            (async () => {
                const decks = await loadDecks()
                setDecks(decks)
            })()
        })
        return <ActivityIndicator size="large"/>
    }
    return (
        <FlatList
            data={Object.values(decks)}
            renderItem={({ item }) => {
                const renderActions = () => {
                    return (
                      <RectButton onPress={() => deleteDeck(item.id)}>
                        <Animated.Text>Delete</Animated.Text>
                      </RectButton>
                    );
                };
                return (
                    <Swipeable renderRightActions={renderActions}>
                        <Button 
                            onPress={() => navigation.navigate("Deck", { deck: item }) }
                            title={item.name}
                        />
                    </Swipeable>
                )
            }}
            keyExtractor={deck => deck.id}
        />
    )
}

export default connect(mapStateToProps, { setDecks, deleteDeck })(HomeScreen)
