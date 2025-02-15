import React, { useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";

interface Reward {
    readonly id: number;
    readonly name: string;
    status: "Chưa nhận" | "Đã nhận";
    quantity: number;
    readonly image: any;
}

const KhoLoc = () => {
    const [selectedTab, setSelectedTab] = useState("Lắc Lộc Vàng");

    const lacLocVang: Reward[] = [
        { id: 1, name: "Phiếu mua hàng 500K", status: "Chưa nhận", quantity: 5, image: require("../assets/voucher500.png") },
        { id: 2, name: "Phiếu mua hàng 200K", status: "Chưa nhận", quantity: 4, image: require("../assets/voucher200.png") },
        { id: 3, name: "Phiếu mua hàng 100K", status: "Chưa nhận", quantity: 3, image: require("../assets/voucher100.png") },
        { id: 4, name: "Bộ đôi phụ kiện Vĩnh Tường", status: "Chưa nhận", quantity: 5, image: require("../assets/phukien.png") },
        { id: 5, name: "Một chỉ vàng PNJ 9999", status: "Chưa nhận", quantity: 2, image: require("../assets/1chi.png") },
        { id: 6, name: "Nửa chỉ vàng PNJ 9999", status: "Chưa nhận", quantity: 1, image: require("../assets/nuachi.png") },
    ];

    const liXiVang = lacLocVang.filter(item => item.name.includes("Phiếu mua hàng"));
    const maSoMayMan: Reward[] = [
        { id: 7, name: "Mã số may mắn 12345", status: "Chưa nhận", quantity: 1, image: require("../assets/somayman.png") },
        { id: 8, name: "Mã số may mắn 67890", status: "Chưa nhận", quantity: 1, image: require("../assets/somayman.png") },
    ];

    const getCurrentList = () => {
        switch (selectedTab) {
            case "Lì Xì Vàng":
                return liXiVang;
            case "Mã Số May Mắn":
                return maSoMayMan;
            default:
                return lacLocVang;
        }
    };

    const handleReceiveReward = (id: number) => {
        Alert.alert("🎉 Chúc mừng!", "Bạn đã nhận thưởng thành công!");
    };

    const renderItem = ({ item }: { item: Reward }) => (
        <View style={styles.rewardItem}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.name}>{item.name}</Text>
            <Text>Số lượng: {item.quantity}</Text>
            <Text style={{ color: item.status === "Đã nhận" ? "green" : "red" }}>
                Trạng thái: {item.status}
            </Text>
            {item.status === "Chưa nhận" && item.quantity > 0 && (
                <TouchableOpacity style={styles.button} onPress={() => handleReceiveReward(item.id)}>
                    <Text style={styles.buttonText}>Nhận thưởng</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Tabs */}
            <View style={styles.tabContainer}>
                {["Lắc Lộc Vàng", "Lì Xì Vàng", "Mã Số May Mắn"].map(tab => (
                    <TouchableOpacity key={tab} onPress={() => setSelectedTab(tab)} style={[styles.tabButton, selectedTab === tab && styles.activeTab]}>
                        <Text style={styles.tabText}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Danh sách phần thưởng */}
            <FlatList
                data={getCurrentList()}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
            />
        </View>
    );
};

export default KhoLoc;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 10, backgroundColor: "#fff" },
    tabContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
    tabButton: { paddingVertical: 8, paddingHorizontal: 15, borderBottomWidth: 2, borderBottomColor: "transparent" },
    activeTab: { borderBottomColor: "gold" },
    tabText: { fontSize: 16, fontWeight: "bold" },
    rewardItem: { flex: 1, alignItems: "center", backgroundColor: "#FEEBC8", margin: 8, padding: 10, borderRadius: 10 },
    image: { width: 80, height: 80, marginBottom: 10 },
    name: { fontSize: 16, fontWeight: "bold", textAlign: "center" },
    button: { backgroundColor: "gold", padding: 8, borderRadius: 5, marginTop: 5 },
    buttonText: { fontWeight: "bold", textAlign: "center" },
});
