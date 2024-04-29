import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, useTheme } from "@rneui/themed";
import colorHash from "../utils/colorHash";

export default function Message({ username, message, timestamp, isCurrentUser }) {
    const containerStyle = isCurrentUser ? styles.containerCurrentUser : styles.containerOtherUser;
    const alignStyle = isCurrentUser ? styles.alignLeft : styles.alignRight;
    const { theme } = useTheme();

    return (
        <View style={[styles.container, containerStyle]}>
            {!isCurrentUser && (
                <View style={styles.avatarContainer}>
                    <Avatar
                        size={25}
                        rounded
                        title={username.charAt(0).toUpperCase()}
                        containerStyle={{ backgroundColor: colorHash(username) }}
                    />
                </View>
            )}
            <View style={[styles.messageContainer, alignStyle, { backgroundColor: theme.colors.secondary }]}>
                {!isCurrentUser && <Text style={styles.username}>{username}</Text>}
                <Text style={styles.message}>{message}</Text>
                <Text style={styles.timestamp}>{timestamp}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "flex-end",
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    avatarContainer: {
        alignSelf: 'flex-start'
    },
    containerCurrentUser: {
        justifyContent: "flex-end",
    },
    containerOtherUser: {
        justifyContent: "flex-start",
    },
    messageContainer: {
        maxWidth: "70%",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginLeft: 8,
        marginRight: 8,
    },
    alignLeft: {
        alignSelf: "flex-start",
    },
    alignRight: {
        alignSelf: "flex-end",
    },
    username: {
        fontWeight: "bold",
        marginBottom: 4,
    },
    message: {
        fontSize: 16,
    },
    timestamp: {
        fontSize: 12,
        color: "#666",
        marginTop: 4,
        textAlign: "right",
    },
});


