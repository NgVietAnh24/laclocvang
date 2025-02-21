import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface Icon {
    id: number;
    x: number;
    y: number;
}

const GameBanVit: React.FC = () => {
    const [isSearching, setIsSearching] = useState(true);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(120); // 2 phút
    const [isGameOver, setIsGameOver] = useState(false);
    const [icons, setIcons] = useState<Icon[]>([]); // Chỉ định kiểu cho icons

    // Kích thước khu vực hình chữ nhật
    const rectangleWidth = 300; // Chiều rộng
    const rectangleHeight = 600; // Chiều cao

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
            <TouchableOpacity style={styles.back}>
                <Image source={require('../assets/back.png')} />
            </TouchableOpacity>
            {isSearching ? (
                <View style={styles.searchingContainer}>
                    <Text style={styles.title}>Đang tìm đối thủ...</Text>
                    <Text style={styles.subtitle}>Vui lòng chờ trong giây lát...</Text>
                </View>
            ) : (
                <>
                    <Text style={styles.title}>Game Tìm Đối Thủ</Text>
                    <Text style={styles.score}>Điểm: {score}</Text>
                    <Text style={styles.timer}>Thời gian còn lại: {timeLeft} giây</Text>
                    {isGameOver && (
                        <Text style={styles.winner}>
                            {score > 0 ? `Bạn đã thắng! Điểm của bạn: ${score}` : 'Trò chơi kết thúc!'}
                        </Text>
                    )}
                    {icons.map(icon => (
                        <TouchableOpacity
                            key={icon.id}
                            onPress={() => handlePress(icon.id)}
                            style={[styles.icon, { left: icon.x, top: icon.y }]}
                        >
                            <Text style={styles.iconText}>+1</Text>
                        </TouchableOpacity>
                    ))}
                    <View style={styles.opponentContainer}>
                        <View style={styles.opponent}>
                            <Image style={styles.avatar} source={require('../assets/player1.png')} />
                            <Text style={styles.opponentName}>Đối thủ 1</Text>
                            <Text style={styles.opponentScore}>Điểm: 0</Text>
                        </View>
                        <View style={styles.opponent}>
                            <Image style={styles.avatar} source={require('../assets/player2.png')} />
                            <Text style={styles.opponentName}>Đối thủ 2</Text>
                            <Text style={styles.opponentScore}>Điểm: 0</Text>
                        </View>
                    </View>
                </>
            )}
        </View>
    );
}

export default GameBanVit;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        position: 'relative',
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
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    score: {
        fontSize: 20,
        marginBottom: 10,
    },
    timer: {
        fontSize: 20,
        marginBottom: 20,
    },
    winner: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 20,
        color: 'green',
    },
    icon: {
        position: 'absolute',
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'blue',
        borderRadius: 50,
        elevation: 3,
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
        top: 50,
    },
    opponent: {
        alignItems: 'center',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 5,
    },
    opponentName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    opponentScore: {
        fontSize: 14,
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 10,

    },
});