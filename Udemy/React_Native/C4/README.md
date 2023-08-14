C4 Diving deeper into components, Layouts & styling-building a Mini-Game App

+ C2 的加强版



Contents (P45-78):

+ :gem: Build another complete demo app
  + it has multiple screens!

+ More new core components
+ Complex layouts & styles
+ Adding reusable customized components & styling





Target App Description

+ In a game start up UI, Player input a number to phone. 

+ In a game UI, phone will iteratively guess a number and get feedback from user saying if the guess is lower or higher, the feedback will also be logged. 

+ At last, if the guess is right, switch to another screen saying game over! 





Screen Component breakdown, Screen folder > 

+ StartGameScreen.js
+ GameScreen.js
+ GameOverScreen.js



# Part1: Startup screen

:gem: 01-starting-project



48-

Component:

+ Custom button
  + Visual feedback when pressed on android & iOS
    + for android, to make android_ripple property of <Pressable> work, need a <View> wrapping <Pressable>
    + on iOS, use conditional styling

+ TextInput: more configs
+ Background 
  + :bangbang: <View> by default only takes up space as much as it need. We can force it to use all space using `flex:1`
  + Add gradient background
    + <LinearGradient>: https://docs.expo.dev/versions/latest/sdk/linear-gradient/
  + Add background image
    + <ImageBackground>: its properties
      + It can co-exist with gradient background also

Styling:  

+ Add shadow on Android & iOS



demo

01 starting-project







# Part2: Game srceen

57-

:gem: 02-starting-project



## User input as state & validation

57-58

+ manage user input as state
  + note what we received from input is alway a string!
  + 2-way binding
+ validate user input when press 'Confirm' button
  + pass callback to our customize component
    + 一般callback handler的命名和component涉及的event对应起来
  + Alert pop up if validation fails



```js
import { useState } from "react";
import { TextInput, View, StyleSheet, Alert } from "react-native";
import PrimaryButton from "../components/PrimaryButton";

function StartGameScreen() {
  // hooks -------------------------------------------------------
  const [enteredNumber, setEnteredNumber] = useState(""); // note type is string, as what we get from input is always a string

  // callbacks handlers (just register callbacks) -------------------------------------------
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

    console.log('Valid number!')
  }

  // jsx --------------------------------------------------------
  return (
    <View style={styles.inputContainer}>
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
    </View>
  );
}
```







## Switch screen 

We just use basic method to do screen switching. We will learn navigation in later course



+ Conditional component. 
  + We use this as the main idea for sreen switching. Once user input is valid, we then switch to game screen

+ refresh react pattern: state-lifting, functional-component & non-functional component
  + Functional-component at higher level can pass its callback handlers to its non-functional sub-component to retrive data or input by user. e.g. App.js passes a handler to StartGameScreen component to retrive user input



now that a react component has 4 sections:

App.js

```js
const App = () => {
	// hooks ---------------------------------------------------
	const [userNumber, setUserNumber] = useState();
  
	// callback handlers ----------------------------------------
  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }
  
	// jsx variable (for conditional component) -----------------
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler}/>;
  if (userNumber) {
    screen = <GameScreen />;
  }
  
	// jsx ------------------------------------------------------
 return (
    <LinearGradient colors={["#4e0329", "#ddb52f"]} style={styles.rootScreen}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        {screen}
      </ImageBackground>
    </LinearGradient>
  );
}
```

StartGameScreen.js

+ 把parent component的callback handler通过props传递进来, 当user confirm input时来让parent component读取user input

```js
function StartGameScreen({onPickNumber}) {
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
			
    	// ************** functional component at higher level retrieve user input ****************
      onPickNumber(chosenNumber);		
  }
  
  // jsx...
} 
```





## Start work on Game screen

60-



先打GameScreen的skeleton, 设计好再去写





<SafeAreaView/>

App.js

+ 用SafeAreaView包裹{screen} 可以自动添加paddings, 避开手机屏幕上方的notches, 更方便
+ :bangbang: again, note styling in RN is not descending to child component, so we did declare multiple `style = {styles.rootScreen}` 

```js
import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();

  // callback
  function pickedNumberHandler(pickedNumber) {
    setUserNumber(pickedNumber);
  }

  // conditioaal component
  let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />;
  if (userNumber) {
    screen = <GameScreen />;
  }

  return (
    <LinearGradient colors={["#4e0329", "#ddb52f"]} style={styles.rootScreen}>
      <ImageBackground
        source={require("./assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1, // <View> by default only takes up space as much as it need. We can force it to use all space using `flex:1`
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
```

---



+ create reusable <Title/> component
+ Manage color globally => create a js object to store color string in 'color.js'
+ create a custom component <NumberContainer/> to display userNumber from StartGameScreen 
+ game logic handler: phone iteratively guess userNumber with interaction with user
  + in nextGuessHandler()
    + :bangbang: handler bind: not just only bind handler reference, but also input to the handler

+ check for "Game Over" 
  + 看到这里!





---

updated component structure:

+ design what state you need
+ design what logic you need in callback handler

```js
const MyComponent = (props) => {
  // at any point, business logic can cut in 
  
  // hooks
  // might need calculate initial value for a state here
  
  // callback handlers (just register, not run immediately)
  
  
  // jsx variables (for conditional component in jsx)
  
 
  // jsx
}
```









# Part3: Game End Screen
