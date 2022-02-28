import Constants from "expo-constants"
import { StyleSheet, View } from "react-native"
import Text from "./Text"

import AppBar from "./AppBar"
import RepositoryList from "./RepositoryList"
import theme from "../theme"

const styles = StyleSheet.create({
  container: {
    // marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.bgGray,
  },
})

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar></AppBar>
      {/* <Text fontWeight="bold" color="primary">
        Rate Repository Application
      </Text> */}
      <RepositoryList />
    </View>
  )
}

export default Main
