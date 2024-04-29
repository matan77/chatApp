import { useTheme } from "@rneui/themed";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from "./LoginScreen";
import ChatScreen from "./ChatScreen";
import ThemeBtn from "./ThemeBtn";

const Stack = createNativeStackNavigator();

export default function Navigation({ }) {
    const { theme } = useTheme();

    return (
        <NavigationContainer
            theme={{
                colors: {
                    primary: theme.colors.primary,
                    background: theme.colors.background,
                    card: theme.colors.white,
                    text: theme.colors.black,
                },
                dark: theme.mode === 'dark',
            }}
        >
            <Stack.Navigator initialRouteName="Login" screenOptions={{
                headerStyle: { backgroundColor: theme.colors.background }, headerRight: () => (
                    <ThemeBtn />
                )
            }} >
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Chat" component={ChatScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};