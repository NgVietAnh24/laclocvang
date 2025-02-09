import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, Alert, Vibration } from 'react-native';
import BottomBar from '../components/bottom-bar';
import Shake from 'react-native-shake';

const TrangLac: React.FC = () => {
    const [count, setCount] = useState(10);
    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        // Lắng nghe sự kiện lắc điện thoại
        const shakeListener = Shake.addListener(() => {
            if (!isShaking) {
                setIsShaking(true);
                handleShake();
            }
        });

        return () => {
            shakeListener.remove();
        };
    }, [isShaking]);

    // Hàm xử lý khi nhấn nút và bắt đầu rung lắc
    const handlePress = () => {
        Alert.alert("Bắt đầu lắc!", "Hãy lắc điện thoại của bạn!");
        setIsShaking(false);
    };

    // Hàm xử lý khi điện thoại lắc
    const handleShake = () => {
        if (count > 0) {
            Vibration.vibrate(500); // Rung trong 500ms
            setCount(count - 1);
            Alert.alert("Lắc thành công!", `Bạn còn ${count - 1} lượt lắc.`);
        } else {
            Alert.alert("Hết lượt lắc!", "Bạn không thể lắc thêm.");
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.background} source={require('../assets/trang-lac.png')} />
            <Text style={styles.paragraph}>
                Bạn có <Text style={styles.count}>{count}</Text> lượt lắc
            </Text>
            <View style={styles.grBtn}>
                <TouchableOpacity onPress={handlePress}>
                    <Image source={require('../assets/lac1.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePress}>
                    <Image source={require('../assets/lac10.png')} />
                </TouchableOpacity>
            </View>
            <BottomBar />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    paragraph: {
        marginTop: '145%',
        fontSize: 16,
        fontWeight: '700',
        lineHeight: 24,
        textAlign: 'center',
    },
    background: {
        resizeMode: 'cover',
        position: 'absolute',
        right: '-2%',
    },
    grBtn: {
        alignItems: 'center',
    },
    count: {
        fontSize: 24,
        fontWeight: '700',
        lineHeight: 24,
        textAlign: 'center',
        color: '#C2030B'
    },
});

export default TrangLac;
