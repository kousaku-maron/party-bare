import React, { useCallback, useMemo } from 'react'
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native'
import { RouteParams } from '../navigators/RouteProps'
import { useAuthState } from '../store/hooks'
import { useStyles, useColors, MakeStyles } from '../services/design'
import { useUser } from '../services/user'
import { useCertificateEditTools } from '../services/secure'
import { useModal } from '../services/modal'
import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { RoundedButton, Thumbnail } from '../components/atoms'
import { UploadCertificateModal } from '../components/organisms'
import { LoadingPage } from '../components/pages'
import { BottomTabLayout } from '../components/templates'

const UserScreen = () => {
  const navigation = useNavigation()
  const route = useRoute<RouteProp<RouteParams, 'User'>>()
  const { uid } = useAuthState()

  const styles = useStyles(makeStyles)
  const colors = useColors()

  const targetUserID = useMemo(() => {
    if (route.params?.userID) {
      return route.params.userID
    }
    return uid
  }, [route.params, uid])

  const isMy = useMemo(() => {
    if (route.params?.userID) {
      return route.params.userID === uid
    }
    return true
  }, [route.params, uid])

  const user = useUser(targetUserID)
  const modalTools = useModal()
  const { onChangeUpdateCertificateURL, currentCertificateURL, uploadCertificateURL, upload } = useCertificateEditTools(
    uid
  )

  const _pickCertificateImage = useCallback(async () => {
    const { cancelled, uri } = await onChangeUpdateCertificateURL()
    if (!cancelled && uri) {
      modalTools.onOpen()
    }
  }, [modalTools, onChangeUpdateCertificateURL])

  const onUpload = useCallback(() => {
    upload()
    modalTools.onClose()
  }, [modalTools, upload])

  const goToEdit = useCallback(() => {
    navigation.navigate('UserEdit')
  }, [navigation])

  const goToSetting = useCallback(() => {
    navigation.navigate('Setting')
  }, [navigation])

  if (!user) {
    return <LoadingPage />
  }

  return (
    <BottomTabLayout>
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.thumbnailWrapper}>
            <Thumbnail uri={user.thumbnailURL} size={150} />
          </View>

          <View style={styles.nameWrapper}>
            <Text style={styles.nameText}>{user.name}</Text>
          </View>

          <View style={styles.idWrapper}>
            <Text style={styles.idText}>@{user.userID}</Text>
          </View>

          {isMy && user.isAccepted && (
            <View style={styles.isAcceptedWrapper}>
              <Text style={styles.acceptCaptionText}>本人確認済み</Text>
            </View>
          )}

          {isMy && !user.isAccepted && (
            <View style={styles.isNotacceptedWrapper}>
              <RoundedButton color={colors.tints.primary.main} fullWidth={true} onPress={_pickCertificateImage}>
                <Text style={styles.acceptText}>身分証をアップロードする</Text>
              </RoundedButton>
            </View>
          )}

          {isMy && !user.isAccepted && (
            <View style={styles.acceptCaptionWrapper}>
              <Text style={styles.acceptCaptionText}>
                ※年齢確認のため、運転免許証もしくはパスポートをアップロードして下さい。
              </Text>
            </View>
          )}
        </View>

        {isMy && !user.isAccepted && currentCertificateURL && (
          <View style={styles.cardWrapper}>
            <View style={styles.card}>
              <Image style={styles.certificate} resizeMode="contain" source={{ uri: currentCertificateURL }} />
              <Text style={styles.acceptCaptionText}>※提出済み</Text>
            </View>
          </View>
        )}

        {isMy && (
          <TouchableOpacity style={styles.editFab} onPress={goToEdit}>
            <AntDesign color="gray" name="edit" size={24} />
          </TouchableOpacity>
        )}

        {isMy && (
          <TouchableOpacity style={styles.settingFab} onPress={goToSetting}>
            <AntDesign color="gray" name="setting" size={24} />
          </TouchableOpacity>
        )}

        <UploadCertificateModal
          isVisible={modalTools.isVisible}
          url={uploadCertificateURL}
          onClose={modalTools.onClose}
          onUpload={onUpload}
        />
      </View>
    </BottomTabLayout>
  )
}

// const hairlineWidth = StyleSheet.hairlineWidth

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
    settingFab: {
      position: 'absolute',
      right: 58,
      bottom: 24
    },
    profileContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 400
    },
    thumbnailWrapper: {
      paddingBottom: 12
    },
    nameWrapper: {
      paddingBottom: 3
    },
    idWrapper: {
      paddingBottom: 24
    },
    isAcceptedWrapper: {
      display: 'flex',
      justifyContent: 'center',
      paddingBottom: 24
    },
    isNotacceptedWrapper: {
      width: 250,
      paddingBottom: 3
    },
    acceptCaptionWrapper: {
      width: 250
    },
    cardWrapper: {
      paddingBottom: 24
    },
    card: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      padding: 24,
      borderRadius: Platform.OS === 'ios' ? 16 : 3,
      backgroundColor: colors.backgrounds.secondary
    },
    certificate: {
      width: 200,
      height: 200
    },
    nameText: {
      fontSize: 18,
      color: colors.foregrounds.primary
    },
    idText: {
      fontSize: 12,
      color: colors.foregrounds.secondary
    },
    acceptText: {
      fontSize: 14,
      color: colors.foregrounds.onTintPrimary
    },
    acceptCaptionText: {
      fontSize: 12,
      color: colors.foregrounds.secondary
    }
  })

export default UserScreen
