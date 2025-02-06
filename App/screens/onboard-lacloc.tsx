import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


const OnboardLacLoc: React.FC = () => {

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/bacground.png')} />
            <View style={styles.header}>
                <TouchableOpacity style={{ right: '10%' }}><Image source={require('../assets/back.png')} /></TouchableOpacity>
                <Image style={styles.img2} source={require('../assets/huongdan.png')} />
            </View>
            <Image source={require('../assets/img-laclocvang.png')} />
            <Image style={{ width: 40, height: 20, resizeMode: 'contain', bottom: '5%' }} source={require('../assets/tranfer.png')} />
            <View style={styles.group}>
                <Image style={{ position: 'absolute' }} source={require('../assets/nen.png')} />
                <Text style={styles.textNen}>Lắc chắt chiu từng lượt
                    Nhận ngay 1 phần quà

                    Lắc tới bến chục lượt
                    Nhận một lúc 10 phần quà!</Text>
            </View>
            <Image style={styles.btn2} source={require('../assets/btn2.png')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        zIndex: 0,
    },
    img2: {

    },
    btn2: {
        top: '7%'
    },
    textNen: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 19,
        width: 230,
        textAlign: 'center'
    },
    header: {
        flexDirection: 'row',
        right: '7%',
        bottom: '5%',
    },
    group: {
        justifyContent: 'center',
        alignItems: 'center',

    },
});

export default OnboardLacLoc;
