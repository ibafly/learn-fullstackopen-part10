import { FlatList, View, StyleSheet } from "react-native"
// import { useState, useEffect } from "react"

import RepositoryItem from "./RepositoryItem"

import useRepositories from "../hooks/useRepositories"

// import Constants from "expo-constants"

// const { APOLLO_URI } = Constants.manifest.extra

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const RepositoryList = () => {
  const { repositories, loading, refetch } = useRepositories()

  //   const [repositories, setRepositories] = useState()

  //   const fetchRepositories = async () => {
  //     const response = await fetch(`http://${APOLLO_URI}:5000/api/repositories`)
  //     const json = await response.json()

  //     console.log(json)

  //     setRepositories(json)
  //   }

  //   useEffect(() => {
  //     fetchRepositories()
  //   }, [])

  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      // other props
      renderItem={({ item, index, separators }) => (
        <RepositoryItem key={item.key} item={item} />
      )}
    />
  )
}

export default RepositoryList
