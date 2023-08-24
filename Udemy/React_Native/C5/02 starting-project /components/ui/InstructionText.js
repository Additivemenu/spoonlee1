import { Text, StyleSheet } from "react-native";

import Colors from "../../constants/color";

function InstructionText({ children, style }) {
  // pass a style props to inner component, which allows us to overwritten inner component
  // 's styling from outside
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    fontFamily: "open-sans",
    color: Colors.accent500,
    fontSize: 24,
  },
});
