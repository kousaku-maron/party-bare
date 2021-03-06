import React from 'react'
import { View, Text, Image, StyleSheet, ImageSourcePropType, TouchableOpacity } from 'react-native'
import { useStyles, useColors, MakeStyles } from '../../services/design'
import { formatedDateFull } from '../../services/formatedDate'
import { AngularedButton } from '../atoms'

type Props = {
  uri: ImageSourcePropType
  name: string
  date: Date
  width: number
  partyID: string
  onPressDetail: () => void
  onPressEntry: () => void
  onPressGroups: () => void
}

const MaterialDesignCard: React.FC<Props> = props => {
  const styles = useStyles(makeStyles)
  const colors = useColors()

  const date = formatedDateFull(props.date)
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <TouchableOpacity onPress={props.onPressGroups}>
          <Image style={[styles.image, { width: props.width }]} source={props.uri} />
        </TouchableOpacity>
      </View>
      <View style={styles.description}>
        <View>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <AngularedButton
              color={colors.foregrounds.onTintPrimary}
              fullWidth={false}
              width={70}
              height={30}
              padding={6}
              onPress={props.onPressDetail}
            >
              <Text style={styles.buttonText}>詳細</Text>
            </AngularedButton>
          </View>
          <View style={styles.buttonWrapper}>
            <AngularedButton
              color={colors.foregrounds.onTintPrimary}
              fullWidth={false}
              width={70}
              height={30}
              padding={6}
              onPress={props.onPressEntry}
            >
              <Text style={styles.buttonText}>参加</Text>
            </AngularedButton>
          </View>
        </View>
      </View>
    </View>
  )
}

const makeStyles: MakeStyles = colors =>
  StyleSheet.create({
    container: {
      alignItems: 'flex-end',
      width: '100%',
      height: 285
    },
    imageWrapper: {
      width: '100%',
      height: '80%',
      overflow: 'hidden'
    },
    image: {
      width: '100%',
      height: '100%'
    },
    name: {
      color: colors.foregrounds.onTintPrimary,
      fontSize: 25,
      padding: 6,
      fontWeight: 'bold'
    },
    date: {
      color: colors.foregrounds.onTintPrimary,
      paddingRight: 6,
      paddingLeft: 6,
      paddingBottom: 6
    },
    description: {
      backgroundColor: colors.tints.primary.main,
      width: '100%',
      height: '20%',
      justifyContent: 'space-between',
      padding: 6,
      flexDirection: 'row',
      overflow: 'hidden'
    },
    buttonContainer: {
      alignItems: 'flex-end',
      flexDirection: 'row'
    },
    buttonWrapper: {
      padding: 3
    },
    buttonText: {
      fontSize: 18,
      color: colors.tints.primary.main
    }
  })

export default MaterialDesignCard
