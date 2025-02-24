import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types/type';
import Splash from './screens/splash';
import OnboardLacLoc from './screens/onboard-lacloc';
import { Provider } from 'react-redux';
import store from './store/store';
import TrangLac from './screens/trangLac';
import KhoLoc from './screens/khoLoc';
import LiXiVang from './screens/liXiVang';
import QuickQuiz from './screens/giaiDapNhanh';
import LiXiVangPhuKien from './screens/liXiVangPhuKien';
import TetTranhTai from './screens/tetTranhTai';
import VitTuKhoan from './screens/vitTuKhoan';
import GameBanVit from './screens/gameBanVit';
import ThanhAnhKim from './screens/thanhAnhKim';
import GameAnhKim from './screens/gameAnhKim';
import SieuBaoVe from './screens/sieuBaoVe';
import GameBaoVe from './screens/gameBaoVe';
import SieuThiPhuKien from './screens/sieuThiPhuKien';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
          <Stack.Screen name="OnboardLacLoc" component={OnboardLacLoc} options={{ headerShown: false }} />
          <Stack.Screen name="TrangLac" component={TrangLac} options={{ headerShown: false }} />
          <Stack.Screen name="KhoLoc" component={KhoLoc} options={{ headerShown: false }} />
          <Stack.Screen name="LiXiVang" component={LiXiVang} options={{ headerShown: false }} />
          <Stack.Screen name="QuickQuiz" component={QuickQuiz} options={{ headerShown: false }} />
          <Stack.Screen name="LiXiVangPhuKien" component={LiXiVangPhuKien} options={{ headerShown: false }} />
          <Stack.Screen name="TetTranhTai" component={TetTranhTai} options={{ headerShown: false }} />
          <Stack.Screen name="VitTuKhoan" component={VitTuKhoan} options={{ headerShown: false }} />
          <Stack.Screen name="GameBanVit" component={GameBanVit} options={{ headerShown: false }} />
          <Stack.Screen name="ThanhAnhKim" component={ThanhAnhKim} options={{ headerShown: false }} />
          <Stack.Screen name="GameAnhKim" component={GameAnhKim} options={{ headerShown: false }} />
          <Stack.Screen name="SieuBaoVe" component={SieuBaoVe} options={{ headerShown: false }} />
          <Stack.Screen name="GameBaoVe" component={GameBaoVe} options={{ headerShown: false }} />
          <Stack.Screen name="SieuThiPhuKien" component={SieuThiPhuKien} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};



export default App;
