// import { StatusBar } from 'react-native';
import BackgroundImage from './components/BackgroundImage';
import {StatusBar} from 'expo-status-bar';
import { MainProvider } from './contexts/MainContext';
import Navigator from './navigators/Navigators';


const App = () => {
  return (
    <MainProvider>
      <Navigator></Navigator>
      <StatusBar style="auto" />
      {/* <BackgroundImage /> */}
    </MainProvider>
  );
};

export default App;
