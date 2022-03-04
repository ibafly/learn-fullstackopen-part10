import { useParams } from "react-router-native"
import { useQuery } from "@apollo/client"

import { GET_ONE_REPOSITORY } from "../graphql/queries"

const useRepository = () => {
  let { id } = useParams()
  const { loading, error, data } = useQuery(GET_ONE_REPOSITORY, {
    variables: { id },
    fetchPolicy: "cache-and-network",
  })

  return {
    repository: data?.repository || {},
    loading: loading,
    error: error,
  }
}

export default useRepository
