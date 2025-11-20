import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import {
  launchImageLibrary,
  MediaType,
  Asset,
  ImagePickerResponse,
} from 'react-native-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import type {
  DocumentPickerResult,
  DocumentPickerAsset,
} from 'expo-document-picker';
import Video from 'react-native-video';
import { colors } from '@/utils/color';
import { NavHead } from '@/components/HeadRoute';
import { useLocalSearchParams } from 'expo-router';
import { useGetLesson } from '@/api/communities/lessons/getLesson';
import { uploadLessonMedia } from '@/api/communities/lessons/uploadMedia';

// Unified type for any file/media selected
interface MediaFile {
  uri: string;
  type: string;
  name: string;
  size?: number;
}

const CreateLesson = () => {
  const [title, setTitle] = useState<string>('Introduction');
  const [media, setMedia] = useState<MediaFile | null>(null);
  const [text, setText] = useState<string>('');
  const lessonID = useLocalSearchParams().lessonId as string;
  const moduleID = useLocalSearchParams().moduleId as string;
  const moduleTitle = useLocalSearchParams().moduleTitle;
  const { data: lessonData, isLoading } = useGetLesson(lessonID, moduleID);
  const [loading, setLoading] = useState(false);

  // ✅ Normalizes both picker results (ImagePicker + DocumentPicker)
  const handleMediaSelected = (file: Asset | DocumentPickerAsset) => {
    let unified: MediaFile | null = null;

    // Handle files from react-native-image-picker
    if ('fileName' in file) {
      const fileType = file.type ?? 'application/octet-stream';

      // Better video detection for image picker
      const isVideo =
        fileType.startsWith('video/') ||
        (file.type === undefined && file.uri?.includes('.mp4')) ||
        (file.type === undefined && file.uri?.includes('.mov'));

      unified = {
        uri: file.uri ?? '',
        type: isVideo
          ? 'video'
          : fileType.startsWith('image/')
            ? 'image'
            : 'document',
        name: file.fileName ?? 'unknown',
        size: file.fileSize ?? undefined,
      };
    }
    // Handle files from expo-document-picker
    else if ('name' in file && 'uri' in file) {
      const fileType = (file.mimeType as string) ?? 'application/octet-stream';

      unified = {
        uri: file.uri,
        type: fileType.startsWith('video/')
          ? 'video'
          : fileType.startsWith('audio/')
            ? 'audio'
            : fileType.startsWith('image/')
              ? 'image'
              : 'document',
        name: file.name,
        size: file.size ?? undefined,
      };
    }

    if (!unified) {
      console.warn('Unknown file type selected');
      return;
    }

    console.log('Selected media:', unified); // Debug log
    setMedia(unified);
  };

  // ✅ Opens file picker for images or videos
  const pickMediaFromLibrary = () => {
    const options = {
      mediaType: 'mixed' as MediaType,
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
      videoQuality: 'high' as const,
    };

    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled media picker');
      } else if (response.errorCode) {
        Alert.alert('Error', `Failed to pick media: ${response.errorMessage}`);
      } else if (response.assets && response.assets[0]) {
        handleMediaSelected(response.assets[0]);
      }
    });
  };

  const pickDocumentsOrAudio = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*', // allows any file type
        multiple: false,
        copyToCacheDirectory: true,
      });

      // Explicit type guard for "cancel" or "success"
      if ('type' in result && result.type === 'cancel') {
        console.log('User cancelled document picker');
        return;
      }

      // Handle newer vs. older result structure
      const file: DocumentPickerAsset | undefined = Array.isArray(
        (result as any).assets,
      )
        ? (result as any).assets[0]
        : (result as any);

      if (file?.uri) {
        handleMediaSelected(file);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  // ✅ Unified upload handler
  const handleUploadPress = () => {
    Alert.alert(
      'Choose Media Type',
      'Select the type of file you want to upload',
      [
        { text: 'Photos & Videos', onPress: pickMediaFromLibrary },
        { text: 'Documents & Audio', onPress: pickDocumentsOrAudio },
        { text: 'Cancel', style: 'cancel' },
      ],
    );
  };

  const handleUpdateForm = async () => {
    if (!media) {
      Alert.alert('Error', 'Please select a media file first');
      return;
    }
    setLoading(true);
    try {
      const result = await uploadLessonMedia(moduleID, lessonID, media);

      setLoading(false);
      Alert.alert('Success', 'Lesson updated!');
      console.log('Updated Lesson:', result);
    } catch (error: any) {
      console.log('Update Error:', error?.response?.data);
      Alert.alert('Error', 'Could not update lesson');
    }
  };

  // ✅ Dynamic file preview
  const renderMediaPreview = () => {
    if (!media) return null;

    switch (media.type) {
      case 'image':
        return (
          <Image source={{ uri: media.uri }} style={styles.mediaPreview} />
        );
      case 'video':
        return (
          <View style={styles.videoContainer}>
            {media.uri ? (
              <Video
                source={{ uri: media.uri }}
                style={styles.videoPreview}
                paused={true}
                resizeMode="cover"
                onError={(error) => console.log('Video Error:', error)}
              />
            ) : null}
            <Text style={styles.videoIcon}>▶️</Text>
          </View>
        );
      case 'audio':
        return (
          <View style={styles.audioContainer}>
            <Text style={styles.audioIcon}>🎵</Text>
            <Text style={styles.audioText}>{media.name}</Text>
          </View>
        );
      default:
        return (
          <View style={styles.documentContainer}>
            <Text style={styles.documentIcon}>📄</Text>
            <Text style={styles.documentName} numberOfLines={2}>
              {media.name}
            </Text>
          </View>
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <NavHead text={moduleTitle} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}

        <View style={styles.header}>
          <View style={styles.header}>
            <Text style={{ fontSize: 20, fontWeight: '700' }}>
              {isLoading ? '...' : lessonData.name}
            </Text>
            <Text style={{ fontSize: 14, color: '#555', marginTop: 4 }}>
              Course type:{' '}
              <Text style={{ textDecorationLine: 'underline', color: '#000' }}>
                Self-paced
              </Text>
            </Text>
          </View>
        </View>

        {/* Update Form Button */}
        {/* <TouchableOpacity style={styles.updateButton}>
          <Text style={styles.updateButtonText}>
            Click to update your form or upload to know.
          </Text>
        </TouchableOpacity> */}

        {/* Upload Section */}
        <TouchableOpacity
          style={styles.uploadSection}
          onPress={handleUploadPress}
        >
          <View style={styles.uploadContent}>
            {media ? (
              <>
                {renderMediaPreview()}
                <Text style={styles.mediaName} numberOfLines={1}>
                  {media.name}
                </Text>
                <Text style={styles.changeMediaText}>Tap to change media</Text>
              </>
            ) : (
              <View style={{ gap: 8, alignItems: 'center' }}>
                <Text style={styles.uploadIcon}>📁</Text>
                {lessonData?.media ? (
                  <Text style={styles.uploadSubtext}>{lessonData?.media}</Text>
                ) : (
                  <Text style={styles.uploadSubtext}>
                    Videos, audio, images, documents
                  </Text>
                )}
              </View>
            )}
            <Text style={styles.uploadText}>Upload media</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleUpdateForm}
          style={{
            marginTop: 25,
            width: '100%',
            height: 45,
            backgroundColor: colors.primary,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: colors.white }}>
            {loading ? 'Saving....' : 'Save'}
          </Text>
        </TouchableOpacity>
        {/* 
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            multiline
            numberOfLines={6}
            placeholder="Type your content here..."
            value={text}
            onChangeText={setText}
            textAlignVertical="top"
          />
        </View> */}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 25,
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  lessonText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  titleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    borderBottomWidth: 2,
    borderBottomColor: '#007AFF',
    paddingVertical: 5,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  stepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
    color: '#007AFF',
  },
  stepText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  updateButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  uploadSection: {
    borderWidth: 2,
    borderColor: colors.purpleShade,
    borderStyle: 'dashed',
    borderRadius: 10,
    padding: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  uploadContent: {
    alignItems: 'center',
    width: '100%',
  },
  uploadIcon: {
    fontSize: 14,
  },
  uploadText: {
    fontSize: 16,
    color: colors.primary,
    fontWeight: '500',
    marginBottom: 5,
    padding: 6,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 50,
    borderColor: colors.purpleShade,
    marginTop: 10,
  },
  uploadSubtext: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  mediaPreview: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 10,
  },
  videoContainer: {
    position: 'relative',
    width: 120,
    height: 120,
    borderRadius: 8,
    backgroundColor: '#000',
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPreview: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  videoIcon: {
    position: 'absolute',
    fontSize: 24,
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    maxWidth: 200,
  },
  audioIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  audioText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  documentContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    width: '100%',
    maxWidth: 150,
  },
  documentIcon: {
    fontSize: 32,
    marginBottom: 5,
  },
  documentName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
  },
  mediaName: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginBottom: 5,
    textAlign: 'center',
    maxWidth: '100%',
  },
  changeMediaText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  textInputContainer: {
    marginBottom: 20,
  },
  startTypingLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: 'top',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
});

export default CreateLesson;
