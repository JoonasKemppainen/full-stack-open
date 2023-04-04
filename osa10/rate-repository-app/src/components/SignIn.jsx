import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';

const initialValues = {
  username: "",
  password: "",
};

const styles = StyleSheet.create({
    input: {
      height: 50,
      margin: 12,
      borderWidth: 1,
      padding: 10,
      borderRadius: 3,
    },
    signin: {
        borderRadius: 3,
        margin: 12,
        color: "#FFFFFF",
        height: 55,
        backgroundColor: "#0165D4",
        textAlign: "center",
        textAlignVertical: "center"
    }
  });

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput 
        name="username" 
        placeholder="Username" 
        style={styles.input} />
      <FormikTextInput 
        name="password" 
        placeholder="Password" 
        style={styles.input}
        secureTextEntry={true} />
      <Pressable onPress={onSubmit}>
        <Text 
          color="white" 
          fontsize="subheading" 
          fontWeight="bold" 
          style={styles.signin}>Sign in</Text>
      </Pressable>
    </View>
  )
};

const SignIn = () => {
  const onSubmit = values => {
    console.log(values)
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn;