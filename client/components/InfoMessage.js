import React from 'react';
import { View } from 'react-native';
import { Chip, Text } from "@rneui/themed";

export default function InfoMessage({ message, timestamp }) {
    return (
        <View style={{ alignSelf: 'center', flexDirection: 'row', alignItems: 'center' }}>
            <Chip type='outline' >
                <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                    <Text>{message}</Text>
                    <Text style={{ alignSelf: 'center' }}>{timestamp}</Text>
                </View>
            </Chip>
        </View >
    );
}
