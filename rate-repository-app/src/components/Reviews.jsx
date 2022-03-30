import { useMutation, useQuery } from "@apollo/client"
import React from "react"
import {
  FlatList,
  View,
  StyleSheet,
  Pressable,
  Dimensions,
  Alert,
} from "react-native"
import Text from "./Text"
import { format } from "date-fns"

import { ME } from "../graphql/queries"
import theme from "../theme"
import { useNavigate } from "react-router-native"
import { DELETE_REVIEW } from "../graphql/mutations"

const styles = StyleSheet.create({
  separator: {
    height: 10,
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
  btnContainer: {
    flexDirection: "row",
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: "space-between",
    marginTop: 12,
  },
  conformBtn: {
    flexGrow: 1,
    alignItems: "center",
    paddingVertical: 12,
    // paddingHorizontal: 18,
    paddingHorizontal: "auto",
    borderStyle: "solid",
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 5,
    color: theme.colors.bgWhite,
    backgroundColor: theme.colors.primary,
  },
  deleteBtn: {
    flexGrow: 1,
    alignItems: "center",
    marginLeft: 12,
    paddingVertical: 12,
    // paddingHorizontal: 18,

    borderStyle: "solid",
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 5,
    color: theme.colors.bgWhite,
    backgroundColor: theme.colors.bgWarning,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

const ReviewItem = ({ review, navigateOnPress, deleteOnPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.rating}>
          <Text color="primary" fontWeight="bold">
            {review.rating}
          </Text>
        </View>
        <View style={styles.info}>
          <Text fontWeight="bold">{review.repository.fullName}</Text>
          <Text color="textSecondary">
            {format(new Date(review.createdAt), "dd-MM-yyyy")}
          </Text>
          <Text>{review.text}</Text>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <Pressable
          style={styles.conformBtn}
          onPress={() => {
            navigateOnPress(`/repositories/${review.repositoryId}`, {
              replace: true,
            })
          }}
        >
          <Text color="textReverse">View repository</Text>
        </Pressable>
        <Pressable
          title="Delete review"
          style={styles.deleteBtn}
          onPress={() => {
            Alert.alert(
              // only shown on mobile, not on web
              "Delete review",
              "Are you sure you want to delete this review?",
              [
                { text: "CANCEL", onPress: () => {}, style: "cancel" },
                {
                  text: "DELETE",
                  onPress: () => {
                    deleteOnPress(review.id)
                  },
                },
              ],
              { cancelable: true }
            )
          }}
        >
          <Text color="textReverse">Delete review</Text>
        </Pressable>
      </View>
    </View>
  )
}

const Reviews = () => {
  const { data, refetch } = useQuery(ME, {
    variables: { includeReviews: true },
  })
  const [deleteReview, result] = useMutation(DELETE_REVIEW)
  const navigate = useNavigate()

  const handleDeleteReview = async id => {
    await deleteReview({ variables: { reviewId: id } })
    if (result) {
      refetch()
    }
  }

  const reviewNodes = data?.me.reviews
    ? data.me.reviews.edges.map(edge => edge.node)
    : []

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        // height: Dimensions.get("window"),
      }}
    >
      <FlatList
        //   data={repository.reviews.edges.node}
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <ReviewItem
            review={item}
            navigateOnPress={navigate}
            deleteOnPress={handleDeleteReview}
          />
        )}
        keyExtractor={({ id }) => id}
        // onEndReached={onEndReach}
        // onEndReachedThreshold={0.1}
      />
    </View>
  )
}

export default Reviews
