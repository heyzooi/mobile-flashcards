import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import EditDeckScreen from './components/EditDeckScreen'
import HomeScreen from './components/HomeScreen'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'
import thunk from 'redux-thunk'
import DeckScreen from './components/DeckScreen';
import EditCardScreen from './components/EditCardScreen';

const logger = (store) => (next) => (action) => {
  console.group(action.type)
      console.log('Action:', action)
      const result = next(action)
      console.log('New State:', store.getState())
  console.groupEnd()
  return result
}

const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export default function App() {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Provider store={store}>
        <Stack.Navigator>
          <Stack.Screen name="FlashCards" component={HomeScreen} />
          <Stack.Screen name="Edit Deck" component={EditDeckScreen} />
          <Stack.Screen name="Deck" component={DeckScreen} />
          <Stack.Screen name="Edit Card" component={EditCardScreen} />
        </Stack.Navigator>
      </Provider>
    </NavigationContainer>
  );
}