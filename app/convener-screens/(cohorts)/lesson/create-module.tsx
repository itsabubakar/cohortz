import * as DocumentPicker from 'expo-document-picker';
import { Back } from '@/assets/icons';
import { SafeAreaWrapper } from '@/HOC';

import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { Button } from '@rneui/themed';
import { colors } from '@/utils/color';
import { SlideModal } from '@/components/Modal';
import { OptionModal } from '@/components/optionModal';

type Props = {};

const Index = (props: Props) => {
  const [moduleModal, setModuleModal] = useState(false)
  const [optionModal, setOptionModal] = useState(0)
  const [lessonModal, setLessonModal] = useState(true)
  const handleModuleModal = () => {
    setModuleModal(!moduleModal)
  }
  const handleLessonModal = () => {
    setLessonModal(!lessonModal)
  }
  const openOptionModal =(modal: number) => {
    setOptionModal(modal)
  }
  // const router = useRouter();
  // const [video, setVideo] = useState<any>(null); // Store selected file info

  // const handlePickVideo = async () => {
  //   const result = await DocumentPicker.getDocumentAsync({
  //     type: 'video/*', // Only allow video files
  //     copyToCacheDirectory: true,
  //     multiple: false,
  //   });
  //   if (!result.canceled && result.assets && result.assets[0]) {
  //     setVideo(result.assets[0]); // Store video in state
  //   }
  // };

  // Utility to display file size in MB
  const formatSize = (size: number) => {
    if (!size) return '';
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (<ScrollView
   style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Modules</Text>
        <Text style={styles.courseType}>
          Course type: <Text style={styles.link}>Self-paced</Text>
        </Text>
      </View>

      {/* Top info bar */}
      <View style={styles.topInfo}>
        <Text style={styles.topInfoText}>
          <Text style={styles.bold}>1</Text> Modules • <Text style={styles.bold}>0</Text> contents
        </Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Add module</Text>
        </TouchableOpacity>
      </View>

      {/* Modules list */}
      <View style={styles.modulesContainer}>
        <Text style={styles.sectionTitle}>MODULES</Text>

        {/* Module */}
        <View style={styles.moduleItem}>
          <View style={styles.moduleHeader}>
            <Ionicons name="menu-outline" size={20} color="#000" />
            <Text style={styles.moduleName}>MODULE NAME</Text>
            <TouchableOpacity style={styles.addNew}>
              <Text style={styles.addNewText}>Add new</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleModuleModal}>
              
              <Ionicons name="ellipsis-vertical" size={18} color="#8E8E8E" />
            </TouchableOpacity>
          </View>

          {/* Lessons */}
          <View style={styles.lessonContainer}>
            {["Lesson name", "Lesson name", "Lesson name"].map((lesson, i) => (
              <View key={i} style={styles.lessonRow}>
                <Ionicons name="menu-outline" size={16} color="#8E8E8E" />
                <Text style={styles.lessonText}>{lesson}</Text>
                <TouchableOpacity onPress={handleLessonModal}>
                  
                  <Ionicons name="ellipsis-vertical" size={16} color="#8E8E8E" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <OptionModal
            isVisible={moduleModal}
            onBackdropPress={handleModuleModal}
          >
            <SafeAreaView style={{backgroundColor: "white", padding: 20, paddingTop: 40, borderTopEndRadius: 20, borderTopLeftRadius: 20, gap: 10}}>
              <Text onPress={() => openOptionModal(1)}>Rename Module</Text>
              <Text onPress={() => openOptionModal(2)}>Delete Module</Text>
            </SafeAreaView>

          </OptionModal>
          <OptionModal
            isVisible={moduleModal}
            onBackdropPress={handleModuleModal}
          >
            <SafeAreaView style={{backgroundColor: "white", padding: 20, paddingTop: 40, borderTopEndRadius: 20, borderTopLeftRadius: 20, gap: 10}}>
              <Text onPress={() => openOptionModal(1)}>Rename Module</Text>
              <Text onPress={() => openOptionModal(2)}>Delete Module</Text>
            </SafeAreaView>

          </OptionModal>
          <SlideModal
            isVisible={optionModal !== 0}
            onBackdropPress={() => {setOptionModal(0)}}
          >
            {optionModal === 1 && (
              
              <View style={{width: "100%", backgroundColor: "white", padding: 20, borderRadius: 8, paddingVertical: 30, gap: 32}}>
                <Text style={{fontSize: 20, fontWeight: 700, textAlign: 'center'}} >Rename Module</Text>
                <View style={{gap: 5}}>
                  <Text style={{fontWeight: 600}}>Title</Text>
                  <TextInput 
                  style={{borderWidth: 1, paddingHorizontal: 13, paddingVertical: 8, borderRadius: 8, borderColor: "grey" }}
                  placeholder='Module'/>
                </View>
                <TouchableOpacity style={{borderRadius: 50, padding: 12, backgroundColor: colors.primary}}>
                  <Text style={{color: colors.white, textAlign: "center"}}>Save Changes</Text>
                </TouchableOpacity>
              </View>
            )}
            {optionModal === 2 && (
              
              <View style={{width: "100%", backgroundColor: "white", padding: 10, borderRadius: 8, paddingBottom: 30, gap: 32}}>
                <Text style={{fontSize: 20, fontWeight: 700, textAlign: 'center'}} >Delete module</Text>
                <View style={{gap: 5, marginBottom: 20}}>
                  <Text>Are you sure you want to delete "Module 1" and allof it's lessons from this curriculum?</Text>
                </View>
                <View style={{gap: 10}}>
                  <TouchableOpacity style={{borderRadius: 50, padding: 12, backgroundColor: colors.red}}>
                    <Text style={{color: colors.white, textAlign: "center"}}>Confirm</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{borderRadius: 50, padding: 12, borderColor: colors.primary, borderWidth: 1}}>
                    <Text style={{textAlign: "center"}}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}


          </SlideModal>
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  
  modal: {
    justifyContent: "flex-end",
    margin: 0,
    backgroundColor: "transparent",
    height: "100%",
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
  },
  courseType: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  link: {
    textDecorationLine: "underline",
    color: "#000",
  },
  topInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  topInfoText: {
    fontSize: 15,
    color: "#000",
  },
  bold: {
    fontWeight: "700",
  },
  addButton: {
    backgroundColor: "#4B2E83",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  modulesContainer: {
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 13,
    color: "#8E8E8E",
    marginBottom: 12,
  },
  moduleItem: {
    marginBottom: 20,
  },
  moduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  moduleName: {
    flex: 1,
    fontWeight: "700",
    marginLeft: 8,
  },
  addNew: {
    backgroundColor: "#F5F2FB",
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginHorizontal: 8,
  },
  addNewText: {
    color: "#6B4AB0",
    fontSize: 13,
  },
  lessonContainer: {
    marginTop: 12,
    marginLeft: 28,
  },
  lessonRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  lessonText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 8,
  },
});