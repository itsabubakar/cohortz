import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper'
import Lottie from 'lottie-react-native'
import {  useRouter } from 'expo-router'
import { setItem } from '@/utils/asyncStorage'
const {width, height} = Dimensions.get('window')

type Props = {}

const OnBoarding = (props: Props) => {
    const router = useRouter()

  const handleDone = () => {
    router.replace('/(auth)/auth')
    setItem('onboarded', 'true')
  }

  const handleSkip = () => {
    router.replace('/(auth)/auth')
    setItem('onboarded', 'true')
  }

  const doneDutton = ({...props}) => {
    return <TouchableOpacity style={styles.doneButton} {...props} >
      <Text >Done</Text>
    </TouchableOpacity>
  }

  return (
    <View style={styles.container}>
      <Onboarding
        onSkip={handleSkip}
        onDone={handleDone}
        DoneButtonComponent={doneDutton}
        bottomBarHighlight={false}
        containerStyles={{
          paddingHorizontal: 16,
          flex: 1,
        }}
        pages={
          [
            {
              backgroundColor: '#87CEEB',
              image: (
                <View style={styles.content}>
                  <Text style={styles.header}>Learn and network at the same time!</Text>
                  <Lottie style={styles.lottie} source={require('../../assets/images/lottie.json')} autoPlay loop 
                  />
                  <Text style={styles.subheading}>Invited to Cohortz? Accept invitation.</Text>
                </View>
              ),
              title: '',
              subtitle: '',
            },
            {
              backgroundColor: '#98FF98',
              image: (
                <View>
                  <Text style={styles.header}>You can be a Convener</Text>
                  <Lottie style={styles.lottie} source={require('../../assets/images/lottie.json')} autoPlay loop 
                  />
                </View>
              ),
              title: '',
              subtitle: '',
            },
            {
              backgroundColor: '#fef3c7',
              image: (
                <View>
                  <Text style={styles.header}>A Creator</Text>

                  <Lottie style={styles.lottie} source={require('../../assets/images/lottie.json')} autoPlay loop 
                  />
                </View>
              ),
              title: '',
              subtitle: '',
            },
            {
              backgroundColor: '#bada55',
              title: '',
              image: (
                <View>
                  <Text style={styles.header}>Or a Student</Text>

                  <Lottie style={styles.lottie} source={require('../../assets/images/lottie.json')} autoPlay loop 
                  />
                </View>
              ),
              subtitle: '',
            },
          ]
        }
      
      
      />
    </View>
  )
}

export default OnBoarding

const styles = StyleSheet.create({
  content: {
    height: '100%',
    marginTop: 200,
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'DMSansSemiBold',
  },
  subheading:{
fontSize:14,
fontFamily: 'DMSansRegular',
    textAlign: 'center',
    marginTop: 250,
  },
  container :{
    flex: 1,
    backgroundColor: 'white',
  },
  lottie: {
    width: width*0.95,
    height: width,
  },
  doneButton :{
    paddingHorizontal: 20,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: 'white',
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100
  }
})