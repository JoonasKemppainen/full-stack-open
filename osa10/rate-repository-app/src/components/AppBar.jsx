import { View, StyleSheet, ScrollView } from 'react-native';
import { Link } from 'react-router-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    height: 100,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#24292e",
  },
  link: {
    marginRight: 20,
  }
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/" style={styles.link}>
          <Text fontWeight="bold" fontSize="subheading" color="white">Repositories</Text>
        </Link>
        <Link to="/signin" style={styles.link}>
          <Text fontWeight="bold" fontSize="subheading" color="white">Sign In</Text>
        </Link>
      </ScrollView>  
    </View>
    )
};

export default AppBar;