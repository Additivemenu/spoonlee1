import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { useState, useEffect } from "react";

export default function App() {
  const [clicked, setClicked] = useState(false);

  const clickButtonHandler = () => {
    setClicked((prevClicked)=> !prevClicked)
  };

  useEffect(()=>{
    console.log(clicked)
  },[clicked])

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Open up App.tsx to start working on your app!</Text>
      <Button title="click me!" onPress={clickButtonHandler} />
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
});
