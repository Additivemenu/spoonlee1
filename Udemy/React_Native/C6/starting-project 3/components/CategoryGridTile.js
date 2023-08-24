import { Pressable, View, Text, StyleSheet, Platform } from "react-native";

function CategoryGridTile({ title, color }) {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}      // for android
        style={({ pressed }) => [                 // for iOS
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
      >
        <View style={[styles.innerContainer, {backgroundColor: color}]}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryGridTile;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,

    // shadow
    // on android
    elevation: 4,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    // on iOS
    backgroundColor: "white", // needs to have this for shadow to work
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffSet: { width: 0, height: 2 },
    shadowRadius: 8,
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1, // take up all available space from parent tag (first of all, parent tag needs to have some space available)
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
