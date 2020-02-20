import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
// import {
//   HomeScreen,
//   PartyEntryScreen,
//   UserScreen,
//   UserEditScreen,
//   PartyDetailScreen,
//   SettingScreen,
//   TermsScreen,
//   PrivacyScreen,
//   ChatScreen,
//   PartyGroupsScreen,
//   GroupDetailScreen,
//   PartyMakeScreen,
//   RoomScreen
// } from '../screens'
import Hello from '../components/Hello'

const Stack = createStackNavigator()

const HomeNavigator = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen name="Main" component={Hello} options={{ headerShown: false }} />
    <Stack.Screen
      name="PartyEntry"
      component={Hello}
      options={{ headerBackTitleVisible: false, headerTransparent: true }}
    />
    <Stack.Screen
      name="PartyDetail"
      component={Hello}
      options={{ headerBackTitleVisible: false, headerTransparent: true }}
    />
    <Stack.Screen
      name="PartyMake"
      component={Hello}
      options={{ headerBackTitleVisible: false, headerTransparent: true }}
    />
    <Stack.Screen
      name="PartyGroups"
      component={Hello}
      options={{ headerBackTitleVisible: false, headerTransparent: true }}
    />
    <Stack.Screen
      name="GroupDetail"
      component={Hello}
      options={{ headerBackTitleVisible: false, headerTransparent: true }}
    />
    <Stack.Screen name="Chat" component={Hello} options={{ headerBackTitleVisible: false, headerTransparent: true }} />
    <Stack.Screen name="User" component={Hello} options={{ headerBackTitleVisible: false, headerTransparent: true }} />
  </Stack.Navigator>
)

const RoomNavigator = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen name="Main" component={Hello} options={{ headerShown: false }} />
    <Stack.Screen name="Chat" component={Hello} options={{ headerBackTitleVisible: false, headerTransparent: true }} />
    <Stack.Screen name="User" component={Hello} options={{ headerBackTitleVisible: false, headerTransparent: true }} />
  </Stack.Navigator>
)

const UserNavigator = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen name="Main" component={Hello} options={{ headerShown: false }} />
    <Stack.Screen
      name="UserEdit"
      component={Hello}
      options={{ headerBackTitleVisible: false, headerTransparent: true }}
    />
    <Stack.Screen name="Setting" component={Hello} options={{ headerTitle: '設定', headerBackTitleVisible: false }} />
    <Stack.Screen name="Terms" component={Hello} options={{ headerTitle: '利用規約', headerBackTitleVisible: false }} />
    <Stack.Screen
      name="Privacy"
      component={Hello}
      options={{ headerTitle: 'プライバシーポリシー', headerBackTitleVisible: false }}
    />
  </Stack.Navigator>
)

const Tab = createBottomTabNavigator()

const TabNavigator = () => (
  <Tab.Navigator initialRouteName="HomeSection" tabBar={() => null} tabBarOptions={{ showLabel: false }}>
    <Tab.Screen name="HomeSection" component={HomeNavigator} />
    <Tab.Screen name="RoomSection" component={RoomNavigator} />
    <Tab.Screen name="UserSection" component={UserNavigator} />
  </Tab.Navigator>
)

export default TabNavigator
