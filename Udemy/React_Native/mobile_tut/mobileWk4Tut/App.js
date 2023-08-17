import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button, Alert } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Button style={styles.button} title="press me" />
      <Button
        title="press me 2"
        onPress={() => {
          Alert.alert("Button Pressed!");
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "purple",
    width: 20,
    height: 20,
  },
});
