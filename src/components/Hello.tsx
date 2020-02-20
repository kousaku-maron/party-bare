import React, { useState } from 'react'
import { View, Text } from 'react-native'

const Hello = (): JSX.Element => {
  const [message] = useState<string>('hello world')

  return (
    <View>
      <Text>{message}</Text>
    </View>
  )
}

export default Hello
