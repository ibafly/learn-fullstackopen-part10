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

export const RepositoryListContainer = ({ repositories }) => {
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

const RepositoryList = () => {
  const { repositories, loading, refetch } = useRepositories()

  return <RepositoryListContainer repositories={repositories} />
}

export default RepositoryList
