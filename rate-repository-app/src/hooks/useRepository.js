import { useParams } from "react-router-native"
import { useQuery } from "@apollo/client"

import { GET_ONE_REPOSITORY } from "../graphql/queries"

const useRepository = vars => {
  let { id } = useParams()
  const { loading, error, data, fetchMore } = useQuery(GET_ONE_REPOSITORY, {
    variables: { id, ...vars },
    fetchPolicy: "cache-and-network",
  })

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data?.repository.reviews.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        id,
        ...vars,
      },
    })
  }

  return {
    repository: data?.repository || {},
    loading: loading,
    error: error,
    fetchMore: handleFetchMore,
  }
}

export default useRepository
