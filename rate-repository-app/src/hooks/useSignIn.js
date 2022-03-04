import { ApolloClient, useApolloClient, useMutation } from "@apollo/client"
import { SIGN_IN } from "../graphql/mutations"

import useAuthStorage from "./useAuthStorage"

const useSignIn = () => {
  const [login, result] = useMutation(SIGN_IN)
  const authStorage = useAuthStorage()
  const apolloClient = useApolloClient()

  const signIn = async credentials => {
    // return login({ variables: { credentials } })

    const { data } = await login({ variables: { credentials } })
    authStorage.setAccessToken(data.authenticate.accessToken)
    apolloClient.resetStore()
  }

  return [signIn, result]
}

export default useSignIn
