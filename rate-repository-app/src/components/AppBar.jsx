import { Pressable, View, StyleSheet } from "react-native"
import Constants from "expo-constants"
import theme from "../theme"

import Text from "./Text"
import AppBarTab from "./AppBarTab"

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.bgPrimary,
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab label="Repositories" link="/" />
      <AppBarTab label="Sign in" link="/signin" />
    </View>
  )
}

export default AppBar
