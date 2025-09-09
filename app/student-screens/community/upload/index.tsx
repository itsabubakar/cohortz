import { SafeAreaWrapper } from "@/HOC";
import { Text } from "@/theme/theme";
import { Picker } from "@react-native-picker/picker";
import { Link } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const uploadPost = () => {
    return (
        <SafeAreaWrapper>
            <View style={{ marginVertical: 16 }}>
                <Link href="/(auth)/login" style={{ color: '#B085EF', fontSize: 18, fontWeight: '600' }}>
                Back
                </Link>
                <Link href={"/student-screens/community/upload"} style={{ position: 'absolute', right: 0, top: 0, padding: 8, borderRadius: 8, backgroundColor: '#E9D7FE' }}>
                <Text style={{fontWeight: 700}}>Upload</Text>
                </Link>
            </View>

            {/* Content */}
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text>Select Cohort</Text>
                <Picker style={{
                    borderWidth: 1, borderRadius: 4, borderColor: "black"
                }}>
                    <Picker.Item label="Web Design" value="web design"/>
                    <Picker.Item label="Digital Marketing" value="web design"/>
                    <Picker.Item label="AI And Machine Learning" value="web design"/>
                </Picker>

                <TextInput 
                    numberOfLines={6}
                    multiline={true}
                    textAlignVertical="top"
                    style={{borderWidth: 2, borderColor: "grey"}}
                />
                
            </ScrollView>

        </SafeAreaWrapper>
    )
}

export default uploadPost;