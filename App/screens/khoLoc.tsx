import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import BottomBar from "../components/bottom-bar";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/type";
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Text as SvgText, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';

interface Reward {
    id: number;
    name: string;
    status: "Chưa nhận" | "Đã nhận";
    quantity: number;
    image?: any; // Hình ảnh chỉ có trong Lắc Lộc Vàng và Lì Xì Vàng
    code?: string; // Mã số chỉ có trong Mã Số May Mắn
}

type Props = NativeStackScreenProps<RootStackParamList, 'KhoLoc'>;

const KhoLoc: React.FC<Props> = ({ navigation, route }) => {
    const [selectedTab, setSelectedTab] = useState("Lắc Lộc Vàng");
    const [rewardList, setRewardList] = useState<Reward[]>([
        { id: 1, name: "Phiếu mua hàng " + "\n" + "500K", status: "Chưa nhận", quantity: 5, image: require("../assets/voucher500.png") },
        { id: 2, name: "Phiếu mua hàng " + "\n" + "200K", status: "Chưa nhận", quantity: 4, image: require("../assets/voucher200.png") },
        { id: 3, name: "Mã số may mắn", status: "Chưa nhận", quantity: 1, code: " MB01C" + "\n" + "568356", image: require("../assets/bgLucky.png") },
        { id: 4, name: "Mã số may mắn", status: "Chưa nhận", quantity: 1, code: "MB01C" + "\n" + "789012", image: require("../assets/bgLucky.png") },
        { id: 6, name: "Mã số may mắn", status: "Chưa nhận", quantity: 1, code: " MB01C" + "\n" + "568356", image: require("../assets/bgLucky.png") },
        { id: 5, name: "Mã số may mắn", status: "Chưa nhận", quantity: 1, code: "MB01C" + "\n" + "789012", image: require("../assets/bgLucky.png") },
        { id: 7, name: "Phiếu mua hàng " + "\n" + "500K", status: "Chưa nhận", quantity: 5, image: require("../assets/voucher500.png") },
        { id: 8, name: "Phiếu mua hàng " + "\n" + "200K", status: "Chưa nhận", quantity: 4, image: require("../assets/voucher200.png") },
        { id: 9, name: "Mã số may mắn", status: "Chưa nhận", quantity: 1, code: " MB01C" + "\n" + "568356", image: require("../assets/bgLucky.png") },
        { id: 10, name: "Mã số may mắn", status: "Chưa nhận", quantity: 1, code: "MB01C" + "\n" + "789012", image: require("../assets/bgLucky.png") },
        { id: 11, name: "Mã số may mắn", status: "Chưa nhận", quantity: 1, code: " MB01C" + "\n" + "568356", image: require("../assets/bgLucky.png") },
        { id: 12, name: "Mã số may mắn", status: "Chưa nhận", quantity: 1, code: "MB01C" + "\n" + "789012", image: require("../assets/bgLucky.png") },
    ]);

    const filteredRewards = rewardList.filter(reward => {
        if (selectedTab === "Lắc Lộc Vàng") return true;
        if (selectedTab === "Lì Xì Vàng") return reward.name != 'Mã số may mắn';
        if (selectedTab === "Mã Số May Mắn") return reward.code;
    });

    const handleReceiveReward = (id: number) => {
        setRewardList(prevList =>
            prevList.map(reward =>
                reward.id === id ? { ...reward, status: "Đã nhận" } : reward
            )
        );
        Alert.alert("🎉 Chúc mừng!", "Bạn đã nhận thưởng thành công!");
    };

    const renderItem = ({ item }: { item: Reward }) => (
        <View style={styles.rewardItem}>
            {item.image && <Image source={item.image} style={styles.image} />}
            <Text style={styles.name}>{item.name}</Text>
            {item.code && <Text style={styles.code}>{item.code}</Text>}
            <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
            {item.status === "Chưa nhận" ? (
                <TouchableOpacity style={styles.button} onPress={() => handleReceiveReward(item.id)}>
                    <Text style={{ color: '#732F2F' }}>Trạng thái:</Text>
                    <Text style={styles.buttonText}>Chưa nhận</Text>
                </TouchableOpacity>
            ) : (
                <Text style={styles.receivedText}>Đã nhận</Text>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <Image style={styles.bgkholoc} source={require('../assets/background-kholoc.png')} />
            <View style={{ alignItems: 'center', marginTop: '10%' }}>
                <Svg height="40" width="319" viewBox="0 0 319 84" >
                    <Defs>
                        <SvgLinearGradient id="gradientText" x1="0%" y1="0%" x2="100%" y2="0%">
                            <Stop offset="0%" stopColor="#FAD93C" stopOpacity="0.6" />
                            <Stop offset="10%" stopColor="#FFE995" stopOpacity="11" />
                            <Stop offset="40%" stopColor="#FFF9D1" stopOpacity="1" />
                            <Stop offset="60%" stopColor="#FFF1AD" stopOpacity="0.6" />
                            <Stop offset="90%" stopColor="#FBE592" stopOpacity="1" />
                            <Stop offset="100%" stopColor="#FFD053" stopOpacity="0.6" />
                        </SvgLinearGradient>
                    </Defs>
                    <SvgText
                        fill="url(#gradientText)"
                        fontSize="66"
                        fontWeight="700"
                        x="25%"
                        y="48"
                        textAnchor="middle"
                        fontFamily="SVN-Cookies"
                    >
                        KHO LỘC
                    </SvgText>
                </Svg>
            </View>
            <View style={styles.logo}>
                <Image source={require('../assets/vinh-tuong.png')} />
            </View>
            <View style={styles.tabContainer}>
                {["Lắc Lộc Vàng", "Lì Xì Vàng", "Mã Số May Mắn"].map(tab => (
                    <TouchableOpacity key={tab} style={[styles.tab, selectedTab === tab && styles.selectedTab]} onPress={() => setSelectedTab(tab)}>
                        <Text style={[styles.tabText, selectedTab === tab && styles.selectedTabText]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.containerList}>
                <FlatList data={filteredRewards} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} numColumns={2} />
            </View>
            <BottomBar navigation={navigation} route={route} />
        </View>
    );
};

export default KhoLoc;

const styles = StyleSheet.create({
    receivedText: {
        color: "green",
        fontSize: 12,
        lineHeight: 13,
        fontWeight: "700",
        marginTop: 5,
    },
    container:
    {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff",
    },
    bgkholoc: {
        position: 'absolute',
        resizeMode: 'contain',
    },
    tabContainer:
    {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: '4%',
    },
    tab:
    {
        padding: 10,
        borderRadius: 10
    },
    logo: {
        alignItems: 'center',
    },
    selectedTab:
    {
        justifyContent: 'center',
        height: 55,
        backgroundColor: "#C2030B",
        margin: '2%',
    },
    tabText:
    {
        fontSize: 14,
        fontWeight: "500",
        color: "#C2030B",
        fontFamily: 'SVN-Cookies',
    },
    containerList: {
        backgroundColor: '#FFF',
        height: '65%',
        borderRadius: 10,
    },
    selectedTabText:
    {
        color: "white"

    },
    rewardItem:
    {
        flex: 1,
        alignItems: "center",
        // height: 155,
        // backgroundColor: "#FEEBC8",
        // // margin: 8,
        // padding: 10,
        // // borderRadius: 10
        // ,
    },
    image:
    {
        position: 'absolute',
        width: 200,
        height: 250,
        resizeMode: 'contain',
        top: '15%'
    },
    name:
    {
        position: 'absolute',
        alignItems: 'center',
        marginTop: '90%',
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center"
    },
    code: {
        position: 'absolute',
        top: '30%'
    },
    quantity: {
        marginTop: '130%',
    },
    button:
    {
        // padding: 8,
        // borderRadius: 5,
        // marginTop: 5
    },
    buttonText:
    {
        fontSize: 12,
        lineHeight: 13,
        fontWeight: "700",
        textAlign: "center",
        color: 'red',
        marginTop: 10,
    },
});
