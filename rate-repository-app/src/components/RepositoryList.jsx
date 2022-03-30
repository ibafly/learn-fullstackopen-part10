import { FlatList, View, StyleSheet, Pressable, Dimensions } from "react-native"
import { Picker } from "@react-native-picker/picker"
import { Searchbar } from "react-native-paper"
// import { useState, useEffect } from "react"

import RepositoryItem from "./RepositoryItem"

import useRepositories from "../hooks/useRepositories"
import { useNavigate } from "react-router-native"
import React, { useState } from "react"
import { useDebounce } from "use-debounce"
import theme from "../theme"

// import Constants from "expo-constants"

// const { APOLLO_URI } = Constants.manifest.extra

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  picker: {
    backgroundColor: theme.colors.bgGray,
    paddingVertical: 20,
    paddingStart: 18,
  },
})

const ItemSeparator = () => <View style={styles.separator} />

// export const RepositoryListContainer = ({
//   repositories,
//   navigateOnPress: navigate,
//   selectedOrder,
//   setSelectedOrder,
//   searchKeyword,
//   setSearchKeyword,
// }) => {
//   const repositoryNodes = repositories
//     ? repositories.edges.map(edge => edge.node)
//     : []

//   return (
//     <FlatList
//       data={repositoryNodes}
//       ItemSeparatorComponent={ItemSeparator}
//       renderItem={({ item, index, separators }) => (
//         <Pressable
//           onPress={() => {
//             navigate(`/repositories/${item.id}`, { replace: true })
//           }}
//         >
//           <RepositoryItem key={item.key} item={item} />
//         </Pressable>
//       )}
//       ListHeaderComponent={() => (
//         <>
//           <Searchbar
//             placeholder="Search"
//             onChangeText={query => setSearchKeyword(query)}
//             value={searchKeyword}
//           />
//           <Picker
//             style={styles.picker}
//             selectedValue={selectedOrder}
//             onValueChange={(itemValue, itemIndex) =>
//               setSelectedOrder(itemValue)
//             }
//             prompt="Select an item..."
//           >
//             <Picker.Item label="Latest repositories" value="DESC-CREATED_AT" />
//             <Picker.Item
//               label="Highest rated repositories"
//               value="DESC-RATING_AVERAGE"
//             />
//             <Picker.Item
//               label="Lowest rated repositories"
//               value="ASC-RATING_AVERAGE"
//             />
//           </Picker>
//         </>
//       )}
//     />
//   )
// }

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const { selectedOrder, setSelectedOrder, searchKeyword, setSearchKeyword } =
      this.props

    return (
      <>
        <Searchbar
          placeholder="Search"
          onChangeText={query => setSearchKeyword(query)}
          value={searchKeyword}
        />
        <Picker
          style={styles.picker}
          selectedValue={selectedOrder}
          onValueChange={(itemValue, itemIndex) => setSelectedOrder(itemValue)}
          prompt="Select an item..."
        >
          <Picker.Item label="Latest repositories" value="DESC-CREATED_AT" />
          <Picker.Item
            label="Highest rated repositories"
            value="DESC-RATING_AVERAGE"
          />
          <Picker.Item
            label="Lowest rated repositories"
            value="ASC-RATING_AVERAGE"
          />
        </Picker>
      </>
    )
  }

  render() {
    const { repositories, navigateOnPress: navigate, onEndReach } = this.props

    const repositoryNodes = repositories
      ? repositories.edges.map(edge => edge.node)
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
          data={repositoryNodes}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item, index, separators }) => (
            <Pressable
              onPress={() => {
                navigate(`/repositories/${item.id}`, { replace: true })
              }}
            >
              <RepositoryItem key={item.key} item={item} />
            </Pressable>
          )}
          ListHeaderComponent={this.renderHeader}
          onEndReached={onEndReach} // scroll loading work on android but not web
          onEndReachedThreshold={0.5}
        />
      </View>
    )
  }
}

const RepositoryList = (
  {
    // repositories,
    // selectedOrder,
    // setSelectedOrder,
    // searchKeyword,
    // setSearchKeyword,
    // onEndReach,
  }
) => {
  const navigate = useNavigate()

  const [searchKeyword, setSearchKeyword] = useState("")
  const [debouncedKeyword] = useDebounce(searchKeyword, 500)

  const [selectedOrder, setSelectedOrder] = useState("DESC-CREATED_AT")

  const { repositories, loading, refetch, fetchMore } = useRepositories({
    selectedOrder,
    searchKeyword: debouncedKeyword,
    first: 8,
  })
  console.log("selected order: ", selectedOrder)

  const onEndReach = () => {
    console.log("reached END")
    fetchMore()
  }

  return (
    <RepositoryListContainer
      repositories={repositories}
      navigateOnPress={navigate}
      selectedOrder={selectedOrder}
      setSelectedOrder={setSelectedOrder}
      searchKeyword={searchKeyword}
      setSearchKeyword={setSearchKeyword}
      onEndReach={onEndReach}
    />
  )
}

export default RepositoryList
