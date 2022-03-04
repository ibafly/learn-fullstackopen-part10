import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation login($credentials: AuthenticateInput!) {
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
