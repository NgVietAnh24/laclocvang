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
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';

type Props = NativeStackScreenProps<RootStackParamList, 'TrangLac'>;

const TrangLac: React.FC<Props> = ({ navigation, route }) => {
    const [count, setCount] = useState(65);
    const [showPopup, setShowPopup] = useState(false);
    const [rewards, setRewards] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Hàm xử lý khi nhấn nút lắc
    const handlePress = (num: number) => {
        if (count >= num) {
            const newRewards: string[] = Array.from({ length: num }, () =>
                `MBAT ${Math.floor(100000 + Math.random() * 900000)}`
            ); // Tạo danh sách mã số may mắn

            setRewards(newRewards); // Cập nhật danh sách phần thưởng
            setShowPopup(true); // Hiển thị popup
            setCurrentIndex(0); // Đặt phần thưởng đầu tiên
            setCount(count - num); // Giảm số lượt lắc

            Vibration.vibrate(500); // Rung khi lắc
        } else {
            Alert.alert("Hết lượt lắc!", "Bạn không thể lắc thêm.");
        }
    };

    const renderRewardItem = ({ item, index }: { item: string; index: number }) => (
        <View style={styles.rewardContainer}>
            <Text style={styles.popupReward}>1 Chỉ vàng PNJ 9.999</Text>
            <Text style={styles.popupCode}>{item}</Text>
            <Text style={styles.popupCount}>{index + 1}/{rewards.length}</Text>
        </View>
    );

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

                        {/* Hiển thị phần thưởng hiện tại */}
                        {rewards.length > 0 && (
                            <View style={styles.rewardContainer}>
                                <Image source={require('../assets/img-lac1.png')} />
                                <Text style={styles.popupReward}>1 Chỉ vàng PNJ 9.999</Text>
                                <Text style={styles.popupCode}>{rewards[currentIndex]}</Text>
                                <Text style={styles.popupCount}>
                                    {currentIndex + 1}/{rewards.length}
                                </Text>
                            </View>
                        )}

                        {/* Nút lùi & tiến */}
                        <View style={styles.navButtons}>
                            <TouchableOpacity
                                onPress={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                                style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
                                disabled={currentIndex === 0}
                            >
                                <Text style={styles.navButtonText}>◀ Lùi</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => setCurrentIndex((prev) => Math.min(prev + 1, rewards.length - 1))}
                                style={[styles.navButton, currentIndex === rewards.length - 1 && styles.disabledButton]}
                                disabled={currentIndex === rewards.length - 1}
                            >
                                <Text style={styles.navButtonText}>Tiến ▶</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.popupMessage}>
                            Chúc mừng thánh lắc, rinh lộc mắt tay anh em ơi!
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


            <BottomBar navigation={navigation} route={route} />
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
    rewardContainer: {
        width: 280,
        alignItems: 'center',
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
    navButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    navButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#E63B2E',
        borderRadius: 8,
    },
    navButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#ccc',
    },

});

export default TrangLac;
