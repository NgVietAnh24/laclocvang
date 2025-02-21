import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Image, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { RootStackParamList } from "../types/type";
import Svg, { Text as SvgText, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import BottomBar from "../components/bottom-bar";

type Props = NativeStackScreenProps<RootStackParamList, 'VitTuKhoan'>;

const VitTuKhoan: React.FC<Props> = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.backgroud} source={require('../assets/bgVitTuKhoan.png')} />

            <View style={styles.contentContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
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
                        fontWeight="500"
                        x="35%"
                        y="48"
                        textAnchor="middle"
                        fontFamily="SVN-Cookies"
                    >
                        TẾT TRANH TÀI
                    </SvgText>
                </Svg>
            </View>
            <Image style={styles.imgContent} source={require('../assets/imgContent.png')} />
            <View style={styles.khoanContainer}>
                <Text style={styles.headContent}>
                    THỬ TÀI BẮN VÍT
                </Text>
                <Text style={styles.textContent}>
                    Vận dụng tài bắn vít siêu đỉnh: chạm liên tục vào màn hình, chạm càng nhanh điểm càng cao, bạn sẽ chiến thắng đối thủ!
                </Text>
                <Image style={styles.khoan} source={require('../assets/khoan.png')} />
                <TouchableOpacity onPress={() => navigation.navigate('GameBanVit')} style={styles.timDoiThu}>
                    <Image source={require('../assets/timDoiThu.png')} />
                </TouchableOpacity>
                <Image style={styles.notifi} source={require('../assets/notifiTime.png')} />
            </View>

            <BottomBar navigation={navigation} route={route} />
        </View>
    );
}

export default VitTuKhoan;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '15%',
    },
    backgroud: {
        position: 'absolute',
        resizeMode: 'contain',
        height: '100%',
    },
    back: {
        left: '8%',
    },
    imgContent: {
        position: 'absolute',
        height: '103%',
        width: '93%',
        resizeMode: "contain",
    },
    headContent: {
        fontSize: 20,
        fontWeight: '700',
        lineHeight: 30,
        color: '#C4040B',
        textAlign: 'center',
        marginTop: '5%',
    },
    textContent: {
        textAlign: 'center',
        width: 280,
        lineHeight: 18,
        fontSize: 14,
        fontWeight: '400',
    },
    khoanContainer: {
        alignItems: 'center',
    },
    khoan: {
        marginTop: '10%',
        width: 330,
    },
    timDoiThu: {
        marginTop: '5%',
    },
    notifi: {
        marginTop: '3%',
    }
});