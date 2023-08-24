import { useState } from "react";
import { TextInput, View, StyleSheet, Alert } from "react-native";
import Colors from "../constants/color";

import Card from "../components/ui/Card";
import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ onPickNumber }) {
  // states
  const [enteredNumber, setEnteredNumber] = useState(""); // note type is string, as what we get from input is always a string

  // callbacks handlers -------------------------------
  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber("");
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber); // a global method, string -> int

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // show alert ...
      Alert.prompt(
        "Invalid number",
        "Number has to be a number between 1 and 99",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      );

      return;
    }

    // ! functional component at higher level retrive user input
    onPickNumber(chosenNumber);
  }

  // jsx --------------------------------------------------------
  return (
    <View style={styles.rootContainer}>
      <Title>Guess My Number</Title>

      <Card>
        <InstructionText>
          Enter a Number
        </InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={2}
          keyboardType="number-pad" // check RN doc for more specs
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={numberInputHandler}
          value={enteredNumber} // 2-way binding
        />

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    alignItems: "center",
  },

  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: Colors.accent500,
    marginVertical: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1, // takes up as much available space as it can
  },
});
