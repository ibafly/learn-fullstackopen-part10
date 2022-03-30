import { useState, useEffect } from "react"

import { useQuery } from "@apollo/client"
import { GET_REPOSITORIES } from "../graphql/queries"

import Constants from "expo-constants"

// const { APOLLO_URI } = Constants.manifest.extra

// const useRepositories = (selectedOrder, searchKeyword) => {
const useRepositories = ({ selectedOrder, ...otherVars }) => {
  const [repositories, setRepositories] = useState()
  const [orderDirection, orderBy] = selectedOrder.split("-")
  //   const [loading, setLoading] = useState(false)
  console.log("orderDirection: ", orderDirection, " orderBy: ", orderBy)
  const { data, error, loading, refetch, fetchMore } = useQuery(
    GET_REPOSITORIES,
    {
      variables: { orderBy, orderDirection, ...otherVars },
      fetchPolicy: "cache-and-network",
    }
  )

  //   const fetchRepositories = async () => {
  // setLoading(true)

  // const response = await fetch(`http://${APOLLO_URI}:5000/api/repositories`)
  // const json = await response.json()

  // setLoading(false)
  // setRepositories(json)

  //     await refetch()
  //     if(!loading){
  //         setRepositories(data)
  //     }
  //   }

  //   useEffect(() => {
  //     fetchRepositories()
  //   }, [])

  useEffect(() => {
    if (data) {
      console.log(data.repositories)
      setRepositories(data.repositories)
    }
  }, [data])

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage

    if (!canFetchMore) {
      return
    }
    console.log("now can Fetch more")

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        orderBy,
        orderDirection,
        ...otherVars,
        // searchKeyword,
      },
    })
  }

  //   return { repositories, loading, refetch: fetchRepositories }
  return { repositories, loading, refetch, fetchMore: handleFetchMore }
}

export default useRepositories
