import { Stack } from "expo-router"

type Props = {}
const Layout = (props: Props) => {
    return <Stack
        screenOptions={{
            headerShown: false
        }}

    >
        <Stack.Screen name="auth" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="signUp" />
    </Stack>

}
export default Layout