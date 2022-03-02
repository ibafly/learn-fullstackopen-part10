import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

import Constants from "expo-constants"

const { apolloUri: APOLLO_URI } = Constants.manifest.extra

const httpLink = createHttpLink({
  uri: `http://${APOLLO_URI}:4000/graphql`,
})

const createApolloClient = authStorage => {
  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken()
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bear ${accessToken}` : "",
        },
      }
    } catch (error) {
      console.log(error)
      return { headers }
    }
  })

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
