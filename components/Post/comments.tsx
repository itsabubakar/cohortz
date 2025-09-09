import { CommentProp } from "@/types/commentType"
import { backgroundColor } from "@shopify/restyle"
import { View, StyleSheet, Text } from "react-native"

interface CommentType {
    prop: CommentProp
}
export const Comment: React.FC<CommentType> = ({prop}) => {
    return (
        <View style={styles.container} >
            <View style={{flexDirection: 'row', gap: 12, alignItems: 'center'}}>
                <View style={{width: 30, height: 30, borderRadius: 20, backgroundColor: '#40135B', marginBottom: 10}}></View>
                <Text style={{marginBottom: 6}}>John Doe</Text>
            </View>
            <Text>{prop.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderColor: '#f0f0f0',
        borderTopWidth: 1
    }
})