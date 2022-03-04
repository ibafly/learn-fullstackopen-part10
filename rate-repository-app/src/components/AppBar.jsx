import { ScrollView, Pressable, View, StyleSheet } from "react-native"
import Constants from "expo-constants"
import theme from "../theme"

import Text from "./Text"
import AppBarTab from "./AppBarTab"
import useAuthStorage from "../hooks/useAuthStorage"
import { useApolloClient, useQuery } from "@apollo/client"
import { ME } from "../graphql/queries"
import { useNavigate } from "react-router-native"

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.bgPrimary,
  },
})

const AppBar = () => {
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()
  const navigate = useNavigate()
  const { data, error, loading } = useQuery(ME)
  const loggedUser = data ? data.me : null

  const handleLogOut = async () => {
    await authStorage.removeAccessToken()
    apolloClient.resetStore()

    navigate("../signin", { replace: true })
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab label="Repositories" link="/" />
        {!loggedUser ? (
          <AppBarTab label="Sign in" link="/signin" />
        ) : (
          <>
            <AppBarTab label="Create a review" link="/create" />
            <AppBarTab
              label={`Sign out ${loggedUser.username}`}
              // link="/signin" // wrong, no call to onPress callback after link routing, use useNavigate hook instead.
              onPress={handleLogOut}
            />
          </>
        )}
      </ScrollView>
    </View>
  )
}

export default AppBar
