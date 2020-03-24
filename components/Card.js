import React, { useState, useRef } from 'react'
import { connect } from "react-redux";
import { View, Button, TextInput, Animated, StyleSheet } from 'react-native';

function Card({ card, editable, onChange, onSave }) {
    editable = editable || false
    const [frontText, setFrontText] = useState(card.frontText || '')
    const [backText, setBackText] = useState(card.backText || '')
    if (onChange) {
        onChange({
            frontText,
            backText
        })
    }
    const frontTextInputRef = useRef(null)
    const backTextInputRef = useRef(null)
    const [value, setValue] = useState(0)
    const [animatedValue] = useState(new Animated.Value(0))
    animatedValue.addListener(({ value }) => setValue(value))
    const [frontInterpolate] = useState(animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['0deg', '180deg']
    }))
    const [backInterpolate] = useState(animatedValue.interpolate({
        inputRange: [0, 180],
        outputRange: ['180deg', '360deg']
    }))
    const frontAnimatedStyle = {
        transform: [
            { rotateX: frontInterpolate }
        ]
    }
    const backAnimatedStyle = {
        transform: [
            { rotateX: backInterpolate }
        ]
    }
    const styles = StyleSheet.create({
        flipCard: {
            backfaceVisibility: 'hidden'
        },
        backCard: {
            position: 'absolute',
            top: 0
        }
    })
    const flipCard = () => {
        if (value >= 90) {
            Animated.spring(animatedValue, {
                toValue: 0,
                friction: 8,
                tension: 10
            }).start()
            frontTextInputRef.current.focus()
        } else {
            Animated.spring(animatedValue, {
                toValue: 180,
                friction: 8,
                tension: 10
            }).start()
            backTextInputRef.current.focus()
        }
    }
    const save = () => {
        if (onSave) {
            onSave({
                ...card,
                frontText,
                backText
            })
        }
    }
    return (
        <View>
            <Animated.View style={[frontAnimatedStyle, styles.flipCard]}>
                <TextInput
                    editable={editable}
                    ref={frontTextInputRef}
                    placeholder='Front Card Text'
                    returnKeyType={'done'}
                    autoFocus={true}
                    onChange={e => setFrontText(e.nativeEvent.text)}
                    value={frontText}
                    onSubmitEditing={save}
                />
            </Animated.View>
            <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.backCard]}>
                <TextInput
                    editable={editable}
                    ref={backTextInputRef}
                    placeholder='Back Card Text'
                    returnKeyType={'done'}
                    onChange={e => setBackText(e.nativeEvent.text)}
                    value={backText}
                    onSubmitEditing={save}
                />
            </Animated.View>
            <Button onPress={flipCard} title='Flip Card'/>
        </View>
    )
}

export default connect()(Card)
