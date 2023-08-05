import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";

function GoalItem(props) {
  return (
    // bind():  a bit like reflection in java
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#dddddd" }} // android only
        onPress={props.onDeleteItem.bind(this, props.id)}
        style={({ pressed }) => {
          // built-in state for detecting if Pressable component is pressed
          console.log("pressed!");
          return pressed && styles.pressedItem; // like conditional style
        }}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  goalItem: {
    margin: 8,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
    color: "white", // style does not cascade in React Native unlike real css
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "white",
    padding: 8,
  },
});

export default GoalItem;
