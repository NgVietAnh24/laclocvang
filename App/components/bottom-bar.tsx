import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../types/type";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<RootStackParamList, keyof RootStackParamList>;

const BottomBar: React.FC<Props> = ({ navigation, route }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const { userId } = route.params as { userId: string };

    // Khôi phục selectedIndex từ AsyncStorage
    useEffect(() => {
        const loadIndex = async () => {
            const storedIndex = await AsyncStorage.getItem("selectedIndex");
            if (storedIndex !== null) {
                setSelectedIndex(parseInt(storedIndex, 10));
            }
        };
        loadIndex();
    }, []);

    const handlePress = async (index: number, screen: keyof RootStackParamList) => {
        setSelectedIndex(index);
        await AsyncStorage.setItem("selectedIndex", index.toString());

        if (screen === "TrangLac") {
            navigation.navigate(screen, { userId }); // Thay "ID_NGUOI_DUNG" bằng giá trị thực tế
        } else if (screen === "LiXiVang") {
            navigation.navigate(screen, { userId }); // Thay "ID_NGUOI_DUNG" bằng giá trị thực tế
        } else {
            navigation.navigate(screen, { userId });
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.btnBar, selectedIndex === 0 && styles.selectedButton]}
                onPress={() => handlePress(0, "TrangLac")}
            >
                <Image source={require('../assets/phone.png')} style={styles.icon} />
                <Text style={styles.label}>Lắc Lộc Vàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.btnBar, selectedIndex === 1 && styles.selectedButton1]}
                onPress={() => handlePress(1, "LiXiVang")}
            >
                <Image source={require('../assets/lixi.png')} style={styles.icon} />
                <Text style={styles.label}>Lì Xì Vàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.btnBar, selectedIndex === 2 && styles.selectedButton2]}
                onPress={() => handlePress(2, "KhoLoc")}
            >
                <Image source={require('../assets/kho-loc.png')} style={styles.icon} />
                <Text style={styles.label}>Kho Lộc</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
    },
    btnBar: {
        width: '33.3%',
        height: '115%',
        alignItems: 'center',
        padding: 10,
    },
    selectedButton: {
        backgroundColor: '#FFD233',
        borderTopLeftRadius: 12,
    },
    selectedButton1: {
        backgroundColor: '#FFD233',
    },
    selectedButton2: {
        borderTopRightRadius: 12,
        backgroundColor: '#FFD233',
    },
    icon: {
        resizeMode: 'contain',
    },
    label: {
        fontSize: 14,
        fontWeight: '400',
        color: '#C2030B',
        lineHeight: 18,
        fontFamily: 'SVN-Cookies'
    },
});

export default BottomBar;
