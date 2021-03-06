// import { Platform } from 'react-native'
import firebase from '../../repositories/firebase'
import * as AppAuth from 'expo-app-auth'

type Result = {
  success?: boolean
  cancelled?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
}

// const _config: AppAuth.OAuthProps = {
//   issuer: 'https://accounts.google.com',
//   scopes: ['openid', 'profile'],
//   clientId: Platform.OS === 'ios' ? process.env.GOOGLE_CLIENT_ID_FOR_IOS : process.env.GOOGLE_CLIENT_ID_FOR_ANDROID
// }

const config: AppAuth.OAuthProps = {
  issuer: 'https://accounts.google.com',
  scopes: ['openid', 'profile'],
  clientId: '1006598708094-jlp1jtjdsg359pqfush1l6sn3tke39o6.apps.googleusercontent.com'
}

export const signInGoogle = async (): Promise<Result> => {
  try {
    console.info(config)
    const authState = await AppAuth.authAsync(config)
    console.info(authState.idToken)

    if (!authState.idToken) {
      return { cancelled: true }
    }

    const credential = firebase.auth.GoogleAuthProvider.credential(authState.idToken)

    firebase
      .auth()
      .signInWithCredential(credential)
      .catch(error => {
        throw new Error(error)
      })

    return { success: true }
  } catch (e) {
    console.warn(e)
    return { error: e }
  }
}
