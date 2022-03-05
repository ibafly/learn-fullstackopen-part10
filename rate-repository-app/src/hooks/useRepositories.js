import { useState, useEffect } from "react"

import { useQuery } from "@apollo/client"
import { GET_REPOSITORIES } from "../graphql/queries"

import Constants from "expo-constants"

// const { APOLLO_URI } = Constants.manifest.extra

const useRepositories = selectedOrder => {
  const [repositories, setRepositories] = useState()
  const [orderDirection, orderBy] = selectedOrder.split("-")
  //   const [loading, setLoading] = useState(false)
  const { data, error, loading, refetch } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: "cache-and-network",
    variables: { orderBy, orderDirection },
  })

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

  //   return { repositories, loading, refetch: fetchRepositories }
  return { repositories, loading, refetch }
}

export default useRepositories
