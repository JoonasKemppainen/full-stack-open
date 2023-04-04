import Text from './Text';
import FormikTextInput from './FormikTextInput';
import { Pressable, View } from 'react-native';
import { Formik } from 'formik';
import * as yup from "yup";
import styles from '../../styles/styles';

const initialValues = {
  username: "",
  password: "",
};

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required"),
  password: yup
    .string()
    .required("Password is required"),
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View>
      <FormikTextInput 
        name="username" 
        placeholder="Username" />
      <FormikTextInput 
        name="password" 
        placeholder="Password"
        secureTextEntry={true} />
      <Pressable onPress={onSubmit}>
        <Text 
          color="white" 
          fontsize="subheading" 
          fontWeight="bold" 
          style={styles.signin}>
          Sign in
        </Text>
      </Pressable>
    </View>
  )
};

const SignIn = () => {
  const onSubmit = values => {
    console.log(values)
  }

  return (
    <Formik 
      initialValues={initialValues} 
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn;