import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useAuthState, useAuthActions } from '../store/hooks'
import { useStyles, MakeStyles } from '../services/design'
import { useSecure, usePushNotifications } from '../services/secure'
import { TouchableOpacity, ScrollView, Text, StyleSheet, Dimensions } from 'react-native'
import { PushNotificationListItem } from '../components/organisms'
import { LoadingPage } from '../components/pages'

const SettingScreen = () => {
  const navigation = useNavigation()
  const { user } = useAuthState()
  const { signOut } = useAuthActions()
  const styles = useStyles(makeStyles)

  const secure = useSecure(user.uid)
  const pushNotificationsTools = usePushNotifications(user.uid)

  // MEMO: signOutするとuserデータがなくなってしまうので、先に画面遷移させる。
  const onSignOut = useCallback(() => {
    navigation.navigate('Welcome')
    signOut({})
  }, [navigation, signOut])

  const goToTerms = useCallback(() => {
    navigation.navigate('Terms')
  }, [navigation])

  const goToPrivacy = useCallback(() => {
    navigation.navigate('Privacy')
  }, [navigation])

  if (!user || !secure) {
    return <LoadingPage />
  }

  return (
    <ScrollView style={styles.container}>
      <PushNotificationListItem
        isExist={secure.pushTokens && secure.pushTokens.includes(pushNotificationsTools.deviceToken)}
        onAccept={pushNotificationsTools.onAccept}
        onReject={pushNotificationsTools.onReject}
      />

      <TouchableOpacity style={styles.listItem} onPress={goToTerms}>
        <Text style={styles.primaryText}>利用規約</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem} onPress={goToPrivacy}>
        <Text style={styles.primaryText}>プライバシーポリシー</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem}>
        <Text style={styles.primaryText}>退会する</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem} onPress={onSignOut}>
        <Text style={styles.signoutText}>サインアウト</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const hairlineWidth = StyleSheet.hairlineWidth
const width = Dimensions.get('window').width

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgrounds.primary
    },
    listItem: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width,
      height: 50,
      borderBottomColor: colors.foregrounds.separator,
      borderBottomWidth: hairlineWidth
    },
    primaryText: {
      color: colors.foregrounds.primary
    },
    signoutText: {
      color: colors.system.blue
    }
  })

export default SettingScreen
