import { useState, useEffect } from "react";
import { Text, View, StyleSheet, Alert, FlatList } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Title from "../components/ui/Title";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

// game logic function
function generateRandomBetween(min, max, exclude) {
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

// component function
function GameScreen({ userNumber, onGameOver }) {
  // hooks ----------------------------------------------------------------------------
  // every time GameScreen is rendered, phone do a guess
  const initalGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initalGuess);
  const [guessRounds, setGuessRounds] = useState([initalGuess]);

  // runs after render cycle
  useEffect(() => {
    console.log(currentGuess);
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]); // normally, every variable appears in the callback should be in dependency

  // reset min, max bound when initially evaluate this component
  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  // for debugging
  useEffect(() => {
    console.log("guessRounds: ", guessRounds);
  }, [guessRounds]);

  // callback handlers ----------------------------------------------------------------
  function nextGuessHandler(direction) {
    // stop malicious user from incorrect click purposely
    if (
      (direction === "lower" && currentGuess < userNumber) ||
      (direction === "greater" && currentGuess > userNumber)
    ) {
      Alert.alert("Don't lie!", "You know this is wrong...", [
        { text: "Sorry!", style: "camcel" },
      ]);
      return;
    }

    // direction => 'loweer', greater'
    if (direction === "lower") {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
      console.log("min updated: ", minBoundary);
    }
    console.log(minBoundary, maxBoundary);

    // take new guess
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => {
      return [newRndNumber, ...prevGuessRounds];
    });
  }

  const guessRoundListLength = guessRounds.length;

  // jsx --------------------------------------------------------------------------------
  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card>
        <InstructionText style={styles.instructionText}>
          Higher or lower?
        </InstructionText>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white"></Ionicons>
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} color="white"></Ionicons>
            </PrimaryButton>
          </View>
        </View>
      </Card>

      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundListLength - itemData.index} guess={itemData.item}/>}
          keyExtractor={(item)=>item}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1, // take all availbale space
    padding: 12,
  },
  instructionText: {
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1, // takes up as much available space as it can
  },
  listContainer: {
    flex: 1,
    padding: 16

  }
});
