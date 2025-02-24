import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../types/type";
import BottomBar from "../components/bottom-bar";

type Props = NativeStackScreenProps<RootStackParamList, 'TetTranhTai'>;

const TetTranhTai: React.FC<Props> = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.background} source={require('../assets/bgTetTranhTai.png')} />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                <Image source={require('../assets/back.png')} />
            </TouchableOpacity>
            <View style={styles.btnContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('VitTuKhoan')} style={styles.btn}>
                    <Image source={require('../assets/banVit.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SieuBaoVe')} style={styles.btn}>
                    <Image source={require('../assets/baoVe.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ThanhAnhKim')} style={styles.btn}>
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