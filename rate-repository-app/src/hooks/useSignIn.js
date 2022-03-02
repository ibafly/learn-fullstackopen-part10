import { useMutation } from "@apollo/client"
import { LOGIN } from "../graphql/mutations"

const useSignIn = () => {
  const [login, result] = useMutation(LOGIN)

  const signIn = async credentials => {
    return login({ variables: { credentials } })
  }

  return [signIn, result]
}

export default useSignIn
