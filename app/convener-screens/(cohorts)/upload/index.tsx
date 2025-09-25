import { SafeAreaWrapper } from "@/HOC";
import { Text } from "@/theme/theme";
import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";
import { useState } from "react";

import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

const uploadPost = () => {
    const [modal, setModal] = useState(true)

    const handleModal = () => {
        setModal(!modal)
    }


    return (
        <>
        <SafeAreaWrapper>
            <View style={{ marginVertical: 16 }}>
                <Link href="/(auth)/login"  style={{ color: '#B085EF', fontSize: 18, fontWeight: '600' }}>
                    X <Text className="text-white">kksdw</Text>
                </Link>
            </View>

            {/* Content */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <Picker style={{
                    borderWidth: 1, borderRadius: 4, borderColor: "black", width: 140
                }}>
                    <Picker.Item label="Everyone" value="web design"/>
                    <Picker.Item label="Cohorts Only" value="web design"/>
                </Picker>

                <TextInput className=""
                    numberOfLines={6}
                    multiline={true}
                    textAlignVertical="top"
                    style={{}}
                    placeholder="Write your post here"
                />
                
            </ScrollView>
            <View style={{position: "fixed", bottom: 1, paddingHorizontal: 5, paddingVertical: 4,  }}>
                <Text>Everyone can reply </Text>
                
                <Link href={"/student-screens/community/upload"} style={{ position: 'absolute', right: 0, top: 0, padding: 8, borderRadius: 8, backgroundColor: '#E9D7FE' }}>
                    <Text style={{fontWeight: 700, padding: 4 }}>Upload</Text>
                </Link>
            </View>

        </SafeAreaWrapper>
        
            {modal && (
                <TouchableOpacity
                    onPress={handleModal}
                    style={{width: "100%", height: "100%", backgroundColor: "black"}}>
                    <View style={{ position: "absolute", bottom: 1, zIndex: 40, minHeight: 376, paddingTop: 20, paddingHorizontal: 10, width: "100%", backgroundColor: "grey"}}>
                        <Text style={{fontSize: 24, fontWeight: 700, textAlign: "center"}}>Choose Audience</Text>
                        <View>
                            <Text>Everyone</Text>
                        </View>

                        <View style={{gap: 3}} >
                            <Text style={{fontWeight: 600}} >My Communities</Text>
                            <View style={{gap: 6}}>
                                <View style={{flexDirection: "row", alignItems: "center", gap: 3}}>
                                    <View style={styles.profileImage} />
                                    <View>
                                        <Text>Branding</Text>
                                        <Text style={{ fontSize: 12 }}>500 memebers</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: "row", alignItems: "center", gap: 3}}>
                                    <View style={styles.profileImage} />
                                    <View>
                                        <Text>Branding</Text>
                                        <Text className="" >500 memebers</Text>
                                    </View> 
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )}</>
    )
}

export default uploadPost;

const styles = StyleSheet.create({
  profileImage: {
    height: 40,
    width: 40,
    backgroundColor: '#F2750D',
    borderRadius: 8,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
});
