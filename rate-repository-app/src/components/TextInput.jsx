import { TextInput as NativeTextInput, StyleSheet } from "react-native"
import theme from "../theme"

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderStyle: "solid",
    borderColor: theme.colors.bgGray,
    borderWidth: 2,
    borderRadius: 5,
  },
})

const TextInput = ({ style, error, ...props }) => {
  const textInputStyle = [styles.container, style]

  return <NativeTextInput style={textInputStyle} {...props} />
}

export default TextInput
