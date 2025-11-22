import { StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { Video, Audio } from 'expo-av';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Module = () => {
  const [title, setTitle] = useState<string | null>(null);
  const [media, setMedia] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [mediaUrl, titleText] = await Promise.all([
          AsyncStorage.getItem("media"),
          AsyncStorage.getItem("name")
        ]);
        setMedia(mediaUrl);
        setTitle(titleText);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Initialize audio mode for video playback
  useEffect(() => {
    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          shouldDuckAndroid: true,
        });
      } catch (error) {
        console.error('Error setting up audio:', error);
      }
    };

    setupAudio();
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#B085EF" />
          <Text>Loading video...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.videoSection}>
        {media ? (
          <Video
            source={{ uri: media }}
            style={styles.video}
            useNativeControls
            // resizeMode="contain"
            shouldPlay={false}
            isLooping={false}
          />
        ) : (
          <View style={styles.noVideoContainer}>
            <Text>No video available</Text>
          </View>
        )}
      </View>

      <View style={styles.contentSection}>
        <Text style={styles.title}>
          {title || 'Untitled Lesson'}
        </Text>
        <Text style={styles.description}>
          Create High-Fidelity Designs and Prototypes in Figma
        </Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => console.log('Mark as complete Pressed')}
        >
          <Text style={styles.buttonText}>Mark as complete</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => console.log('Next Pressed')}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Module; // Crucial: Default export

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoSection: {
    flex: 1,
  },
  video: {
    width: '100%',
    height: 300,
  },
  noVideoContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentSection: {
    padding: 16,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
  buttonContainer: {
    marginTop: 'auto',
    flexDirection: 'row',
    gap: 8,
    padding: 16,
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#B085EF',
    padding: 10,
    borderRadius: 10,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 10,
  },
});