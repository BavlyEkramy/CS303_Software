import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const OptionItem = ({ icon, size, value }) => {
    return (
        <View style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            marginTop: 10,
        }}>
            <Ionicons name={icon} size={10 * size} color="black" />
            <Text style={{ fontSize:16,fontWeight:500 }} >{value}</Text>
        </View>
    );
}

const styles = StyleSheet.create({})

export default OptionItem;
