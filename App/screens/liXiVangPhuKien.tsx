import { StackNavigationState } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { RootStackParamList } from "../types/type";
import { useState } from "react";
import BottomBar from "../components/bottom-bar";

type Props = NativeStackScreenProps<RootStackParamList, 'LiXiVangPhuKien'>;

const LiXiVangPhuKien: React.FC<Props> = ({ navigation, route }) => {

    const [count, setCount] = useState(11);

    return (
        <View style={styles.container}>
            <Image style={styles.background} source={require('../assets/liXiPhuKien.png')} />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                <Image source={require('../assets/back.png')} />
            </TouchableOpacity>
            <View>
                <Text style={styles.textContent}>
                    Bạn đã có <Text style={styles.count}>{count}</Text> lì xì
                </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('QuickQuiz')} style={styles.btn}>
                <Image source={require('../assets/thanhLiXi.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn}>
                <Image source={require('../assets/sieuThiPhuKien.png')} />
            </TouchableOpacity>
            <BottomBar navigation={navigation} route={route} />
        </View>
    );
}

export default LiXiVangPhuKien;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    background: {
        resizeMode: "contain",
        height: '100%',
        position: 'absolute',
    },
    back: {
        marginTop: '15%',
        right: '35%',
    },
    textContent: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700',
        color: '#FFF',
        marginTop: '120%'
    },
    count: {
        fontSize: 24,
        lineHeight: 24,
        fontWeight: '700',
        color: '#FFE907',
    },
    btn: {
        margin: 5
    },
});