C2

# Abstract:

Using React Native Components & Building UIs

Styling React Native Apps

Adding interactivity & managing state



a demo app







# Part1: core component & styling

## Core Components & Component styling

13 

:gem: starting-project

in this course, we only use functional component and react hooks, not gonna using class component



React Native core components docs:

https://reactnative.dev/docs/components-and-apis





App.js

```js
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';  // note these React Native Core component

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Hello World!!!!</Text>
      <Text>Hello World!!!!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  // very similar to css syntax, but in javascript
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```



## Working with Core Components

14

与React.js不同

+ Button component的写法 和 react.js中的不同
+ 使用到的React Native Component, 需要先import



App.js

```js
import { StyleSheet, Text, View, Button } from 'react-native';  // note this

export default function App() {
  return (
    // View is the container component that is used to contain elements, not pure text
    <View style={styles.container}> 
      <Text>Hello World!</Text>
      <Text>Another piece of info!</Text>
      <Button title="click me!"/>   
    </View>
  );
}

const styles = StyleSheet.create({
  // very similar to css syntax, but in javascript
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```



## Styling React Native Apps

15

no css in React Native

[react native stylesheet](https://reactnative.dev/docs/stylesheet)

[react native style](https://reactnative.dev/docs/style)

[React Native Color References](https://reactnative.dev/docs/colors)

[React Native: view style props](https://reactnative.dev/docs/view-style-props)



Two apporach to apply styling to a React Native Component

+ In-line
+ StyleSheet (preferred)
  + seperate component code with styling code
  + make styling more reusable



App.js

+ 以下: 运用StyledSheet来定义styling

```js
import { StyleSheet, Text, View, Button } from "react-native"; // note this

export default function App() {
  return (
    // View is the container component that is used to contain elements, not pure text
    <View style={styles.container}>
      <Text style={styles.textBox}>Hello World!</Text>
      <Text style={styles.textBox}>Another piece of info!</Text>
      <Button title="click me!" />
    </View>
  );
}

const styles = StyleSheet.create({
  // very similar to css syntax, but in javascript
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textBox: {
    margin: 16,
    borderWidth: 2,
    borderColor: "blue",
    padding: 16,
  },
});
```





# Part2: Layouts & Flexbox

17



App.js

```js
import { StyleSheet, Text, View, Button, TextInput } from "react-native"; // note this

export default function App() {
  return (
    // View is the container component that is used to contain elements, not pure text
    <View style={styles.appContainer}>
      <View>
        <TextInput placeholder="Your course goal!" />
        <Button title="Add Goal" />
      </View>
      <View>
        <Text>List of goals...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 50,
  },
});
```



## React Native & Flexbox

18

similar to browser css flexbox, 

+ elements are positioned inside of a container
+ positioning is controlled via style settings applied to the element container



```css
flex: 1,		// the element(container) should expand to occupy availble space
flexDirection: 'column' (top to bottom => main axis) / 'row' (left to right => main axis),
justifyContent: 'flex-start',
alignItems: 'flex-start'
```



App.js

+ 和写html + css 非常类似

```js
import { StyleSheet, Text, View, Button, TextInput } from "react-native"; // note this

export default function App() {
  return (
    // View is the container component that is used to contain elements, not pure text
    <View style={styles.appContainer}>
      <View style={styles.inputContainer}>
        <TextInput style={styles.textInput} placeholder="Your course goal!" />
        <Button title="Add Goal" />
      </View>
      <View>
        <Text>List of goals...</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    padding: 50,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "80%",
    marginRight: 8,
    padding: 8
  },
});
```



<img src="./Src_md/styling1.jpeg" style="zoom:33%;" />









## Using Flexbox to create Layouts

19







## Flexbox - A Deep Dive

20



## Improving the Layout

21









# Part3: Handling Events

22





# Part4: others



## Component Decomposation

27