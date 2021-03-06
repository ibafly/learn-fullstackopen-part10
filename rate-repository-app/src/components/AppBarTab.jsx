import { Pressable, View, StyleSheet } from "react-native"
import Constants from "expo-constants"
import theme from "../theme"
import { Link } from "react-router-native"

import Text from "./Text"

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.bgPrimary,
  },
  text: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingStart: 12,
    paddingEnd: 12,
  },
})

const AppBarTab = ({ label, link, onPress }) => {
  return link ? (
    <Pressable onPress={onPress}>
      <Link to={link}>
        <Text color="textReverse" style={styles.text}>
          {label}
        </Text>
      </Link>
    </Pressable>
  ) : (
    <Pressable onPress={onPress}>
      <Text color="textReverse" style={styles.text}>
        {label}
      </Text>
    </Pressable>
  )
}

export default AppBarTab
