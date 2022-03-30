import { gql } from "@apollo/client"

export const SIGN_IN = gql`
  mutation signIn($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`
export const CREATE_REVIEW = gql`
  mutation createReview($reviewObj: CreateReviewInput!) {
    createReview(review: $reviewObj) {
      repositoryId
    }
  }
`
export const CREATE_USER = gql`
  mutation createUser($credentials: CreateUserInput!) {
    createUser(user: $credentials) {
      username
    }
  }
`
export const DELETE_REVIEW = gql`
  mutation deleteReview($reviewId: ID!) {
    deleteReview(id: $reviewId)
  }
`
