import {
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';
import { Card } from '@rneui/themed';

const Upload = ({navigation}) => {
  return (
    <Card>
      <Card.Image
        source={{}}
      />
    </Card>
  );
};


Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
