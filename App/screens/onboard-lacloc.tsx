import React, { useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { RootStackParamList } from '../types/type';
import PhotoMotion from '../navigation/photoMotion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { fetchImageUrls } from '../slices/imageSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'OnboardLacLoc'>;

const OnboardLacLoc: React.FC<Props> = ({ navigation }) => {
    // const [fontsLoaded] = useFonts({
    //     'SVN-Cookies': require('../assets/fonts/SVN-Cookies.ttf'),
    // });

    // if (!fontsLoaded) {
    //     return <AppLoading />;
    // }

    const dispatch = useDispatch<AppDispatch>();
    const { imageUrls, loading, error } = useSelector((state: RootState) => state.images);

    useEffect(() => {
        dispatch(fetchImageUrls([
            'images/gach.png',
            'images/img-laclocvang.png',
            'images/khoan.png',
            'images/person.png',
        ]));
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../assets/bacground.png')} />
            <View style={styles.header}>
                <TouchableOpacity style={{ right: '10%' }}>
                    <Image source={require('../assets/back.png')} />
                </TouchableOpacity>
                <Text style={styles.huongDan}>HƯỚNG DẪN</Text>
            </View>
            <PhotoMotion />
            <View style={styles.group}>
                <Image style={{ position: 'absolute' }} source={require('../assets/nen.png')} />
                <Text style={styles.textNen}>
                    Lắc chắt chiu từng lượt
                    Nhận ngay 1 phần quà

                    Lắc tới bến chục lượt
                    Nhận một lúc 10 phần quà!
                </Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('TrangLac')} style={styles.btn2}>
                <Image source={require('../assets/btn2.png')} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        zIndex: 0,
    },
    btn2: {
        top: '7%',
    },
    textNen: {
        color: '#FFF',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 19,
        width: 230,
        textAlign: 'center',
    },
    header: {
        flexDirection: 'row',
        right: '7%',
        bottom: '5%',
    },
    group: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    huongDan: {
        fontSize: 24,
        lineHeight: 33,
        fontWeight: '400',
        textAlign: 'center',
        fontFamily: 'SVN-Cookies',
        color: '#C2030B',
    },
});

export default OnboardLacLoc;