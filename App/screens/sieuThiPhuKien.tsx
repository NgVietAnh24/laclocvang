import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet, Image, TouchableOpacity, Text } from "react-native";
import { RootStackParamList } from "../types/type";
import BottomBar from "../components/bottom-bar";

type Props = NativeStackScreenProps<RootStackParamList, 'SieuThiPhuKien'>;

const SieuThiPhuKien: React.FC<Props> = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.background} source={require('../assets/bgSieuThi.png')} />
            <View style={styles.haedContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
                    <Image source={require('../assets/back.png')} />
                </TouchableOpacity>
                <Text style={styles.title}>
                    SIÊU THỊ PHỤ KIỆN
                </Text>
            </View>
            <BottomBar navigation={navigation} route={route} />
        </View>
    );
}

export default SieuThiPhuKien;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        fontSize: 24,
        lineHeight: 30,
        fontWeight: '400',
        color: '#C2030B',
        fontFamily: 'SVN-Cookies',
        textAlign: 'left',
        right: '10%',
    },
    back: {
        // right: '35%',
    },
    background: {
        position: 'absolute',
        resizeMode: 'contain',
    },
    haedContainer: {
        marginTop: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});