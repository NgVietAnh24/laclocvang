import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Svg, { Text as SvgText, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { RootStackParamList } from "../types/type";

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

const QuickQuiz: React.FC<Props> = ({ navigation }) => {
    const [players, setPlayers] = useState<Player[]>([
        { id: 1, name: "Bạn", avatar: require("../assets/player1.png"), score: 0, responseTime: 0 },
        { id: 2, name: "Đối thủ", avatar: require("../assets/player2.png"), score: 0, responseTime: 0 }
    ]);

    const [questions, setQuestions] = useState<Question[]>([
        { id: 1, question: "Thủ đô của Việt Nam là gì?", options: ["Hà Nội", "TP.HCM", "Đà Nẵng", "Huế"], answer: "Hà Nội" },
        { id: 2, question: "2 + 2 bằng mấy?", options: ["3", "4", "5", "6"], answer: "4" },
        { id: 3, question: "Màu của bầu trời là gì?", options: ["Đỏ", "Xanh", "Vàng", "Đen"], answer: "Xanh" },
        { id: 4, question: "Nước nào có diện tích lớn nhất thế giới?", options: ["Mỹ", "Trung Quốc", "Nga", "Canada"], answer: "Nga" },
        { id: 5, question: "Loài vật nào chạy nhanh nhất?", options: ["Sư tử", "Ngựa", "Báo Gê-pa", "Hươu"], answer: "Báo Gê-pa" }
    ]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [startTime, setStartTime] = useState<number>(0);
    const [totalTime, setTotalTime] = useState<number>(0);

    useEffect(() => {
        if (currentQuestionIndex === 0) {
            setStartTime(Date.now());
        }
    }, [currentQuestionIndex]);

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

    const determineWinner = () => {
        const [player1, player2] = players;
        let winner = null;

        if (player1.score > player2.score) {
            winner = player1;
        } else if (player2.score > player1.score) {
            winner = player2;
        } else {
            winner = player1.responseTime < player2.responseTime ? player1 : player2;
        }

        Alert.alert("Kết quả", `${winner?.name} thắng! Tổng thời gian: ${(totalTime / 1000).toFixed(2)} giây`, [
            { text: "OK", onPress: () => navigation.goBack() }
        ]);
    };

    return (
        <View style={styles.container}>
            <Image style={styles.imgGame} source={require('../assets/bgGame.png')} />
            <View style={styles.title}>
                <TouchableOpacity>
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
                        y="18"
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
                        <Text>{player.name}</Text>
                        <Text>Điểm: {player.score}</Text>
                    </View>
                ))}
            </View>

            {!gameOver && (
                <View style={styles.questionContainer}>
                    <Text style={styles.question}>{questions[currentQuestionIndex].question}</Text>
                    {questions[currentQuestionIndex].options.map(option => (
                        <TouchableOpacity key={option} style={styles.option} onPress={() => handleAnswer(option, 1)}>
                            <Text>{option}</Text>
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
        // padding: 20,
        // alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#F9F9F9"
    },
    title: {
        flexDirection: 'row'
    },
    playersContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%"
    },
    player: {
        alignItems: "center"
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
        marginBottom: 10
    },
    option: {
        padding: 10,
        backgroundColor: "#EEE",
        margin: 5,
        borderRadius: 5
    },
    imgGame: {
        position: 'absolute',
        resizeMode: 'cover',
    },
});
