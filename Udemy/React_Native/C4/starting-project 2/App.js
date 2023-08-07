import { StyleSheet, View } from "react-native";
import StartGameScreen from "./screens/StartGameScreen";

export default function App() {
  return (
    // <View style={styles.rootScreen}>
    // <View>
    //   <StartGameScreen />;
    // </View>

    <StartGameScreen />
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1, // <View> by default only takes up space as much as it need. We can force it to use all space using `flex:1`
    backgroundColor: "#ddb52f",
  },
});
