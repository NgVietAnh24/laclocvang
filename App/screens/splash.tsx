import React, { useState } from 'react';
import { View, Modal, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/type';
import TextInputUser from '../components/TextInput';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store/store';
import { addUser } from '../slices/userSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const Splash: React.FC<Props> = ({ navigation, route }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [name, setName] = useState('');
  const [lixi, setLiXi] = useState(0);
  const [luotLac, setLuotLac] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const khoLocId = route.params?.khoLocId ?? '';

  const btnSubmit = () => {

    if (name.length === 0) {
      Alert.alert('Chưa nhập tên ⚠️⚠️⚠️');
      return;
    }
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd/MM/yyyy HH:mm:ss');
    console.log(formattedDate);

    dispatch(
      addUser({
        khoLocId,
        name: name.trim(),
        lixi: lixi,
        luotLac: luotLac,
        createdAt: formattedDate,
      })
    )
      .unwrap()
      .then((newUser) => {
        if (!newUser.id) {
          console.error('User ID is missing:', newUser);
          return;
        }
        navigation.replace('OnboardLacLoc', { userId: newUser.id });
      })

      .catch((error) => {
        console.error('Lỗi khi thêm user:', error);
      });
  }

  return (
    <View style={styles.container}>
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalContainer}>
          <Image source={require('../assets/notifi.png')} />
          <TextInputUser title='' color='gray' placeholder='Nhập tên bạn ...' width={230} value={name} onChangeText={setName} />
          <TouchableOpacity
            style={styles.btn}
            onPress={() => btnSubmit()}
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
    bottom: '43%',
    alignItems: 'center'
  },
});

export default Splash;