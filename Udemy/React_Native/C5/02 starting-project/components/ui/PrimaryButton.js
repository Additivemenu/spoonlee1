import { View, Text, Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/color";

// the primary button
function PrimaryButton({ children, onPress }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={(pressData) =>
          pressData.pressed
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
        }
        onPress={onPress} // forward callback to here
        android_ripple={{ color: Colors.primary600 }} // note to enable this, you need to have a View Outside of this Pressable
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    overflow: "hidden",
  },
  buttonInnerContainer: {
    backgroundColor: Colors.primary500,
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2, // add shadow for andorid
  },
  buttonText: {
    // note in RN, styling is not descending to descendants!
    color: "white",
    textAlign: "center",
  },
  pressed: {
    opacity: 0.75,
  },
});
