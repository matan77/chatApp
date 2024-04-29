import React, { useEffect, useRef, useState } from "react";
import { View, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Input, Icon } from "@rneui/themed";
import Message from './Message';
import socket from "../utils/socket";
import InfoMessage from "./InfoMessage";



const windowHeight = Dimensions.get('window').height;

export default function ChatScreen({ navigation, route }) {
    const { username } = route.params;
    const [msg, setMsg] = useState('');
    const [messages, setMessages] = useState([]);
    const inputRef = useRef(null);
    const scrollViewRef = useRef(null);


    useEffect(() => {
        const unsubscribe = navigation.addListener('beforeRemove', () => {

            socket.removeAllListeners();
            socket.disconnect();
        });

        return unsubscribe;
    }, [navigation]);


    useEffect(() => {
        socket.connect();
        socket.emit('userConnected', { username });


        socket.on('message', newMessage => {
            setMessages(prevMessages => [...prevMessages, newMessage]);
        });

        socket.on('userConnected', ({ username, timestamp }) => {
            setMessages(prevMessages => [...prevMessages, { message: `${username} connected`, timestamp }]);
        });

        socket.on('userDisconnected', ({ username, timestamp }) => {
            setMessages(prevMessages => [...prevMessages, { message: `${username} disconnected`, timestamp }]);
        });


    }, []);

    const sendMessage = () => {
        if (msg !== '') {
            socket.emit('message', { message: msg });
            setMsg('');
            inputRef.current.focus();
        }
    };

    return (
        <View style={styles.container}>

            <ScrollView ref={scrollViewRef} style={styles.scrollView} onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}>
                {messages.map((msg, index) => {
                    if (msg.username) {
                        return (
                            <Message key={index} {...msg} isCurrentUser={username == msg.username} />
                        );
                    } else {
                        return (
                            <InfoMessage
                                key={index}
                                {...msg}
                            />
                        );
                    }
                })}
            </ScrollView>
            <View style={styles.inputContainer}>
                <Input
                    ref={inputRef}
                    value={msg}
                    rightIcon={<Icon name='send' onPress={sendMessage} size={30} />}
                    onChangeText={text => {
                        setMsg(text);
                    }}
                    placeholder='Send a message'
                    style={styles.input}
                />
            </View>

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        position: 'relative',
    },
    scrollView: {
        flex: 1,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingBottom: 5,
    },
    input: {
        flex: 1,
        height: windowHeight * 0.08,
    },
});
