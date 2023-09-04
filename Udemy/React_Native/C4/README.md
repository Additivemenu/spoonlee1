C4 Diving deeper into components, Layouts & styling-building a Mini-Game App

+ C2 的加强版



4h course content



# Key takeaway

Contents (P45-78):

+ :gem: Build another complete demo app
  + it has multiple screens!
    + here we just use simple  "useState" to control screen navigation
  
+ More new core components
  + <TextInput>
  + <SafeAreaView>
  + <Ionicons>
  + fontFamily, reusable color variable
  + nested <Text> (similar to <span> in web)
  + gradient background

+ Complex layouts & styles
+ :bangbang: More complex game logic and state management logics
  + screen navigation (not using React Navigation)
  + use input validation
  + check if game end, restart game, iteratively guess user input
  + ...

+ :bangbang: Adding <u>reusable</u> customized components with <u>default styling</u>
  + UI: "<PrimaryButton>", "<Title>", "<Card>", "<InstructText>" ...
  + Game: "<NumberContainer>", "<GuessLogItem>"
  + `Cascading styling`: we can even pass style props to overwrite the default styling of these customized components




Target App Description

+ In a game start up UI, Player input a number to phone. 

+ In a game UI, phone will iteratively guess a number and get feedback from user saying if the guess is lower or higher, the feedback will also be logged. 

+ At last, if the guess is right, switch to another screen saying game over! 

Screen Component breakdown, Screen folder > 

+ StartGameScreen.js
+ GameScreen.js
+ GameOverScreen.js



:bangbang: updated component structure:

---

when developing app, firstly figure out logic then tune UI, reuse component...

+ design what state you need
+ design what logic you need in callback handler
+ React is all about callbacks. Differenct callbacks run at different condition
  + useState: run only on the initial rendering of the component
  + useEffect: define callbacks run on dependency change (between render cycle)
  + various handlers: run when component-associated event is triggered
  + most interestingly, callbacks can be nested with another callback!

```js
const MyComponent = (props) => {
  // at any point, business logic can cut in 
  
  // hooks
  // might need calculate initial value for a state here
  const [myState, setMyState] = useState('');		//note this only runs when component is first rendered
  
  // callback handlers (just register, not run immediately)
  
  
  // jsx variables (for conditional component in jsx)
  
 
  // jsx
}
```



:bangbang: 关于React的declarative programming的经验, 不论是新写一个project还是在已有的基础上添加新的功能: 

+ 先写static page, 再引入state写dynamic page
+ 先思考需要什么state, 再考虑如何在各种callback(handler, useEffect ...)中manage state
+ 先考虑state所在的最低component是哪个, 再考虑component communication





# Part1: Startup screen

:gem: 01-starting-project



48-

Component:

+ Custom button
  + Visual feedback when pressed on android & iOS
    + for android, to make android_ripple property of <Pressable> work, need a <View> wrapping <Pressable>
    + on iOS, use conditional styling

+ <TextInput>: more configs
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

Summary of content: logic-related

+ create reusable <Title/> component
+ Manage color globally => create a js object to store color string in 'color.js'
+ create a custom component <NumberContainer/> to display userNumber from StartGameScreen 
+ game logic handler: phone iteratively guess userNumber with interaction with user
  + in nextGuessHandler()
    + :bangbang: handler bind: not just only bind handler reference, but also bind an argument to the handler

+ check for "Game Over" 
  + need a state to do conditional component (navigate to GameOverScreen) when game is over
  + need to check  `currentGuess` with `userInput` => need useEffect()





UI fine-tuning: 

:bangbang: Imroving game screen visuals 

---

+ by reusing customized UI components. 一般就是wrapper component 封装了一些styling而已

  + reuse customized UI component:  Title and InstructionText

  + extract a styled container to a dedicated UI wrapper component: Card

    

use cascading style 68

---

components > ui > InstructionText.js

+ use props to pass a style into a component, which is merged with its own styles. <u>利用这点, 我们可以向一个component从外部传递style, 甚至改写其内部的styling</u>

+ when style clashed, later one will overwrite previous one. e.g. income styling will overwrite the default styles defined in InstructionText

