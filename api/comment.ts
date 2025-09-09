import axios from "axios"

export type CommentPayload = {
    text: string;
    post_id: string;
    media_1?: string;
}

const apiURL = process.env.EXPO_PUBLIC_API_URL;

export async function createComment(payload:CommentPayload, id: string, token: string) {
    const response = await axios.post(`${apiURL}/v1/post/${id}/comments`, 
        payload,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        }
    );
    return response.data
}