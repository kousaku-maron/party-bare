import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import WelcomeScreen from '../screens/WelcomeScreen'
import TermsScreen from '../screens/TermsScreen'
import PrivacyScreen from '../screens/PrivacyScreen'

const Stack = createStackNavigator()

const WelcomeNavigator = () => (
  <Stack.Navigator initialRouteName="Welcome">
    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="Terms"
      component={TermsScreen}
      options={{ headerTitle: '利用規約', headerBackTitleVisible: false }}
    />
    <Stack.Screen
      name="Privacy"
      component={PrivacyScreen}
      options={{ headerTitle: 'プライバシーポリシー', headerBackTitleVisible: false }}
    />
  </Stack.Navigator>
)

export default WelcomeNavigator
