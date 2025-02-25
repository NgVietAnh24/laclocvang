import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet, Image, TouchableOpacity, Text, FlatList } from "react-native";
import { RootStackParamList } from "../types/type";
import BottomBar from "../components/bottom-bar";
import { useState } from "react";

type Props = NativeStackScreenProps<RootStackParamList, 'SieuThiPhuKien'>;

interface Reward {
    id: number;
    name: string;
    requirment: string;
    quantity: number;
    image?: any; // Hình ảnh chỉ có trong Lắc Lộc Vàng và Lì Xì Vàng
    background: string;
}

const SieuThiPhuKien: React.FC<Props> = ({ navigation, route }) => {

    const [rewardList, setRewardList] = useState<Reward[]>([
        { id: 1, name: "Phiếu mua hàng " + "\n" + "500K", requirment: "Chưa nhận", quantity: 5, image: require("../assets/voucher500.png"), background: require("../assets/voucher500.png") },
        { id: 2, name: "Phiếu mua hàng " + "\n" + "200K", requirment: "Chưa nhận", quantity: 4, image: require("../assets/voucher200.png"), background: require("../assets/voucher500.png") },
    ]);

    const renderItem = ({ item }: { item: Reward }) => (
        <View style={styles.rewardItem}>
            {item.image && <Image source={item.image} style={styles.image} />}
            <Text style={styles.name}>{item.name}</Text>
            {/* {item.code && <Text style={styles.code}>{item.code}</Text>} */}
            <Text style={styles.quantity}>Số lượng: {item.quantity}</Text>
            {/* {item.status === "Chưa nhận" ? (
                        <TouchableOpacity style={styles.button} onPress={() => handleReceiveReward(item.id)}>
                            <Text style={{ color: '#732F2F' }}>Trạng thái:</Text>
                            <Text style={styles.buttonText}>Chưa nhận</Text>
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.receivedText}>Đã nhận</Text>
                    )} */}
        </View>
    );
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
            <FlatList data={rewardList} renderItem={renderItem} keyExtractor={(item) => item.id.toString()} numColumns={1} />
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
    quantity: {
        marginTop: '130%',
    },
});