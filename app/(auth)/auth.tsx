import { Dimensions, Pressable, StyleSheet, View } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { removeItem } from '@/utils/asyncStorage';
import Lottie from 'lottie-react-native';
import { Text, Theme } from '@/theme/theme';
import { PaddedView, SafeAreaWrapper } from '@/HOC';
import { Button } from '@/components/ui';
import { useTheme } from '@shopify/restyle';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { BottomSheetDefaultBackdropProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

const { width, height } = Dimensions.get('window');

type Props = {};

const Welcome = (props: Props) => {
  const theme = useTheme<Theme>();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleSheetChanges = useCallback((index: number) => {
    // Update state based on the index value
    console.log(index);
    // If index is greater than -1, sheet is active
  }, []);

  const handleBottomSheet = () => {};
  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const handleClick = async () => {
    await removeItem('onboarded');
  };

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => (
      <BottomSheetBackdrop
        opacity={1}
        style={{ backgroundColor: 'black' }}
        {...props}
      />
    ),
    [],
  );

  return (
    <SafeAreaWrapper>
      <View style={styles.container}>
        <PaddedView>
          <View style={styles.welcomeView}>
            <Text variant={'headerOne'} style={styles.header}>
              Welcome to Cohortz!
            </Text>
            <Text style={styles.subHeader}>
              Let's embark on your learning adventure together.
            </Text>
          </View>
          <View>
            <Lottie
              style={styles.lottie}
              source={require('../../assets/images/lottie.json')}
              autoPlay
              loop
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={openBottomSheet} text="Get Started" />
            <Text
              style={{ textAlign: 'center', marginTop: 16 }}
              variant="subheading"
            >
              Invited to Cohortz?{' '}
              <Text
                style={{
                  textDecorationLine: 'underline',
                }}
              >
                Accept Invitation
              </Text>
            </Text>
          </View>
        </PaddedView>
        <BottomSheet
          ref={bottomSheetRef}
          index={0} // Start fully collapsed
          snapPoints={[1, '50%', '30%']} // Adjust snap points
          onChange={handleSheetChanges}
          enablePanDownToClose // Allows swipe down to close
          backdropComponent={renderBackdrop}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Button
              style={{ marginTop: 16, marginBottom: 16 }}
              onPress={openBottomSheet}
              text="Log in"
            />
            <Button
              variant="secondary"
              onPress={openBottomSheet}
              text="sign up"
            />
          </BottomSheetView>
        </BottomSheet>
      </View>
    </SafeAreaWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    // alignItems: 'center',
    padding: 16,
    // justifyContent: 'center',
  },
  welcomeView: {
    marginTop: height * 0.066,
  },
  header: {
    textAlign: 'center',
  },
  subHeader: {
    paddingTop: 12,
    fontSize: 18,
    textAlign: 'center',
  },
  lottie: {
    width: width * 0.95,
    height: width,
  },
  buttonContainer: {
    marginTop: 80,
  },
});
