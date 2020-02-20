import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
// import { WelcomeScreen, TermsScreen, PrivacyScreen } from '../screens'
import Hello from '../components/Hello'

const Stack = createStackNavigator()

const WelcomeNavigator = () => (
  <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen name="Welcome" component={Hello} options={{ headerShown: false }} />
    <Stack.Screen name="Terms" component={Hello} options={{ headerTitle: '利用規約', headerBackTitleVisible: false }} />
    <Stack.Screen
      name="Privacy"
      component={Hello}
      options={{ headerTitle: 'プライバシーポリシー', headerBackTitleVisible: false }}
    />
  </Stack.Navigator>
)

export default WelcomeNavigator
