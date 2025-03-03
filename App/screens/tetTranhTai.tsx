import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../types/type";
import BottomBar from "../components/bottom-bar";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

type Props = NativeStackScreenProps<RootStackParamList, 'TetTranhTai'>;

const TetTranhTai: React.FC<Props> = ({ navigation, route }) => {
    const { userId } = route.params;
    const dispatch = useDispatch<AppDispatch>();

    const user = useSelector((state: RootState) =>
        state.users.data.find(user => user.id === userId)
    );

    // const lixi = useSelector((state: any) => state.users.lixi);

    // useEffect(() => {
    //     const unsubscribe = dispatch(listenLixiById(userId));

    //     return () => {
    //         unsubscribe(); // Hủy lắng nghe khi component unmount
    //     };
    // }, [dispatch, userId]);
    console.log("User datsa:", user);
    // console.log("Lì xì value:", lixi);
    return (
        <View style={styles.container}>
            <Image style={styles.background} source={require('../assets/bgTetTranhTai.png')} />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                <Image source={require('../assets/back.png')} />
            </TouchableOpacity>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('VitTuKhoan', { userId })} style={styles.btn}>
                    <Image source={require('../assets/banVit.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SieuBaoVe', { userId })} style={styles.btn}>
                    <Image source={require('../assets/baoVe.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ThanhAnhKim', { userId })} style={styles.btn}>
                    <Image source={require('../assets/anhKim.png')} />
                </TouchableOpacity>
            </View>
            <BottomBar navigation={navigation} route={route} />
        </View>
    );
}

export default TetTranhTai;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        height: '98%',
        resizeMode: 'cover',
    },
    back: {
        marginTop: '15%',
        right: '35%',
    },
    btnContainer: {
        marginTop: "105%",
    },
    btn: {
        margin: '3%'
    },
});