import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, StyleSheet, Image, TouchableOpacity, Text, FlatList, Alert } from "react-native";
import { RootStackParamList } from "../types/type";
import BottomBar from "../components/bottom-bar";
import { useEffect, useState } from "react";
import { counterEvent } from "react-native/Libraries/Performance/Systrace";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { fetchLuotLacById, listenLixiById, updateLixi } from "../slices/userSlice";

type Props = NativeStackScreenProps<RootStackParamList, 'SieuThiPhuKien'>;

interface Reward {
    id: number;
    name: string;
    requirment: number;
    quantity: number;
    count: number;
    image?: any; // Hình ảnh chỉ có trong Lắc Lộc Vàng và Lì Xì Vàng
    background: any;
}


const SieuThiPhuKien: React.FC<Props> = ({ navigation, route }) => {

    const { userId } = route.params;
    const dispatch = useDispatch<AppDispatch>();
    dispatch(fetchLuotLacById(userId));
    console.log('userId =====:', userId);
    const user = useSelector((state: RootState) =>
        state.users.data.find(user => user.id === userId)
    );
    const lixi = Number(useSelector((state: any) => state.users.lixi) || 0);


    useEffect(() => {
        const unsubscribe = dispatch(listenLixiById(userId));

        return () => {
            unsubscribe(); // Hủy lắng nghe khi component unmount
        };
    }, [dispatch, userId]);
    console.log('Số lượt lắc =====:', lixi);
    console.log('Số lượt lắc =====:', user);

    const [count, setCount] = useState(lixi);

    const [rewardList, setRewardList] = useState<Reward[]>([
        { id: 1, name: "Phiếu mua hàng " + "\n" + "100K", requirment: 44, quantity: 2500, image: require("../assets/100k.png"), background: require("../assets/bgSieuThiPhuKien.png"), count: 0 },
        { id: 2, name: "Phiếu mua hàng " + "\n" + "50K", requirment: 22, quantity: 5000, image: require("../assets/50k.png"), background: require("../assets/bgSieuThiPhuKien.png"), count: 0 },
    ]);

    const tang = (id: number) => {
        setRewardList(prevList =>
            prevList.map(reward =>
                reward.id === id ? { ...reward, count: reward.count + 1 } : reward
            )
        );
    }

    const giam = (id: number) => {
        setRewardList(prevList =>
            prevList.map(reward =>
                reward.id === id ? { ...reward, count: Math.max(reward.count - 1, 0) } : reward // Đảm bảo count không giảm xuống dưới 0
            )
        );
    }


    const doiNgay = (id: number) => {
        setRewardList(prevList => {
            const updatedList = prevList.map(reward => {
                if (reward.id === id) {
                    const totalRequired = reward.requirment * reward.count; // Tính tổng lì xì cần thiết
                    if (count >= totalRequired && reward.count > 0) {
                        // Nếu đủ lì xì để đổi
                        Alert.alert("Thành công", `Bạn đã đổi ${reward.name} thành công!`);

                        const newLixi = count - totalRequired; // Tính số lì xì còn lại
                        setCount(newLixi); // Cập nhật UI

                        // Gửi cập nhật lên Firestore
                        dispatch(updateLixi({ userId, lixi: newLixi }));

                        return { ...reward, count: 0 }; // Đặt lại số lượng phần thưởng đã đổi về 0
                    } else {
                        // Nếu không đủ lì xì
                        Alert.alert("Thất bại", "Bạn không đủ số lượng lì xì để đổi phần thưởng này hoặc chưa chọn số lượng.");
                    }
                }
                return reward;
            });
            return updatedList;
        });
    };

    const renderItem = ({ item }: { item: Reward }) => (
        <View style={styles.rewardItem}>
            {item.background && <Image source={item.background} style={styles.bgSieuThi} />}
            <View style={styles.containerList}>
                <View style={styles.imgVoucher}>
                    <Image source={item.image} style={styles.image} />
                    <Text style={styles.quatity}> (Còn lại: {item.quantity})</Text>
                </View>
                <View style={styles.textContent}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.requiment}>Yêu cầu: {item.requirment} lì xì</Text>
                    <View style={styles.btnTG}>
                        <TouchableOpacity onPress={() => giam(item.id)}>
                            <Image source={require('../assets/-.png')} />
                        </TouchableOpacity>
                        <Text style={styles.count}>{item.count}</Text>
                        <TouchableOpacity onPress={() => tang(item.id)}>
                            <Image source={require('../assets/+.png')} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => doiNgay(item.id)}>
                        <Image source={require('../assets/btnDoiNgay.png')} />
                    </TouchableOpacity>
                </View>


            </View>

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
            <View>
                <Image style={{ width: '100%', resizeMode: 'contain' }} source={require('../assets/footer.png')} />
                <Image style={styles.cloud} source={require('../assets/cloud.png')} />
                <View style={styles.footerContainner}>
                    <Text style={styles.textFooter}>Bạn đang có <Text style={styles.countLixi} >{count}</Text> lì xì</Text>
                </View>
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
    },
    background: {
        position: 'absolute',
        resizeMode: 'contain',
    },
    haedContainer: {
        marginTop: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    rewardItem:
    {
        flex: 1,
        alignItems: "center",
    },
    image:
    {
        resizeMode: 'contain',
    },
    name:
    {
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
        fontFamily: 'SVN-Cookies',
        color: '#FFE995',
    },
    requiment: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 18,
        color: '#FFF',
        paddingTop: 5,
        textAlign: 'center',
        paddingBottom: 5,
    },
    bgSieuThi: {
        margin: 10,
    },
    containerList: {
        flexDirection: 'row',
        position: 'absolute',
        alignItems: 'center',
        paddingTop: '10%',
    },
    imgVoucher: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: '10%'
    },
    textContent: {

    },
    btnTG: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginBottom: '5%',
    },
    quatity: {
        fontSize: 12,
        lineHeight: 14,
        fontWeight: '400',
        color: '#FFF',
        textAlign: 'center',
        marginTop: '3%',
    },
    count: {
        fontWeight: '400',
        fontSize: 18,
        lineHeight: 23,
        color: '#FFE933',
        fontFamily: 'SVN-Cookies',
    },
    cloud: {
        position: 'absolute',
        bottom: "20%",
        resizeMode: 'contain',
        width: '100%',
    },
    footerContainner: {
        position: 'absolute',
        left: '45%',
        top: '40%',
        transform: [
            { translateX: -50 },
            { translateY: -50 },
        ],

    },
    countLixi: {
        fontSize: 24,
        lineHeight: 24,
        fontWeight: '700',
        color: '#FFE933',
    },
    textFooter: {
        fontSize: 16,
        lineHeight: 24,
        fontWeight: '700',
        color: '#FFF',
        right: 13,
    },
});