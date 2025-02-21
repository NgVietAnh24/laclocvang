import React from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import BottomBar from "../components/bottom-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/type";
import Svg, { Text as SvgText, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

type Props = NativeStackScreenProps<RootStackParamList, 'LiXiVang'>;

const LiXiVang: React.FC<Props> = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <Image style={styles.background} source={require('../assets/bgLiXiVang.png')} />
            <View style={styles.containerHeader}>
                <Image source={require('../assets/back.png')} />
                <Text style={styles.title}>ĐẠI HỘI TRANH TÀI</Text>
                <Image source={require('../assets/btnInfo.png')} />
            </View>
            <Image style={styles.backgroundContent} source={require('../assets/bgContent.png')} />
            <View style={styles.headContent}>
                <Svg height="80" width="619" viewBox="0 0 319 84" >
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
                        fontSize="16"
                        fontWeight="400"
                        x="25%"
                        y="18"
                        textAnchor="middle"
                        fontFamily="SVN-Cookies"
                    >
                        GIÁ TRỊ GIẢI THƯỞNG KỲ CHUNG KẾT
                    </SvgText>
                </Svg>
            </View>
            <View style={styles.content1}>
                <Svg height="80" width="619" viewBox="0 0 319 84" >
                    <Defs>
                        <SvgLinearGradient id="gradientText" x1="0%" y1="0%" x2="100%" y2="0%">
                            <Stop offset="0%" stopColor="#FFE9B6" stopOpacity="1" />
                            <Stop offset="10%" stopColor="#FFE5AB" stopOpacity="1" />
                            <Stop offset="40%" stopColor="#FFDB93" stopOpacity="1" />
                            <Stop offset="60%" stopColor="#FFD88A" stopOpacity="1" />
                            <Stop offset="90%" stopColor="#C7965F" stopOpacity="1" />
                            <Stop offset="100%" stopColor="#C7965F" stopOpacity="1" />
                        </SvgLinearGradient>
                    </Defs>
                    <SvgText
                        fill="url(#gradientText)"
                        fontSize="16"
                        fontWeight="700"
                        x="25%"
                        y="18"
                        textAnchor="middle"
                    >
                        01 Giải Nhất
                    </SvgText>
                </Svg>
            </View>
            <Image style={styles.logo1} source={require('../assets/gold.png')} />
            <Text style={styles.textLogo1}>MỘT CHỈ VÀNG{"\n"}PNJ 9.999</Text>
            <View style={styles.content2}>
                <Svg height="80" width="619" viewBox="0 0 319 84" >
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
                        fontSize="16"
                        fontWeight="700"
                        x="25%"
                        y="18"
                        textAnchor="middle"
                    >
                        01 Giải Nhì
                    </SvgText>
                </Svg>
            </View>
            <Image style={styles.logo2} source={require('../assets/1,2vang.png')} />
            <Text style={styles.textLogo2}>Nửa chỉ vàng{"\n"}PNJ 9.999</Text>
            <View style={styles.content3}>
                <Svg height="80" width="619" viewBox="0 0 319 84" >
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
                        fontSize="16"
                        fontWeight="700"
                        x="25%"
                        y="18"
                        textAnchor="middle"
                    >
                        01 Giải Ba
                    </SvgText>
                </Svg>
            </View>
            <Image style={styles.logo3} source={require('../assets/500k.png')} />
            <Text style={styles.textLogo3}>Phiếu mua hàng{"\n"}500K</Text>
            {/* vong 1 */}
            <TouchableOpacity onPress={() => navigation.navigate('LiXiVangPhuKien')} style={styles.vong1}>
                <Image source={require('../assets/vong1.png')} />
            </TouchableOpacity>
            <Text style={styles.textVong1}>Đáp nhanh{"\n"}tranh lì xì</Text>
            {/* vong 2 */}
            <TouchableOpacity onPress={() => navigation.navigate('TetTranhTai')} style={styles.vong2}>
                <Image source={require('../assets/vong2.png')} />
            </TouchableOpacity>
            <Text style={styles.textVong2}>Tết tranh{"\n"}tài</Text>
            {/* vong 3 */}
            <Image style={styles.vong3} source={require('../assets/chungKet.png')} />

            <View style={styles.textVong3}>
                <Svg height="80" width="619" viewBox="0 0 319 84" >
                    <Defs>
                        <SvgLinearGradient id="gradientText" x1="0%" y1="80%" x2="0%" y2="0%">
                            <Stop offset="0%" stopColor="#B07515" stopOpacity="1" />
                            <Stop offset="15%" stopColor="#F5D77F" stopOpacity="1" />
                            <Stop offset="25%" stopColor="#FFFFD7" stopOpacity="1" />
                            <Stop offset="35%" stopColor="#F5D77F" stopOpacity="1" />
                            <Stop offset="45%" stopColor="#B07515" stopOpacity="1" />
                            <Stop offset="55%" stopColor="#F5D77F" stopOpacity="1" />
                            <Stop offset="65%" stopColor="#FFFFD7" stopOpacity="1" />
                            <Stop offset="85%" stopColor="#F5D77F" stopOpacity="1" />
                            <Stop offset="95%" stopColor="##B07515" stopOpacity="1" />
                        </SvgLinearGradient>
                    </Defs>
                    <SvgText
                        fill="url(#gradientText)"
                        fontSize="16"
                        fontWeight="400"
                        x="25%"
                        y="18"
                        textAnchor="middle"
                        fontFamily="SVN-Cookies"
                    >
                        15-02-2025
                    </SvgText>
                </Svg>
            </View>
            <BottomBar navigation={navigation} route={route} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    background: {
        position: 'absolute',
        resizeMode: 'contain',
    },
    containerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '15%',
        justifyContent: 'space-around',
    },
    title: {
        fontSize: 24,
        lineHeight: 30,
        fontWeight: '400',
        fontFamily: 'SVN-Cookies',
        color: '#A60006',
        marginHorizontal: '4%',
    },
    headContent: {
        position: 'absolute',
        top: '16%',
    },
    backgroundContent: {
        height: '75%',
        width: '90%',
        resizeMode: 'contain',
    },
    content1: {
        top: '20%',
        position: 'absolute',
    },
    content2: {
        top: '26.5%',
        right: '-7%',
        position: 'absolute',
    },
    content3: {
        top: '26.5%',
        left: '-8%',
        position: 'absolute',
    },
    logo1: {
        position: 'absolute',
        top: '24%',
    },
    logo2: {
        position: 'absolute',
        top: '31%',
        left: '12.8%'
    },
    logo3: {
        position: 'absolute',
        top: '31%',
        right: '15.5%'
    },
    textLogo1: {
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 15,
        textAlign: 'center',
        position: 'absolute',
        top: '35%',
        color: '#FFF',
    },
    textLogo2: {
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 15,
        textAlign: 'center',
        position: 'absolute',
        top: '37.5%',
        left: '11.5%',
        color: '#FFF',
    },
    textLogo3: {
        fontSize: 12,
        fontWeight: '700',
        lineHeight: 15,
        textAlign: 'center',
        position: 'absolute',
        top: '37.5%',
        right: '8%',
        color: '#FFF',
    },
    vong1: {
        position: 'absolute',
        bottom: "19%",
        right: '16%',
    },
    textVong1: {
        fontSize: 14.98,
        fontWeight: "400",
        fontFamily: 'SVN-Cookies',
        color: '#FFE933',
        position: 'absolute',
        bottom: '14%',
        right: '17%',
    },
    vong2: {
        position: 'absolute',
        bottom: "32%",
        left: '16%',
    },
    textVong2: {
        fontSize: 14.98,
        fontWeight: "400",
        fontFamily: 'SVN-Cookies',
        color: '#FFE933',
        position: 'absolute',
        bottom: '27%',
        left: '20%',
        textAlign: 'center',
    },
    vong3: {
        position: 'absolute',
        bottom: "45%",
        right: '14%',
    },
    textVong3: {
        position: 'absolute',
        top: '55%',
        right: '-53%',
    },
});

export default LiXiVang;