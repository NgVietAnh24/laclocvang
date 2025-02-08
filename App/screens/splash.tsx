import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash: React.FC<Props> = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <Image source={require('../assets/notifi.png')} />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setModalVisible(false);
              navigation.replace('OnboardLacLoc');
            }}
          >
            <Image source={require('../assets/btn.png')} />
          </TouchableOpacity>

        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  btn: {
    position: 'absolute',
    bottom: '39%',
    alignItems: 'center'
  },
});

export default Splash;