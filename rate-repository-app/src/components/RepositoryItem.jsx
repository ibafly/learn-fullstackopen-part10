import { Pressable, Image, View, StyleSheet, Linking } from "react-native"
import Text from "./Text"

import theme from "../theme"
import useRepository from "../hooks/useRepository"

const styles = StyleSheet.create({
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
  info: {
    flexShrink: 1,
    marginLeft: 15,
    alignItems: "flex-start",
  },
  tag: {
    marginTop: 10,
    // flexGrow: 0,
    // flexShrink: 0,
    backgroundColor: theme.colors.primary,
    padding: 4,
    borderRadius: 5,
  },
  counts: {
    marginTop: 15,
    flexDirection: "row",
    flexGrow: 1,
    flexShrink: 1,
    justifyContent: "space-evenly",
  },
  count: {
    alignItems: "center",
  },
  conformBtn: {
    alignItems: "center",
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderStyle: "solid",
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 5,
    color: theme.colors.bgWhite,
    backgroundColor: theme.colors.primary,
  },
})

const formatCount = number => {
  if (number < 1000) {
    return number
  } else {
    return `${(number / 1000).toFixed(1).replace(/.0$/, "")}k`
  }
}

const RepositoryItemContainer = ({ item, isInSingleView }) => {
  return (
    <View style={styles.container} testID="repositoryItem">
      <View style={styles.header}>
        <Image source={{ uri: item.ownerAvatarUrl, width: 35, height: 35 }} />
        <View style={styles.info}>
          <Text>{item.fullName}</Text>
          <Text color="textSecondary">{item.description}</Text>
          <Text color="textReverse" style={styles.tag}>
            {item.language}
          </Text>
        </View>
      </View>
      <View style={styles.counts}>
        <View style={styles.count}>
          <Text>{formatCount(item.stargazersCount)}</Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View style={styles.count}>
          <Text>{formatCount(item.forksCount)} </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View style={styles.count}>
          <Text>{formatCount(item.reviewCount)} </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View style={styles.count}>
          <Text>{formatCount(item.ratingAverage)} </Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
      {isInSingleView && (
        <View>
          <Pressable
            style={styles.conformBtn}
            onPress={() => {
              Linking.openURL(item.url)
            }}
          >
            <Text color="textReverse">Open in GitHub</Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}

const RepositoryItem = ({ item, isInSingleView }) => {
  if (isInSingleView) {
    const { repository, loading } = useRepository()
    console.log("repo ", repository, loading)

    if (loading) {
      return <Text>loading...</Text>
    }

    return (
      <RepositoryItemContainer
        item={repository}
        isInSingleView={isInSingleView}
      />
    )
  }

  return <RepositoryItemContainer item={item} isInSingleView={isInSingleView} />
}

export default RepositoryItem
