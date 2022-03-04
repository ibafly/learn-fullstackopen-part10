import { Pressable, View, StyleSheet } from "react-native"
import { useNavigate } from "react-router-native"
import { useMutation } from "@apollo/client"
import { Formik } from "formik"
import { CREATE_USER } from "../graphql/mutations"

import * as yup from "yup"
import FormikTextInput from "./FormikTextInput"
import Text from "./Text"
import theme from "../theme"
import useSignIn from "../hooks/useSignIn"

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 12,
    // paddingVertical: 16,
    paddingBottom: 12,
    backgroundColor: theme.colors.bgWhite,
  },
  conformBtn: {
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
  passwordAgain: "",
}

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(1, "Username must be 1-30 characters long")
    .max(30, "Username must be 1-30 characters long")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be 5-50 characters long")
    .max(50, "Password must be 5-50 characters long")
    .required("Password is required"),
  passwordAgain: yup
    .string()
    .oneOf([yup.ref("password"), null])
    .required("Password confirmation is required"),
})

const SignUpForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput name="username" placeholder="Username" />
      <FormikTextInput name="password" placeholder="Password" secureTextEntry />
      <FormikTextInput
        name="passwordAgain"
        placeholder="Password confirmation"
        secureTextEntry
      />
      <Pressable onPress={onSubmit} style={styles.conformBtn}>
        <Text color="textReverse">Sign up</Text>
      </Pressable>
    </View>
  )
}

const SignUpContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const SignUp = ({}) => {
  const [createUser, result] = useMutation(CREATE_USER)
  const [signIn] = useSignIn()
  const navigate = useNavigate()

  const handleSignUp = async ({ username, password }) => {
    try {
      await createUser({ variables: { credentials: { username, password } } })
      await signIn({ username, password })
      navigate("/", { replace: true })
    } catch (error) {
      console.log(error)
    }
  }
  return <SignUpContainer onSubmit={handleSignUp} />
}

export default SignUp
