Udemy React Native

https://github.com/academind/react-native-practical-guide-code

https://reactnative.dev/



:bangbang: what is React Native?

:pencil: [React.js vs. React Native](./C0/README.md)



## Firt RN app on real device

follow environment setup in RN document



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





## Set up local environment using emulator

Android emulator

+ Andriod Studio => virual device manager => choose and run a device with 'play store' icon, press 'a'

IOS emulator

+ Xcode => show content package => developer > application => simulator, press 'i'



:bangbang: 注意有时Expo 版本更新, 可能会出现dependency deprecated 的情况, 只需要按照terminal的指示进行更新dependency即可





# Course Content

Essentials of React Native (2 weeks to learn)

| Class                      | Topic                                                        | Description                                   |
| -------------------------- | ------------------------------------------------------------ | --------------------------------------------- |
| :star: [2](./C2/README.md) | React Native Basics => :gem: Course Goal App                 | basic component, styling, state, dynamic list |
| [3](./C3/README.md)        | Debug React Native Apps                                      | React devtools                                |
| :star: [4](./C4/README.md) | Dive Deeper: Component, Layout, styling => :gem: build a Mini-Game app | Look to RN docs for more core component specs |
| :star: 5                   | Build Adaptive User Interface (Adapt to Platform & Device Size) |                                               |
| :star: 6                   | React Native Navigation with React Navigation                |                                               |

React & React Native (2 weeks to learn)

| Class   | Topic                                              | Description |
| ------- | -------------------------------------------------- | ----------- |
| 7       | App-wide state management with Redux & Context API |             |
| :gem: 8 | The expense tracker App                            |             |
| 9       | Handling user input                                |             |
| 10      | Send HTTP request                                  |             |

Advanced (1 week)

| Class     | Topic                                    | Description |
| --------- | ---------------------------------------- | ----------- |
| 11        | User Authentication                      |             |
| :star: 12 | Using Native Device Feature (Sensor API) |             |
| 13        | Build React Native App without Expo      |             |
| :star: 14 | Publishing React Native App              |             |
| 15        | Push Notification                        |             |

Bonus

|      |                      |      |
| ---- | -------------------- | ---- |
| 17   | JavaScript Refresher |      |
| 18   | React.js Refresher   |      |
| 19   | Bonus                |      |

