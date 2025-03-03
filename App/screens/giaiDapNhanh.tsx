import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Svg, { Text as SvgText, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { RootStackParamList } from "../types/type";
import { AppDispatch, RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { listenLixiById } from "../slices/userSlice";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/config";

interface Player {
    id: number;
    name: string;
    avatar: any;
    score: number;
    responseTime: number;
}

interface Question {
    id: number;
    question: string;
    options: string[];
    answer: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'QuickQuiz'>;

const QuickQuiz: React.FC<Props> = ({ navigation, route }) => {

    const randomNames = [
        "Minh Anh", "Hải Đăng", "Thanh Tâm", "Phương Linh", "Quốc Bảo",
        "Bảo Ngọc", "Đức Thịnh", "Huy Hoàng", "Khánh Linh", "Trọng Nhân"
    ];

    const getRandomName = () => {
        const randomIndex = Math.floor(Math.random() * randomNames.length);
        return randomNames[randomIndex];
    };
    const [players, setPlayers] = useState<Player[]>([
        { id: 1, name: "Việt Anh", avatar: require("../assets/player1.png"), score: 0, responseTime: 0 },
        { id: 2, name: getRandomName(), avatar: require("../assets/player2.png"), score: 0, responseTime: 0 }
    ]);

    const [questions, setQuestions] = useState<Question[]>([
        { id: 1, question: "Tết Nguyên Đán thường diễn ra vào tháng nào trong năm?", options: ["Tháng Giêng", "Tháng Hai", "Tháng Ba", "Tháng Tư"], answer: "Tháng Giêng" },
        { id: 2, question: "Bánh chưng thường được làm từ các nguyên liệu nào sau đây?", options: ["Gạo nếp, thịt heo, đậu xanh, lá chuối", "Gạo nếp, thịt gà, đậu đỏ, lá dong", "Gạo nếp, cá, đậu phộng, lá sen", "Gạo nếp, thịt bò, đậu trắng, lá dừa"], answer: "Bánh chưng thường được làm từ các nguyên liệu nào sau đây?" },
        { id: 3, question: "Tết Trung Thu được tổ chức vào ngày nào trong năm âm lịch?", options: ["Ngày 1/8", "Ngày 15/8", "Ngày 25/8", "Ngày 30/8"], answer: "Ngày 15/8" },
        { id: 4, question: "Mâm ngũ quả trong ngày Tết thường gồm những loại quả nào sau đây?", options: ["Táo, cam, lê, dưa hấu, nho", "Mãng cầu, dừa, đu đủ, xoài, chuối", "Nhãn, vải, chôm chôm, mận, quýt", "Chuối, dưa hấu, bưởi, mãng cầu, đào"], answer: "Mãng cầu, dừa, đu đủ, xoài, chuối" },
        { id: 5, question: "Người ta thường kiêng kỵ việc gì trong những ngày đầu năm mới?", options: ["Quét nhà", "Đi ra ngoài", "Làm vườn", "Đi chợ"], answer: "Quét nhà" }
    ]);
    const { userId } = route.params;


    const user = useSelector((state: RootState) =>
        state.users.data.find(user => user.id === userId)
    );

    const getRandomNumber = (): number => Math.floor(Math.random() * 51);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [startTime, setStartTime] = useState<number>(120);
    const [totalTime, setTotalTime] = useState<number>(4000);
    const dispatch = useDispatch<AppDispatch>();
    const lixi = useSelector((state: any) => state.users.lixi);
    useEffect(() => {
        const unsubscribe = dispatch(listenLixiById(userId));

        return () => {
            unsubscribe(); // Hủy lắng nghe khi component unmount
        };
    }, [dispatch, userId]);
    const [count, setCount] = useState(lixi);

    const handleAnswer = (selectedAnswer: string, playerId: number) => {
        if (gameOver) return;

        const correctAnswer = questions[currentQuestionIndex].answer;
        setPlayers(prevPlayers => prevPlayers.map(player =>
            player.id === playerId
                ? { ...player, score: player.score + (selectedAnswer === correctAnswer ? 1 : 0) }
                : player
        ));

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setGameOver(true);
            const endTime = Date.now();
            setTotalTime(endTime - startTime);
            determineWinner();
        }
    };


    const determineWinner = async () => {
        const [player1, player2] = players;
        let winner = null;

        if (player1.score > player2.score) {
            winner = player1;
        } else if (player2.score > player1.score) {
            winner = player2;
        } else {
            winner = player1.responseTime < player2.responseTime ? player1 : player2;
        }

        // Cộng thêm 5 lì xì cho người chiến thắng
        if (winner) {
            try {
                const newLixi = count + 5;
                setCount(newLixi);

                const userRef = doc(firestore, "users", userId);
                await updateDoc(userRef, { lixi: newLixi });

                console.log(`Cập nhật lì xì thành công! Tổng lì xì: ${newLixi}`);
            } catch (error) {
                console.error("Lỗi khi cập nhật lì xì:", error);
            }
        }

        Alert.alert(
            "Kết quả",
            `${winner?.name} thắng! Tổng thời gian: ${(totalTime / 1000).toFixed(2)} giây`,
            [{ text: "OK", onPress: () => navigation.goBack() }]
        );
    };


    return (
        <View style={styles.container}>
            <Image style={styles.imgGame} source={require('../assets/bgGame.png')} />
            <View style={styles.title}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={require('../assets/back.png')} />
                </TouchableOpacity>
                <Svg height="80" width="319" viewBox="0 0 319 84" >
                    <Defs>
                        <SvgLinearGradient id="gradientText" x1="0%" y1="0%" x2="100%" y2="0%">
                            <Stop offset="0%" stopColor="#FAD93C" stopOpacity="1" />
                            <Stop offset="10%" stopColor="#FFE995" stopOpacity="1" />
                            <Stop offset="40%" stopColor="#FFF9D1" stopOpacity="1" />
                            <Stop offset="60%" stopColor="#FFF1AD" stopOpacity="1" />
                            <Stop offset="90%" stopColor="#FBE592" stopOpacity="1" />
                            <Stop offset="100%" stopColor="#FFD053" stopOpacity="1" />
                        </SvgLinearGradient>
                    </Defs>
                    <SvgText
                        fill="url(#gradientText)"
                        fontSize="24"
                        fontWeight="700"
                        x="35%"
                        y="48"
                        textAnchor="middle"
                    >
                        Đáp nhanh tranh lì xì
                    </SvgText>
                </Svg>
            </View>

            <View style={styles.playersContainer}>
                {players.map(player => (
                    <View key={player.id} style={styles.player}>
                        <Image source={player.avatar} style={styles.avatar} />
                        <Text style={styles.name}>{player.name}</Text>
                        <Text style={styles.core}>Điểm: {player.score}</Text>
                    </View>
                ))}
            </View>

            {!gameOver && (
                <View style={styles.questionContainer}>
                    <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
                    {questions[currentQuestionIndex].options.map(option => (
                        <TouchableOpacity key={option} style={styles.option} onPress={() => handleAnswer(option, 1)}>
                            <Text style={styles.textOption}>{option}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
        </View>
    );
};

export const FindingOpponentScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('QuickQuiz');
        }, 3000);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đang tìm đối thủ...</Text>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

export default QuickQuiz;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    title: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '10%',
        marginHorizontal: '5%',
    },
    playersContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    },
    player: {
        alignItems: "center",
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginBottom: 10
    },
    questionContainer: {
        marginTop: 20,
        alignItems: "center"
    },
    question: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
        color: '#FFF',
        lineHeight: 23,
        paddingBottom: '10%',
    },
    option: {
        width: '85%',
        padding: 10,
        backgroundColor: "#A60006",
        margin: 8,
        borderRadius: 15,
        borderColor: '#FFE995',
        borderWidth: 3,
    },
    imgGame: {
        position: 'absolute',
        resizeMode: 'cover',
    },
    name: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 28,
        fontFamily: 'SVN-Cookies',
        color: '#FFE995',
    },
    core: {
        fontSize: 18,
        fontWeight: '500',
        lineHeight: 28,
        color: '#FFE907',
    },
    textOption: {
        fontSize: 15,
        fontWeight: '500',
        fontFamily: 'SVN-Cookies',
        color: '#FFE907',
    },
});
