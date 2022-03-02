import Text from "./Text"
import FormikTextInput from "./FormikTextInput"
import { StyleSheet, View, Pressable } from "react-native"
import { Navigate, useNavigate } from "react-router-native"
import { Formik } from "formik"
import * as yup from "yup"
import theme from "../theme"
import useSignIn from "../hooks/useSignIn"

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

const initialValues = {
  username: "",
  password: "",
}

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
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
  const [signIn, result] = useSignIn()
  const navigate = useNavigate()

  const onSubmit = async values => {
    console.log(values)
    const { username, password } = values
    try {
      await signIn({ username, password })
      navigate("../", { replace: true })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

export default SignIn
