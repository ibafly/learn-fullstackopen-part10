import { FlatList, View, StyleSheet, Pressable } from "react-native"
// import { useState, useEffect } from "react"

import RepositoryItem from "./RepositoryItem"

import useRepositories from "../hooks/useRepositories"
import { useNavigate } from "react-router-native"

// import Constants from "expo-constants"

// const { APOLLO_URI } = Constants.manifest.extra

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

export const RepositoryListContainer = ({
  repositories,
  navigateOnPress: navigate,
}) => {
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      // other props
      renderItem={({ item, index, separators }) => (
        <Pressable
          onPress={() => {
            navigate(`/repositories/${item.id}`, { replace: true })
          }}
        >
          <RepositoryItem key={item.key} item={item} />
        </Pressable>
      )}
    />
  )
}

const RepositoryList = () => {
  const { repositories, loading, refetch } = useRepositories()
  const navigate = useNavigate()

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigateOnPress={navigate}
    />
  )
}

export default RepositoryList
