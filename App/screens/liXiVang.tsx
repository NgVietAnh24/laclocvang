import React from "react";
import { Image, View, StyleSheet } from "react-native";

const LiXiVang: React.FC = () => {
    return (
        <View>
            <Image style={styles.background} source={require('../assets/bgLiXiVang.png')} />
        </View>
    );
}
const styles = StyleSheet.create({
    background: {
        resizeMode: 'cover',
    },
});

export default LiXiVang;