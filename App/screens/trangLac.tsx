import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Alert,
    Vibration,
    Modal,
    Pressable,
} from 'react-native';
import BottomBar from '../components/bottom-bar';

const TrangLac: React.FC = () => {
    const [count, setCount] = useState(20);
    const [showPopup, setShowPopup] = useState(false);
    const [luckyCode, setLuckyCode] = useState('');
    const [reward, setReward] = useState('');

    // Hàm xử lý khi nhấn nút lắc
    const handlePress = (num: number) => {
        if (count >= num) {
            // Tạo mã số may mắn ngẫu nhiên
            const newLuckyCode = `MBAT ${Math.floor(100000 + Math.random() * 900000)}`;
            setLuckyCode(newLuckyCode);
            setReward('1 Chỉ vàng PNJ 9.999'); // Phần thưởng cố định (có thể thay đổi)

            setTimeout(() => {
                Vibration.vibrate(500); // Rung trong 500ms
                setShowPopup(true); // Hiển thị popup
            }, 500);

            setCount(count - num); // Giảm số lượt lắc
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
                <TouchableOpacity onPress={() => handlePress(1)}>
                    <Image source={require('../assets/lac1.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePress(10)}>
                    <Image source={require('../assets/lac10.png')} />
                </TouchableOpacity>
            </View>

            {/* Popup hiển thị kết quả */}
            <Modal
                visible={showPopup}
                transparent
                animationType="fade"
                onRequestClose={() => setShowPopup(false)}
            >
                <View style={styles.popupOverlay}>
                    <View style={styles.popup}>
                        <Text style={styles.popupTitle}>LỘC TỚI NGẬP TRÀN</Text>
                        <Text style={styles.popupReward}>{reward}</Text>
                        <Text style={styles.popupCode}>{luckyCode}</Text>
                        <Text style={styles.popupCount}>1/{count + 1}</Text>
                        <Text style={styles.popupMessage}>
                            Chúc mừng thánh lắc, rinh lộc mắt tay anh em ơi! Tích cực săn thêm lượt lắc thôi nào!
                        </Text>
                        <Pressable
                            style={styles.buttonClose}
                            onPress={() => setShowPopup(false)}
                        >
                            <Text style={styles.buttonCloseText}>Đã nhận</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>

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
        color: '#C2030B',
    },
    popupOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    popup: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
    },
    popupTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#E63B2E',
        marginBottom: 8,
    },
    popupReward: {
        fontSize: 16,
        color: '#E0633A',
        marginBottom: 4,
    },
    popupCode: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 4,
    },
    popupCount: {
        fontSize: 14,
        color: '#888',
        marginBottom: 12,
    },
    popupMessage: {
        fontSize: 14,
        textAlign: 'center',
        color: '#444',
        marginBottom: 16,
    },
    buttonClose: {
        backgroundColor: '#E63B2E',
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    buttonCloseText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default TrangLac;
