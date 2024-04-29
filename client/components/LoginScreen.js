import React, { useEffect, useRef, useState } from "react";
import { View, Dimensions, StyleSheet } from "react-native";
import { Input, Button, Icon, Avatar } from "@rneui/themed";
import colorHash from "../utils/colorHash";


export default function LoginScreen({ navigation, route }) {
    const [username, setUsername] = useState('');
    const inputRef = useRef(null);
    const [errorMessage, setErrorMessage] = useState('');
    const screenWidth = Dimensions.get('window').width;

    const handleLogin = () => {
        if (username.trim() === '') {
            inputRef.current.shake();
            setErrorMessage('No username entered');
        } else {
            setUsername('');
            navigation.navigate('Chat', { username: username.trim() });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <Avatar
                    size={64}
                    rounded
                    title={username === '' ? '' : username.charAt(0).toUpperCase()}
                    containerStyle={username === '' ? styles.avatarContainer : { backgroundColor: colorHash(username) }}
                />
                <Input
                    ref={inputRef}
                    value={username}
                    errorMessage={errorMessage}
                    leftIcon={<Icon name='person' size={20} />}
                    onChangeText={text => {
                        setUsername(text);
                        setErrorMessage('');
                    }}
                    placeholder='Enter your username'
                    style={styles.input}
                />
                <Button title="Enter Chat" onPress={handleLogin} style={styles.button} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "flex-end"
    },

    loginContainer: {
        flex: 1,
        alignSelf: "center",
        alignItems: 'center',
        justifyContent: "center",
        width: '70%',
    },
    avatarContainer: {
        backgroundColor: '#d3d3d3',
    },
    input: {
        marginVertical: 10,
    },
    button: {
        marginTop: 20,
    },
});

