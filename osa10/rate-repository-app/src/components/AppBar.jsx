import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    height: 100,
    justifyContent: "center",
    backgroundColor: "#24292e",
  },
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
        <Text fontWeight="bold" fontSize="subheading" color="white">Repositories</Text>
    </View>
    )
};

export default AppBar;