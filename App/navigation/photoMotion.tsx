import React, { useRef, useEffect, useState } from 'react';
import { View, Image, FlatList, StyleSheet, Dimensions, ListRenderItemInfo } from 'react-native';

const { width } = Dimensions.get('window');

const images: number[] = [
    require('../assets/img-laclocvang.png'),
    require('../assets/person.png'),
    require('../assets/khoan.png'),
    require('../assets/gach.png'),
];

const PhotoMotion: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const flatListRef = useRef<FlatList<number>>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const nextIndex = (prevIndex + 1) % images.length;
                flatListRef.current?.scrollToIndex({ index: nextIndex, animated: nextIndex !== 0 });
                return nextIndex;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const renderItem = ({ item }: ListRenderItemInfo<number>) => (
        <Image source={item} style={styles.image} />
    );

    return (
        <View style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={images}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onMomentumScrollEnd={(event) => {
                    const index = Math.floor(event.nativeEvent.contentOffset.x / width);
                    setCurrentIndex(index);
                }}
            />
            <View style={styles.dotsContainer}>
                {images.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            {
                                backgroundColor: currentIndex === index ? 'red' : 'transparent',
                                borderWidth: currentIndex === index ? 0 : 2,
                                borderColor: currentIndex === index ? 'transparent' : 'red',
                            },
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 400,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: width,
        height: 300,
        resizeMode: 'contain',
    },
    dotsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: '20%',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        borderWidth: 2,
        borderColor: 'red',
        marginHorizontal: 5,
    },
});

export default PhotoMotion;