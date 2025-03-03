import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';

interface textInputUserProps {
    title: string;
    value: string;
    color?: string;
    width?: number;
    borderColor?: string;
    keyBoardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad' | 'decimal-pad' | 'visible-password';
    placeholder?: string;
    onChangeText: (text: string) => void;


}

const TextInputUser: React.FC<textInputUserProps> = ({ title, value, keyBoardType = 'default', placeholder, width, color, borderColor, onChangeText }) => {
    return (
        <View style={{ top: 22 }}>
            <Text style={styles.textTitle}>{title}<Text style={{ color: color }} >*</Text></Text>
            <TextInput
                style={[styles.textInput, { width: width, borderColor: borderColor, borderWidth: borderColor ? 1.5 : 0 }]}
                value={value}
                placeholder={placeholder}
                onChangeText={onChangeText}
                keyboardType={keyBoardType}
            />
        </View >
    );
}

const styles = StyleSheet.create({
    textTitle: {
        fontSize: 14,
        lineHeight: 18.83,
        fontWeight: '500',
        color: '#FFF',
        paddingBottom: '1%',
    },
    textInput: {
        height: 40,
        borderRadius: 8,
        backgroundColor: '#FFF',
        paddingHorizontal: '1%',
        // bottom: '1%',
    },
})

export default TextInputUser;
