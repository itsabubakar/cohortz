import { Text, TextInput, View } from "react-native"
import { Button } from "../ui"
import { useState } from "react"
import { CommentPayload, createComment } from "@/api/comment"
import AsyncStorage from "@react-native-async-storage/async-storage"
interface FormProp {
  postId: string
}
export const CommentInput = ({postId}: FormProp) => {
    const [text, setText] = useState("")
    const [error, setError] = useState("")
    const handleSubmit = async ( )=> {
        const token = await AsyncStorage.getItem("authToken")
        if (!token) {
            console.error("no token")
            return
        }
        const payload: CommentPayload = {
            text: text.trim(),
            post_id: postId
        }
        try {
            const res = await createComment(payload, postId, token)
            console.log(res)
        }
        catch (err) {
            console.error(err)
        }
    }
    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 20,
            paddingHorizontal: 5
        }}>
            <TextInput
            value={text}
            onChangeText={setText}
                style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: "black",
                    width: 260
                }}
            />
            <Text
                onPress={handleSubmit}
                style={{
                padding: 10,
                backgroundColor: "#40135B",
                color: "white",
                borderRadius: 10
            }}>Send</Text>

        </View>
    )
}