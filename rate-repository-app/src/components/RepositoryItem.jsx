import { Image, FlatList, View, StyleSheet } from "react-native"
import Text from "./Text"

import theme from "../theme"

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    flexGrow: 1,
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
})

const formatCount = number => {
  if (number < 1000) {
    return number
  } else {
    return `${(number / 1000).toFixed(1).replace(/.0$/, "")}k`
  }
}

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
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
    </View>
  )
}

export default RepositoryItem
