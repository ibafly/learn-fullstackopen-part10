import { Pressable, View, StyleSheet } from "react-native"
import Constants from "expo-constants"
import theme from "../theme"

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
  },
})

const AppBar = () => {
  return (
    <View style={styles.container}>
      <Pressable onPress>
        <Text color="textReverse" style={styles.text}>
          Repositories
        </Text>
      </Pressable>
    </View>
  )
}

export default AppBar
