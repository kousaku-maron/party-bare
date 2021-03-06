import React, { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { UpdateUser } from '../entities'
import { useAuthState, useUIActions } from '../store/hooks'
import * as UserRepository from '../repositories/user'
import { useStyles, useColors, MakeStyles } from '../services/design'
import { useUserEditTools } from '../services/user'
import { View, Text, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { Fab, Thumbnail, TextInput } from '../components/atoms'
import { LoadingPage } from '../components/pages'
import { showUserEditFailurMessage, showUserEditSuccessMessage } from '../services/flashCard'

const UserEditScreen = () => {
  const navigation = useNavigation()
  const { uid } = useAuthState()
  const { openLoadingModal, closeLoadingModal } = useUIActions()

  const styles = useStyles(makeStyles)
  const colors = useColors()

  const { name, userID, thumbnailURL, onChangeName, onChangeUserID, onChangeThumbnailURL, fetched } = useUserEditTools(
    uid
  )

  const updateUserState = useCallback(async () => {
    openLoadingModal()
    const updateUser: UpdateUser = { uid, name, thumbnailURL, userID } // TODO: userIDに変更なければ、引数に入れないようにする。
    const { result } = await UserRepository.setUser(uid, updateUser)
    result ? showUserEditSuccessMessage() : showUserEditFailurMessage()
    closeLoadingModal()
    if (result) {
      navigation.goBack()
    }
  }, [closeLoadingModal, name, navigation, openLoadingModal, thumbnailURL, uid, userID])

  if (!fetched) {
    return <LoadingPage />
  }

  return (
    <View style={styles.container}>
      <View style={styles.editFab}>
        <Fab color={colors.tints.primary.main} onPress={updateUserState}>
          <MaterialIcons color={colors.foregrounds.onTintPrimary} name="done" size={24} />
        </Fab>
      </View>

      <View style={styles.thumbnailWrapper}>
        <Thumbnail uri={thumbnailURL} size={200} onPress={onChangeThumbnailURL} />
      </View>

      <View>
        <View style={styles.nameWrapper}>
          <Text style={styles.titleText}>ネーム</Text>
          <TextInput value={name} onChangeText={onChangeName}></TextInput>
        </View>
      </View>

      <View>
        <View style={styles.userIDWrapper}>
          <Text style={styles.titleText}>ID</Text>
          <TextInput value={userID} onChangeText={onChangeUserID}></TextInput>
        </View>
      </View>
    </View>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      backgroundColor: colors.backgrounds.primary
    },
    editFab: {
      position: 'absolute',
      right: 26,
      bottom: 24
    },
    thumbnailWrapper: {
      paddingTop: 24,
      paddingBottom: 36
    },
    nameWrapper: {
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: 24
    },
    userIDWrapper: {
      display: 'flex',
      flexDirection: 'column',
      paddingBottom: 24
    },
    titleText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.foregrounds.primary
    }
  })

export default UserEditScreen
