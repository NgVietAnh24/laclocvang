// import React, { useState } from 'react';
// import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
// import { NativeStackScreenProps } from '@react-navigation/native-stack';
// import { RootStackParamList } from '../types/type';

// type Props = NativeStackScreenProps<RootStackParamList, "NotifyWebcome">;


// const NotifyWebcome: React.FC<Props> = ({ navigation }) => {
//     const [modalVisible, setModalVisible] = useState(true);

//     return (
//         <View style={styles.container}>
//             <Modal visible={modalVisible} transparent={true} animationType="fade">
//                 <View style={styles.modalContainer}>
//                     <View style={styles.modalContent}>
//                         <Text style={styles.modalText}>Chào mừng bạn đến với ứng dụng!</Text>
//                         <TouchableOpacity
//                             style={styles.okButton}
//                             onPress={() => {
//                                 setModalVisible(false);
//                                 navigation.navigate('OnboardLacLoc');
//                             }}
//                         >
//                             <Text style={styles.okText}>OK</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>
//             </Modal>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContainer: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     },
//     modalContent: {
//         backgroundColor: '#fff',
//         padding: 20,
//         borderRadius: 10,
//         alignItems: 'center',
//         width: 300,
//     },
//     modalText: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         marginBottom: 10,
//         textAlign: 'center',
//     },
//     okButton: {
//         backgroundColor: '#007BFF',
//         paddingVertical: 10,
//         paddingHorizontal: 20,
//         borderRadius: 5,
//         marginTop: 10,
//     },
//     okText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default NotifyWebcome;
