import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import React, { useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

const BottomBar: React.FC = () => {
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

    const handlePress = (index: number) => {
        setSelectedIndex(index);
    };

    const [fontsLoaded] = useFonts({
        'SVN-Cookies': require('../assets/fonts/SVN-Cookies.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.btnBar, selectedIndex === 0 && styles.selectedButton]}
                onPress={() => handlePress(0)}
            >
                <Image source={require('../assets/phone.png')} style={styles.icon} />
                <Text style={styles.label}>Lắc Lộc Vàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.btnBar, selectedIndex === 1 && styles.selectedButton1]}
                onPress={() => handlePress(1)}
            >
                <Image source={require('../assets/lixi.png')} style={styles.icon} />
                <Text style={styles.label}>Lì Xì Vàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.btnBar, selectedIndex === 2 && styles.selectedButton2]}
                onPress={() => handlePress(2)}
            >
                <Image source={require('../assets/kho-loc.png')} style={styles.icon} />
                <Text style={styles.label}>Kho Lộc</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    },
    btnBar: {
        width: '33.3%',
        height: '115%',
        alignItems: 'center',
        padding: 10,
    },
    selectedButton: {
        backgroundColor: '#FFD233',
        borderTopLeftRadius: 12,
    }, selectedButton1: {
        backgroundColor: '#FFD233',
    }, selectedButton2: {
        borderTopRightRadius: 12,
        backgroundColor: '#FFD233',
    },
    icon: {
        resizeMode: 'contain',
    },
    label: {
        fontSize: 14,
        fontWeight: '400',
        color: '#C2030B',
        lineHeight: 18,
        fontFamily: 'SVN-Cookies'
    },
});

export default BottomBar;