import { StatusBar } from 'react-native';
import BackgroundImage from './components/BackgroundImage';
import Navigator from './navigators/Navigators';


const App = () => {
  return (
    <>
      <StatusBar barStyle={'dark-content'} />
      <BackgroundImage />
      <Navigator></Navigator>
    </>
  );
};

export default App;
