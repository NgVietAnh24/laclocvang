import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardLacLoc from './screens/onboard-lacloc';

const Stack = createNativeStackNavigator();

const App: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen name="Splash" options={{ headerShown: false }}>
          {({ navigation }) => (
            <View style={styles.container}>
              <Modal visible={modalVisible} transparent={true} animationType="fade">
                <View style={styles.modalContainer}>
                  <Image source={require('./assets/notifi.png')} />
                  <TouchableOpacity
                    style={styles.btn}
                    onPress={() => {
                      setModalVisible(false);
                      navigation.replace('Home');
                    }}
                  >
                    <Image
                      source={require('./assets/btn.png')}
                    />
                  </TouchableOpacity>
                </View>

              </Modal>
            </View>
          )}
        </Stack.Screen>

        <Stack.Screen name="Home" component={OnboardLacLoc} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: 300,
  },
  btn: {
    bottom: '8%'
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  okButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
  },
  okText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default App;
