import { View, FlatList, StyleSheet } from "react-native"
import Text from "./Text"
import { format } from "date-fns"

import { RepositoryItemContainer } from "./RepositoryItem"
import useRepository from "../hooks/useRepository"
import theme from "../theme"

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  container: {
    flexGrow: 0,
    flexShrink: 1,
    backgroundColor: theme.colors.bgWhite,
    padding: 12,
  },
  header: {
    flexDirection: "row",
    flexGrow: 1,
    flexShrink: 1,
  },
  rating: {
    alignItems: "center",
    justifyContent: "space-around",
    width: 35,
    height: 35,
    borderStyle: "solid",
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 17.5,
  },
  info: {
    flexShrink: 1,
    marginLeft: 15,
    alignItems: "flex-start",
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const ReviewItem = ({ review }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.rating}>
          <Text color="primary" fontWeight="bold">
            {review.rating}
          </Text>
        </View>
        <View style={styles.info}>
          <Text fontWeight="bold">{review.user.username}</Text>
          <Text color="textSecondary">
            {format(new Date(review.createdAt), "dd-MM-yyyy")}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  )
}

const SingleRepository = () => {
  const { repository, loading } = useRepository()
  console.log("repo ", repository, loading)

  if (loading) {
    return <Text>loading...</Text>
  }
  console.log(repository.reviews)
  const reviewNodes = repository
    ? repository.reviews.edges.map(edge => edge.node)
    : []

  return (
    <FlatList
      //   data={repository.reviews.edges.node}
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => (
        <RepositoryItemContainer item={repository} isInSingleView={true} />
      )}
      ListHeaderComponentStyle={styles.marginBottom10}
    />
  )
}

export default SingleRepository