```js
import { Text, StyleSheet } from "react-native";

import Colors from "../../constants/color";

function InstructionText({children, style}) {
    // pass a style props to inner component, which allows us to overwritten inner component
    // 's styling from outside
  	// as style写在styles.instructionText后面 => incoming style will overwrite default style of the component
  return <Text style={[styles.instructionText, style]}>{children}</Text>;
}

export default InstructionText;

const styles = StyleSheet.create({
    instructionText: {
        color: Colors.accent500,
        fontSize: 24,
      },
})
```

GameScreen.js

```js
function GameScreen({ userNumber, onGameOver }) {  
  //....
  return ( 
          <InstructionText style={styles.instructionText}>
            Higher or lower?
          </InstructionText>
    ) 
}
const styles = StyleSheet.create({
	// ...
  instructionText: {
    marginBottom: 12,
  },
	// ...
});
```





Working with icons

---

69

we can directly use Icon libary provided by Expo

https://docs.expo.dev/guides/icons/



e.g. an add icon

```js
import {Ionicons} from '@expo/vector-icons'

// jsx
<Ionicons name="md-add" size={24} color="white"></Ionicons>
```



add & use customize fonts

---

70

```console
expo install expo-fonts
```

```console
expo install expo-app-loading
```

app.js

+ hook: useFonts to load font file

```js
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';


export default function App() {
	// hooks 
  const [fontsLoaded] = useFonts({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')	// these are ttf files under assets
  })

  if(!fontsLoaded){
    return <AppLoading/>;
  }
  
  // callbacks
  
  
  // jsx
}
```

之后在其他app下的component就可使用loaded font了

```js
const styles = StyleSheet.create({
  title: {
    fontFamily: 'open-sans-bold',		// **** 
    fontSize: 24,
    color: 'white',
    textAlign: "center",
    borderWidth: 2,
    borderColor: 'white',
    padding: 12,
  },
});
```





# Part3: Game End Screen



## Add a (Foreground) Image

at Game End Screen

做出一个图片的圆形剪影效果

```js
 <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={require("../assets/images/success.png")}
      />
  </View>


                  
imageContainer: {
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: Colors.primary800,
    overflow: "hidden",
    margin: 36,
  },
image: {
    // percentage refer to its parent component
    width: "100%",
    height: "100%",
},
```







Nested Text
---

+ 类似web中的 "<span>"

```js
<Text stlye={styles.stlye1}>
  abc <Text style={styles.style2}>efg</Text> aaa
</Text>

//  not allowed!
<Text>
	<View></View>  
</Text>
```





## Add restart game logic



GameOverScreen.js

+ 先思考需要哪些state, handler, 然后再去app.js里manage它们
  + state 在整个app是singleton的, 

```js
function GameOverScreen({roundsNumber, userNumber, onStartNewGame}) {
  return (
    <View style={styles.rootContainer}>
      <Title>GAME OVER!</Title>

      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/success.png")}
        />
      </View>

      <View>
        <Text style={styles.summaryText}>
          Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to
          guess the number <Text style={styles.highlight}>{userNumber}</Text>
        </Text>
      </View>
      <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
  );
}
```







## Logging game rounds

in GameScreen, record and log the numbers that is guessed by phone (of course managed in a state)

```js
const [guessRounds, setGuessRounds] = useState([initalGuess]);

// handle updates of guessRound in a handler


// jsx
<View>
 {guessRounds.map((guessRound) => (
    <Text key={guessRound}>{guessRound}</Text>
  ))} 
</View>
```



we can also use "<FlatList>" to log it 

---

```js
<View>
  <FlatList
    data={guessRounds}
    renderItem={(itemData) => <Text>{itemData.item}</Text>}
    keyExtractor={(item)=>item}
  />
</View>
```



styling game round logs

---

76

Customize a log item component with its own styling

```js

function GuessLogItem({ roundNumber, guess }) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>#{roundNumber}</Text>
      <Text style={styles.itemText}>Opponent's Guess: {guess}</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  listItem: {
    borderColor: Colors.primary800,
    borderWidth: 1,
    borderRadius: 40,
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  itemText: {
    fontFamily: "open-sans",
  },
});
```



GameScreen.js

+ FlatList renderItem uses "<GuessLogItem />"

```js
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundListLength - itemData.index} guess={itemData.item}/>}
          keyExtractor={(item)=>item}
        />
      </View>
```



At last, when game is over, display how many rounds it takes to make correct guess

+ in GameScreen, handle this in GameOverHandler

