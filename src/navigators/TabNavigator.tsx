import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/HomeScreen'
import PartyEntryScreen from '../screens/PartyEntryScreen'
import UserScreen from '../screens/UserScreen'
import UserEditScreen from '../screens/UserEditScreen'
import PartyDetailScreen from '../screens/PartyDetailScreen'
import SettingScreen from '../screens/SettingScreen'
import TermsScreen from '../screens/TermsScreen'
import PrivacyScreen from '../screens/PrivacyScreen'
import ChatScreen from '../screens/ChatScreen'
import PartyGroupsScreen from '../screens/PartyGroupsScreen'
import GroupDetailScreen from '../screens/GroupDetailScreen'
import PartyMakeScreen from '../screens/PartyMakeScreen'
import RoomScreen from '../screens/RoomScreen'

const Stack = createStackNavigator()

const HomeNavigator = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen name="Main" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="PartyEntry"
      component={PartyEntryScreen}
      options={{ headerBackTitleVisible: false, headerTransparent: true }}
    />
    <Stack.Screen
      name="PartyDetail"
      component={PartyDetailScreen}
      options={{ headerBackTitleVisible: false, headerTransparent: true }}
    />
    <Stack.Screen
      name="PartyMake"
      component={PartyMakeScreen}
      options={{ headerBackTitleVisible: false, headerTransparent: true }}
    />
    <Stack.Screen
      name="PartyGroups"
      component={PartyGroupsScreen}
      options={{ headerBackTitleVisible: false, headerTransparent: true }}
    />
    <Stack.Screen
      name="GroupDetail"
      component={GroupDetailScreen}
      options={{ headerBackTitleVisible: false, headerTransparent: true }}
    />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={{ headerBackTitleVisible: false, headerTransparent: true }}
    />
    <Stack.Screen
      name="User"
      component={UserScreen}
      options={{ headerBackTitleVisible: false, headerTransparent: true }}
    />
  </Stack.Navigator>
)

const RoomNavigator = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen name="Main" component={RoomScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="Chat"
      component={ChatScreen}
      options={{ headerBackTitleVisible: false, headerTransparent: true }}
    />
    <Stack.Screen
      name="User"
      component={UserScreen}
      options={{ headerBackTitleVisible: false, headerTransparent: true }}
    />
  </Stack.Navigator>
)

const UserNavigator = () => (
  <Stack.Navigator initialRouteName="Main">
    <Stack.Screen name="Main" component={UserScreen} options={{ headerShown: false }} />
    <Stack.Screen
      name="UserEdit"
      component={UserEditScreen}
      options={{ headerBackTitleVisible: false, headerTransparent: true }}
    />
    <Stack.Screen
      name="Setting"
      component={SettingScreen}
      options={{ headerTitle: '設定', headerBackTitleVisible: false }}
    />
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

const Tab = createBottomTabNavigator()

const TabNavigator = () => (
  <Tab.Navigator initialRouteName="HomeSection" tabBar={() => null} tabBarOptions={{ showLabel: false }}>
    <Tab.Screen name="HomeSection" component={HomeNavigator} />
    <Tab.Screen name="RoomSection" component={RoomNavigator} />
    <Tab.Screen name="UserSection" component={UserNavigator} />
  </Tab.Navigator>
)

export default TabNavigator
