import React, { useState } from 'react'
import { StyleSheet, Text, View, Button, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { saveDeck } from '../actions/deck'

const styles = StyleSheet.create({
    label: {
        fontSize: 22
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
    }
});

const mapStateToProps = ({ decks }) => {
    return {
        decks
    }
}

function NewDeckScreen({ route: { params: { deck } }, navigation, saveDeck }) {
    const isNewDeck = deck.id == null
    const [name, setName] = useState(deck.name || '')
    const save = () => {
        saveDeck({ name })
        navigation.goBack()
    }
    navigation.setOptions({
        title: isNewDeck ? 'New Deck' : 'Edit Deck',
        headerRight: () => (
            <Button
                onPress={save}
                title="Save"
            />
        )
    })
    return (
        <View style={{
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'flex-start',
        }}>
            <Text style={[styles.label, { margin: 8 }]}>{isNewDeck ? 'Give the Deck a name:' : "Update the Deck's name:"}</Text>
            <View style={{ flexDirection: 'row', flex: 1, margin: 8, marginTop: 0 }}>
                <TextInput style={[styles.textInput, { flex: 1 }]}
                    placeholder={isNewDeck ? "Name of your new deck" : "Change the name of your deck"}
                    returnKeyType={'done'}
                    autoFocus={true}
                    onChange={e => setName(e.nativeEvent.text)}
                    value={name}
                    onSubmitEditing={save}
                />
            </View>
        </View>
    )
}

export default connect(mapStateToProps, { saveDeck })(NewDeckScreen)
