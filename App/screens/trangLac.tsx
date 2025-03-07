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
    ImageSourcePropType,
} from 'react-native';
import BottomBar from '../components/bottom-bar';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebase/config';
import { fetchLuotLacById } from '../slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { addRewardToKhoLoc } from '../slices/khoLocSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'TrangLac'>;

const TrangLac: React.FC<Props> = ({ navigation, route }) => {

    const images = [
        require('../assets/vang.png'),
        require('../assets/nua-chi.png'),
    ];
    const dispatch = useDispatch<AppDispatch>();
    const [count, setCount] = useState(60);
    const [receive, setReceive] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [rewards, setRewards] = useState<string[]>([]);
    const [names, setNames] = useState<string[]>([]);
    const [randomImages, setRandomImages] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [receivedRewards, setReceivedRewards] = useState<string[]>([]); // Danh sách phần thưởng đã nhận

    const { userId } = route.params;
    dispatch(fetchLuotLacById(userId));
    console.log('userId:', userId);
    const user = useSelector((state: RootState) =>
        state.users.data.find(user => user.id === userId)
    );
    console.log('Số lượt lắc:', user?.luotLac);

    const handlePress = async (num: number) => {
        if (!user?.id) return;

        const userRef = doc(firestore, 'users', user.id);
        try {
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const userData = userSnap.data();
                const currentCount = userData.luotLac || 0;

                if (currentCount < num) {
                    Alert.alert('Hết lượt lắc!', 'Bạn không thể lắc thêm.');
                    return;
                }

                // Tạo danh sách phần thưởng
                const newRewards = Array.from({ length: num }, () => ({
                    code: `MBAT ${Math.floor(100000 + Math.random() * 900000)}`,
                    image: images[Math.floor(Math.random() * images.length)],
                    name: images[Math.floor(Math.random() * images.length)] === images[0] ? '1 Chỉ vàng PNJ 9.999' : 'Nửa chỉ vàng PNJ 9.999',
                }));

                // Cập nhật UI
                setRewards(newRewards.map(r => r.code));
                setRandomImages(newRewards.map(r => r.image));
                setNames(newRewards.map(r => r.name));
                setShowPopup(true);
                setCurrentIndex(0);
                setCount(currentCount - num);

                Vibration.vibrate(500);

                // Cập nhật số lượt lắc trong Firestore
                await updateDoc(userRef, { luotLac: currentCount - num });

                // **Sử dụng Redux để thêm phần thưởng vào kho lộc**
                dispatch(addRewardToKhoLoc(newRewards));
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật lượt lắc:', error);
        }
    };


    const saveRewardsToFirestore = async (newRewards: string[], newImages: string[], newNames: string[]) => {
        try {
            for (let i = 0; i < newRewards.length; i++) {
                const rewardData = {
                    name: newNames[i],
                    code: newRewards[i],
                    image: newImages[i],
                    status: "Chưa nhận",
                };
                await addDoc(collection(firestore, 'kholoc'), rewardData);
            }
            Alert.alert("Thành công", "Phần thưởng đã được lưu vào kho lộc!");
        } catch (error) {
            console.error("Error adding document: ", error);
            Alert.alert("Lỗi", "Không thể lưu phần thưởng vào kho lộc.");
        }
    };

    const btnExit = () => {
        setShowPopup(false);
        // Lưu phần thưởng vào kho lộc khi popup đóng
        if (rewards.length > 0) {
            setReceivedRewards(prev => [...prev, rewards[currentIndex]]);
        }
    }


    return (
        <View style={styles.container}>
            <Image style={styles.background} source={require('../assets/trang-lac.png')} />
            <Text style={styles.paragraph}>
                Bạn có <Text style={styles.count}>{user?.luotLac}</Text> lượt lắc
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
                    {rewards.length != 1 ?
                        <Image style={styles.imgLac} source={require('../assets/img-lac10.png')} />
                        :
                        <Image style={styles.imgLac1} source={require('../assets/img-lac1.png')} />
                    }

                    <Pressable
                        style={styles.buttonClose}
                        onPress={() => btnExit()}
                    >
                        <Image source={require('../assets/exit.png')} />
                    </Pressable>
                    <View style={styles.popup}>
                        {/* Hiển thị phần thưởng hiện tại */}

                        {rewards.length > 0 && (
                            <View style={styles.rewardContainer}>
                                {rewards.length != 1 ?
                                    <>
                                        <Text style={styles.popupTitle}>LỘC TỚI NGẬP TRÀN</Text>
                                        <Text style={styles.popupReward}>
                                            {randomImages[currentIndex] === images[0]
                                                ? "1 Chỉ vàng PNJ 9.999"
                                                : "Nửa chỉ vàng PNJ 9.999"}
                                            {/* {names} */}
                                        </Text>
                                        <Text style={styles.popupReward}>1 số may mắn</Text>
                                        <View style={{ flexDirection: 'row', marginTop: '8%' }}>
                                            <Image style={{ marginRight: '15%' }} source={randomImages[currentIndex] as ImageSourcePropType} />
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image style={styles.somayman} source={require('../assets/somayman.png')} />
                                                <Text style={styles.popupCode}>{rewards[currentIndex]}</Text>
                                            </View>

                                        </View>
                                    </>
                                    :
                                    <>
                                        <Text style={styles.popupReward1}>
                                            {randomImages[currentIndex] === images[0]
                                                ? "1 Chỉ vàng PNJ 9.999"
                                                : "Nửa chỉ vàng PNJ 9.999"}
                                            {/* {names} */}
                                        </Text>
                                        <Text style={styles.popupReward1}>1 số may mắn</Text>6
                                        <View style={{ flexDirection: 'row', marginTop: '8%' }}>
                                            <Image style={{ marginRight: '8%' }} source={randomImages[currentIndex] as ImageSourcePropType} />
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image style={styles.somayman} source={require('../assets/somayman.png')} />
                                                <Text style={styles.popupCode}>{rewards[currentIndex]}</Text>
                                            </View>

                                        </View>
                                    </>
                                }
                                {rewards.length != 1 &&
                                    <Text style={styles.popupCount}>
                                        {currentIndex + 1}/{rewards.length}
                                    </Text>
                                }
                            </View>
                        )}

                        {/* Nút lùi & tiến */}
                        {rewards.length === 1 ?
                            <>
                                <View style={styles.navButtons}>
                                </View><Text style={styles.popupMessage1}>
                                    WOW, THÁNH LẮC VÀNG ĐÂY RỒI,{"\n"}
                                    GIÀU TO RỒI ANH EM ƠI!
                                </Text>
                            </>
                            :
                            <>
                                <View style={styles.navButtons}>
                                    <TouchableOpacity
                                        onPress={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                                        style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
                                        disabled={currentIndex === 0}
                                    >
                                        {currentIndex + 1 > 1 ?
                                            <Image style={styles.imgBtnNext1} source={require('../assets/next.png')} />
                                            :
                                            <Image style={styles.imgBtnPrev} source={require('../assets/prev.png')} />
                                        }
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        onPress={() => setCurrentIndex((prev) => Math.min(prev + 1, rewards.length - 1))}
                                        style={[styles.navButton, currentIndex === rewards.length - 1 && styles.disabledButton]}
                                        disabled={currentIndex === rewards.length - 1}
                                    >
                                        {currentIndex + 1 === rewards.length ?
                                            <Image style={styles.imgBtnNext1} source={require('../assets/prev.png')} />
                                            :
                                            <Image style={styles.imgBtnNext} source={require('../assets/next.png')} />
                                        }
                                    </TouchableOpacity>
                                </View><Text style={styles.popupMessage}>
                                    Chúc mừng thánh lắc,{"\n"}
                                    rinh lộc mát tay anh em ơi!{"\n"}
                                    Tích cực săn thêm lượt lắc thôi nào!
                                </Text>
                            </>

                        }


                        <View style={{ top: '130%', position: 'absolute' }}>
                            <TouchableOpacity>
                                <Image source={require('../assets/share.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setReceive(false)} >
                                {receive === true ?
                                    <Image source={require('../assets/nhan-loc.png')} />
                                    :
                                    <Image source={require('../assets/da-nhan.png')} />
                                }
                            </TouchableOpacity>
                        </View>

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
        alignItems: 'center',
    },
    popupTitle: {
        marginTop: '10%',
        fontSize: 16,
        fontWeight: '400',
        color: '#FFE933',
        marginBottom: 8,
        lineHeight: 20,
        fontFamily: 'SVN-Cookies'
    },
    rewardContainer: {
        width: 280,
        alignItems: 'center',
    },
    popupReward: {
        fontSize: 14,
        fontWeight: '700',
        color: '#FFF',
        lineHeight: 18,
        marginBottom: 4,
    },
    popupReward1: {
        fontSize: 16,
        fontWeight: '400',
        color: '#C2030B',
        fontFamily: 'SVN-Cookies',
        lineHeight: 20,
        marginBottom: 4,
    },
    popupCode: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333',
        lineHeight: 18,
        marginBottom: 4,
        right: '-13%',
        top: '30%',
    },
    popupCount: {
        fontSize: 12,
        color: '#FFE933',
        fontWeight: '700',
        top: '25%',
    },
    popupMessage: {
        fontSize: 12,
        fontWeight: '700',
        textAlign: 'center',
        color: '#FFF',
        width: 217,
        marginBottom: 16,
    },
    popupMessage1: {
        fontSize: 11,
        fontWeight: '400',
        textAlign: 'center',
        color: '#C2030B',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 5,
        textShadowColor: '#FFD600D9',
        width: 217,
        marginBottom: 16,
    },
    buttonClose: {
        position: 'absolute',
        bottom: '85%',
        left: '80%',
    },
    buttonCloseText: {
        color: 'white',
        fontWeight: 'bold',
    },
    navButtons: {
        flexDirection: 'row',
        width: '100%',
        padding: 10
    },
    navButton: {
        paddingVertical: 10,
        paddingHorizontal: 40,
    },
    navButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    disabledButton: {
        // backgroundColor: '#ccc',
    },
    imgLac: {
        position: 'absolute',
        bottom: '20%',
    },
    somayman: {
        position: 'absolute'
    },
    imgBtnPrev: {
        width: 28,
        height: 28,
    },
    imgBtnNext: {
        width: 28,
        height: 28,
    },
    imgBtnNext1: {
        width: 28,
        height: 28,
        transform: [{ rotate: '180deg' }]
    },
    imgLac1: {
        position: 'absolute',
        bottom: '35%',
    },
});

export default TrangLac;
