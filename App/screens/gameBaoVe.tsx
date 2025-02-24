import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { RootStackParamList } from '../types/type';
import BottomBar from '../components/bottom-bar';

interface Icon {
    id: number;
    x: number;
    y: number;
}

type Props = NativeStackScreenProps<RootStackParamList, 'GameBaoVe'>;

const GameBaoVe: React.FC<Props> = ({ navigation, route }) => {
    const [isSearching, setIsSearching] = useState(true);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(120); // 2 phút
    const [isGameOver, setIsGameOver] = useState(false);
    const [icons, setIcons] = useState<Icon[]>([]); // Chỉ định kiểu cho icons

    // Kích thước khu vực hình chữ nhật
    const rectangleWidth = 300; // Chiều rộng
    const rectangleHeight = 400; // Chiều cao

    useEffect(() => {
        if (isSearching) {
            const searchOpponent = setTimeout(() => {
                setIsSearching(false); // Chuyển sang màn hình trò chơi sau 3 giây
            }, 3000); // Thời gian tìm kiếm đối thủ

            return () => clearTimeout(searchOpponent);
        }
    }, [isSearching]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setIsGameOver(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isGameOver]);

    useEffect(() => {
        if (!isGameOver) {
            const generateIcons = () => {
                const numberOfIcons = Math.floor(Math.random() * 2) + 2; // 2 hoặc 3 icon
                const newIcons = Array.from({ length: numberOfIcons }, (_, index) => ({
                    id: Date.now() + index, // Đảm bảo id duy nhất
                    x: Math.random() * (rectangleWidth - 100), // Giới hạn vị trí x
                    y: Math.random() * (rectangleHeight - 100), // Giới hạn vị trí y
                }));
                setIcons(newIcons);
            };

            generateIcons();
            const iconInterval = setInterval(generateIcons, 2000); // Tạo icon mới mỗi 2 giây

            return () => clearInterval(iconInterval);
        }
    }, [isGameOver]);

    const handlePress = (id: number) => {
        if (!isGameOver) {
            setScore(prev => prev + 1);
            // Tạo icon mới ngay sau khi chạm vào icon
            const newIcons = Array.from({ length: Math.floor(Math.random() * 2) + 2 }, (_, index) => ({
                id: Date.now() + index + Math.random(), // Đảm bảo id duy nhất
                x: Math.random() * (rectangleWidth - 100),
                y: Math.random() * (rectangleHeight - 100),
            }));
            setIcons(newIcons);
        }
    };

    return (
        <View style={styles.container}>
            <Image style={styles.background} source={require('../assets/bgGame.png')} />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                <Image source={require('../assets/back.png')} />
            </TouchableOpacity>
            {isSearching ? (
                <View style={styles.searchingContainer}>
                    <Text style={styles.title}>Đang tìm đối thủ...</Text>
                    <Text style={styles.subtitle}>Vui lòng chờ trong giây lát...</Text>
                </View>
            ) : (
                <>
                    <Text style={styles.title}>THỬ TÀI BẮN VÍT</Text>
                    {/* <Text style={styles.score}>Điểm: {score}</Text> */}
                    <View style={styles.timeContainer}>
                        <Image source={require('../assets/time.png')} />
                        <Text style={styles.timer}>{timeLeft}</Text>
                        <Text style={styles.slogan}>SIÊU CHỐNG ẨM</Text>
                    </View>

                    {isGameOver && (
                        <Text style={styles.winner}>
                            {score > 0 ? `Bạn đã thắng! Điểm của bạn: ${score} ${"\n"}Nhận được 5 lì xì ` : 'Bạn đã thua cuộc!'}
                        </Text>
                    )}
                    <View style={styles.iconContainer}>
                        <Image source={require('../assets/bgkhien.png')} style={styles.iconBackground} />
                        {icons.map(icon => (
                            <TouchableOpacity
                                key={icon.id}
                                onPress={() => handlePress(icon.id)}
                                style={[styles.icon, { left: icon.x, top: icon.y }]}
                            >
                                <Image source={require('../assets/lienKet.png')} />
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.opponentContainer}>
                        <View style={styles.opponent}>
                            <Image style={styles.avatar} source={require('../assets/player01.png')} />
                            <Text style={styles.opponentName}>Việt Anh</Text>
                            <Text style={styles.opponentScore}>{score}</Text>
                        </View>
                        <Image style={styles.vs} source={require('../assets/vs.png')} />
                        <View style={styles.opponent}>
                            <Image style={styles.avatar} source={require('../assets/player02.png')} />
                            <Text style={styles.opponentName}>Tuấn Anh</Text>
                            <Text style={styles.opponentScore1}>0</Text>
                        </View>
                    </View>
                </>
            )}
            <BottomBar navigation={navigation} route={route} />
        </View>
    );
}

export default GameBaoVe;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        position: 'relative',
    },
    iconContainer: {
        position: 'relative',
        resizeMode: 'contain',
        top: '13%',
        right: '-6.5%',
        width: '100%',
        height: '67%',
    },
    iconBackground: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    searchingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    background: {
        position: 'absolute',
        resizeMode: 'contain',
    },
    title: {
        fontSize: 21,
        lineHeight: 21,
        fontWeight: '700',
        position: 'absolute',
        color: '#FFF',
        paddingTop: 10,
        top: "26%",
    },
    score: {
        fontSize: 20,
        marginBottom: 10,
    },
    timer: {
        alignItems: 'center',
        right: -9,
        fontSize: 18,
        color: '#FAD93C',
        bottom: '45%',
        lineHeight: 18,
        fontWeight: '400',
        fontFamily: 'SVN-Cookies',
    },
    winner: {
        position: 'absolute',
        fontSize: 15,
        textAlign: 'center',
        fontWeight: 'bold',
        top: '40%',
        zIndex: 1,
        color: '#FFD053',
        backgroundColor: '#A60006',
        padding: '10%',
        borderRadius: 12,
        borderColor: '#FFD053',
        borderWidth: 2,
    },
    slogan: {
        top: '430%',
        fontWeight: '400',
        fontSize: 17,
        lineHeight: 18,
        fontFamily: 'SVN-Cookies',
        position: 'absolute',
        color: '#C4040B',
        width: 200,
        textAlign: 'center',
        left: '-40%',
        padding: 4,
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
        textShadowColor: '#FFE995',
    },
    icon: {
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        color: 'white',
        fontSize: 24,
    },
    back: {
        marginTop: '15%',
        right: '35%',
    },
    opponentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        position: 'absolute',
        top: '15%',
    },
    opponent: {
        alignItems: 'center',
    },
    avatar: {
        borderRadius: 25,
        marginBottom: 5,
    },
    opponentName: {
        fontSize: 13,
        lineHeight: 17,
        fontWeight: '400',
        color: '#FFF',
        fontFamily: "SVN-Cookies",
    },
    opponentScore: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30,
        color: '#FFE995',
        bottom: '45%',
        paddingLeft: '4%',
    },
    opponentScore1: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30,
        color: '#FFE995',
        bottom: '45%',
        paddingRight: '4%',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 10,

    },
    vs: {
        width: 90,
        height: 90,
        resizeMode: 'contain',
    },
    timeContainer: {
        top: '32%',
        position: 'absolute',
        zIndex: 1,
        alignItems: 'center',
    },
});