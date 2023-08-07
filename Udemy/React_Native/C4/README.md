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

Add custom button, a bit styling

48-

Component:

+ Custom button
  + Visual feedback when pressed on android & iOS
    + for android, to make android_ripple property of <Pressable> work, need a <View> wrapping <Pressable>
    + on iOS, use conditional styling

+ TextInput: more configs
+ Background 
  + :bangbang: <View> by default only takes up space as much as it need. We can force it to use all space using `flex:1`

Styling:  

+ Add shadow on Android & iOS





看到54



# Part2: Game srceen





# Part3: Game end screen
