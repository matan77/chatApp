import { View } from "react-native";
import { CheckBox, useThemeMode } from "@rneui/themed";



export default function ThemeBtn({ style }) {

    const { mode, setMode } = useThemeMode();

    return <View style={{ style }}>
        <CheckBox
            containerStyle={{ backgroundColor: 'transparent' }}
            checked={mode == 'dark'}
            iconType="material"
            checkedIcon="sunny"
            uncheckedIcon="dark-mode"

            uncheckedColor="black"
            checkedColor="white"
            onPress={() => {
                setMode(mode == 'dark' ? 'light' : 'dark');
            }}
        />
    </View>;
}