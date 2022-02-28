import Text from "./Text"
import FormikTextInput from "./FormikTextInput"
import { StyleSheet, View, Pressable } from "react-native"
import { Formik } from "formik"
import theme from "../theme"

const styles = StyleSheet.create({
  signInForm: {
    paddingHorizontal: 12,
    // paddingVertical: 16,
    paddingBottom: 12,
    backgroundColor: theme.colors.bgWhite,
  },
  formSubmitBtn: {
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderStyle: "solid",
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 5,
    color: theme.colors.bgWhite,
    backgroundColor: theme.colors.primary,
  },
})

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.signInForm}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <Pressable onPress={onSubmit} style={styles.formSubmitBtn}>
        <Text color="textReverse">Sign in</Text>
      </Pressable>
    </View>
  )
}
const SignIn = () => {
  const initialValues = {
    username: "",
    password: "",
  }

  const onSubmit = values => {
    console.log(values)
  }
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
