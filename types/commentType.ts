export interface CommentProp {
    text: string;
    post_id: string;
    media_1?: string;
    user?: {
        first_name: string;
        last_name: string;

    }
}