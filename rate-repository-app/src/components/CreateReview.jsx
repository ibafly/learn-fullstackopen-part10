import { StyleSheet, View, Pressable } from "react-native"
import { useNavigate } from "react-router-native"
import { Formik } from "formik"

import useSignIn from "../hooks/useSignIn"
import FormikTextInput from "./FormikTextInput"
import * as yup from "yup"
import Text from "./Text"
import theme from "../theme"
import { useMutation } from "@apollo/client"
import { CREATE_REVIEW } from "../graphql/mutations"

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
  ownerUsername: "",
  repoName: "",
  rating: "",
  review: "",
}

const validationSchema = yup.object().shape({
  ownerUsername: yup.string().required("Repository owner name is required"),
  repoName: yup.string().required("Repository name is required"),
  rating: yup
    .number()
    .min(0, "Rating must be in range 0-100")
    .max(100, "Rating must be in range 0-100")
    .integer("Rating must be an integer")
    .required("Rating is required"),
  review: yup.string(),
})

const CreateReviewForm = ({ onSubmit }) => {
  return (
    <View style={styles.form}>
      <FormikTextInput
        name="ownerUsername"
        placeholder="Repository owner name"
      />
      <FormikTextInput name="repoName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput
        name="review"
        placeholder="Review"
        multiline={true}
        numberOfLines={5}
      />
      <Pressable onPress={onSubmit} style={styles.conformBtn}>
        <Text color="textReverse">Create a review</Text>
      </Pressable>
    </View>
  )
}

const CreateReviewContainer = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  )
}

const CreateReview = () => {
  const [createRiview, result] = useMutation(CREATE_REVIEW)
  const navigate = useNavigate()

  const handleCreateReview = async ({
    ownerUsername,
    repoName,
    rating,
    review,
  }) => {
    const reviewObj = {
      ownerName: ownerUsername,
      repositoryName: repoName,
      rating: Number(rating),
      text: review,
    }

    try {
      const { data } = await createRiview({ variables: { reviewObj } })

      navigate(`/repositories/${data.createReview.repositoryId}`, {
        replace: true,
      })
    } catch (error) {
      console.log(error)
    }
  }

  return <CreateReviewContainer onSubmit={handleCreateReview} />
}

export default CreateReview
