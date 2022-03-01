import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client"

import Constants from "expo-constants"

const { apolloUri: APOLLO_URI } = Constants.manifest.extra

const httpLink = createHttpLink({
  uri: `http://${APOLLO_URI}:4000/graphql`,
})

const createApolloClient = () => {
  return new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
  })
}

export default createApolloClient
