import React from 'react'
import { ActivityIndicator, View } from 'react-native'

export const LoadingScreen = () => {
    return (
        <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <ActivityIndicator color="orange" size={50} />
        </View>
    );
};
