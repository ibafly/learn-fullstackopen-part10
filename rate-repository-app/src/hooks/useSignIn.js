import { ApolloClient, useApolloClient, useMutation } from "@apollo/client"
import { LOGIN } from "../graphql/mutations"

import useAuthStorage from "./useAuthStorage"

const useSignIn = () => {
  const [login, result] = useMutation(LOGIN)
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
