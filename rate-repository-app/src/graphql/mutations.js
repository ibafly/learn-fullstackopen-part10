import { gql } from "@apollo/client"

export const LOGIN = gql`
  mutation login($credentials: AuthenticateInput!) {
    authenticate(credentials: $credentials) {
      accessToken
    }
  }
`
