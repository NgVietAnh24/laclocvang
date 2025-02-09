import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/type';
import Splash from './screens/splash';
import OnboardLacLoc from './screens/onboard-lacloc';
import { Provider } from 'react-redux';
import store from './store/store';
import TrangLac from './screens/trangLac';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="OnboardLacLoc" component={OnboardLacLoc} options={{ headerShown: false }} />
          <Stack.Screen name="TrangLac" component={TrangLac} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};



export default App;
