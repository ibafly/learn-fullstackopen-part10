import { StyleSheet, View } from "react-native"
import { Route, Routes, Navigate } from "react-router-native"
import { useState } from "react"

import useRepositories from "../hooks/useRepositories"
import Constants from "expo-constants"
import Text from "./Text"
import SignIn from "./SignIn"
import SignUp from "./SignUp"
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
  const [selectedOrder, setSelectedOrder] = useState("DESC-CREATED_AT")
  const { repositories, loading, refetch } = useRepositories(selectedOrder)
  console.log("selected order: ", selectedOrder)

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
        <Route path="/signup" element={<SignUp />} exact />
        <Route
          path="/"
          element={
            <RepositoryList
              repositories={repositories}
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
            />
          }
          exact
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  )
}

export default Main
