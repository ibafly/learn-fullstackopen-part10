import Constants from "expo-constants"
import { StyleSheet, View } from "react-native"
import Text from "./Text"
import { Route, Routes, Navigate } from "react-router-native"

import SignIn from "./SignIn"
import AppBar from "./AppBar"
import RepositoryList from "./RepositoryList"
import theme from "../theme"
import RepositoryItem from "./RepositoryItem"
import SingleRepository from "./SingleRepository"
import CreateReview from "./CreateReview"

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
      <AppBar />
      <Routes>
        <Route
          path="/repositories/:id"
          // element={<RepositoryItem isInSingleView={true} />}
          element={<SingleRepository />}
          exact
        />
        <Route path="/create" element={<CreateReview />} exact />
        <Route path="/signin" element={<SignIn />} exact />
        <Route path="/" element={<RepositoryList />} exact />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main
