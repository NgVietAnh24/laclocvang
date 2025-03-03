import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { RootStackParamList } from "../types/type";
import { useEffect } from "react";
import BottomBar from "../components/bottom-bar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchLixiById, listenLixiById } from "../slices/userSlice";

type Props = NativeStackScreenProps<RootStackParamList, 'LiXiVangPhuKien'>;

const LiXiVangPhuKien: React.FC<Props> = ({ navigation, route }) => {
    const { userId } = route.params;
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) =>
        state.users.data.find(user => user.id === userId)
    );

    const lixi = useSelector((state: any) => state.users.lixi);

    useEffect(() => {
        const unsubscribe = dispatch(listenLixiById(userId));

        return () => {
            unsubscribe(); // Hủy lắng nghe khi component unmount
        };
    }, [dispatch, userId]);
    console.log("User datsa:", user);
    console.log("Lì xì value:", lixi);

    return (
        <View style={styles.container}>
            <Image style={styles.background} source={require('../assets/liXiPhuKien.png')} />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                <Image source={require('../assets/back.png')} />
            </TouchableOpacity>
            <View>
                <Text style={styles.textContent}>
                    Bạn đã có <Text style={styles.count}>{lixi}</Text> lì xì
                </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('QuickQuiz', { userId })} style={styles.btn}>
                <Image source={require('../assets/thanhLiXi.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SieuThiPhuKien', { userId })} style={styles.btn}>
                <Image source={require('../assets/sieuThiPhuKien.png')} />
            </TouchableOpacity>
            <BottomBar navigation={navigation} route={route} />
        </View >
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
