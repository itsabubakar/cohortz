import AsyncStorage from "@react-native-async-storage/async-storage"

const apiURL = process.env.EXPO_PUBLIC_API_URL;
const postLesson = async(communityId: number, moduleId: number) => {
    const token = await AsyncStorage.getItem("authToken")
    try {
        const response = await axios.post()
    }
}