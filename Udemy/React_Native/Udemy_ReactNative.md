Udemy React Native

https://github.com/academind/react-native-practical-guide-code

https://reactnative.dev/



:book: [GitHub. code](https://github.com/academind/react-native-practical-guide-code)



:bangbang: what is React Native?

:pencil: [React.js vs. React Native](./C0/README.md)



# Firt RN app on real device

follow environment setup in RN document



```shell
npx create-expo-app --template
```





package.json中dependency和react app 中类似

```json
  "dependencies": {
    "expo": "^49.0.5",
    "expo-status-bar": "~1.6.0",
    "react": "18.2.0",
    "react-native": "0.72.3"
  },
```

启动first RN application: 

+ ios需要下载`Expo go`, cd到脚手架路径在terminal run: `npx expo start`, 然后手机扫二维码即可

+ 也可在local device上运行emulator => P9, 有需求再看

Commands: 

> › Press a │ open Android
> › shift+a │ select a device or emulator
> › Press i │ open iOS simulator
> › shift+i │ select a simulator
> › Press w │ open web
>
> › Press r │ reload app
> › Press j │ open debugger
> › Press m │ toggle menu
> › shift+m │ more tools
> › Press o │ open project code in your editor
> › Press c │ show project QR





# Set up local environment using emulator

Android emulator

+ Andriod Studio => virual device manager => choose and run a device with 'play store' icon, press 'a'

IOS emulator

+ Xcode => show content package => developer > application => simulator, press 'i'





https://blog.expo.dev/the-new-expo-cli-f4250d8e3421





:bangbang: 注意有时expo 版本更新, 可能会出现dependency deprecated 的情况, 由此可能引发compatibility的问题. 需要去调一下dependency的版本. 

+ 实在不行用脚手架自动生成的dependency
+  也可check Expo的documentation https://docs.expo.dev/versions/latest/ e.g.如下

| Expo SDK version | React Native version | React Native Web version |
| :--------------- | :------------------- | :----------------------- |
| 49.0.0           | 0.72                 | 0.19.6                   |
| 48.0.0           | 0.71                 | 0.18.10                  |
| 47.0.0           | 0.70                 | 0.18.9                   |
| 46.0.0           | 0.69                 | 0.18.7                   |



# Course Content

Essentials of React Native (2 weeks to learn)

| Class               | Topic                                                        | Description                                                  |
| ------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| [2](./C2/README.md) | :star: React Native Basics => :gem: Course Goal App          | basic component, styling, state, dynamic list                |
| [3](./C3/README.md) | Debug React Native Apps                                      | React devtools                                               |
| [4](./C4/README.md) | :star: Dive Deeper: Component, Layout, styling => :gem: build a Mini-Game app | Look to RN docs for more core component specs                |
| [5](./C5/README.md) | Build Adaptive & Responsive User Interface (Adapt to Platform & Device Size) | 有需求再看                                                   |
| [6](./C6/README.md) | :star: React Native Navigation with React Navigation :gem: meal menu app | Stack navigator <br>Drawer navigator <br>Tap navigator <br>Nesting navigators <br>navigation, route for passing info across screens <br>2 approaches to config a screen: options, setOptions inside a screen component |
| [7](./C7/README.md) | App-wide state management with Redux & Context API           | recap with React Context & <br>Redux  (:a:有需求再看)        |

React & React Native (2 weeks to learn)

| Class                 | Topic                                                 | Description |
| --------------------- | ----------------------------------------------------- | ----------- |
| [8](./C8/README.md)   | :gem: The expense tracker App                         |             |
| [9](./C9/README.md)   | :star: Handling user input                            |             |
| [10](./C10/README.md) | :star::star:  Send HTTP request                       |             |
| [11](./C11/README.md) | User Authentication                                   |             |
| 12                    | :star: :star:Using Native Device Feature (Sensor API) |             |

Advanced (1 week)

| Class | Topic                               | Description |
| ----- | ----------------------------------- | ----------- |
| 13    | Build React Native App without Expo |             |
| 14    | :star: Publishing React Native App  |             |
| 15    | Push Notification                   |             |

Catch-up

|      |                      |      |
| ---- | -------------------- | ---- |
| 17   | JavaScript Refresher |      |
| 18   | React.js Refresher   |      |
| 19   | Bonus                |      |

