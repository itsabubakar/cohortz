import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { removeItem } from '@/utils/asyncStorage'

type Props = {}

const Welcome = (props: Props) => {
  const handleClick = async () => {
    await removeItem('onboarded')
  }
  return (
    <SafeAreaView>
    <View>
      <View>
      <Text style={styles.header}>Welcome to Cohortz!</Text>
      <Text style={styles.subHeader}>Let's embark on your learning adventure together.</Text>
      </View>
      <View>
        <TouchableOpacity onPress={handleClick}>
          <Text>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  )
}

export default Welcome

const styles = StyleSheet.create({
  header:{
    fontSize: 36,
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 24,
    textAlign: 'center',
  }
})