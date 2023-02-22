https://www.youtube.com/watch?v=fzxEECHnsvU&list=PL7g4drS_8o3tkVOOMn1yKeEM-kKh9HWFu&index=3&t=2118s



a

# Installation of Mui

以下步骤在mui doc中均能找到



在react app 路径下安装mui依赖

```bash
yarn add @mui/material @emotion/react @emotion/styled
```



Google web font

在index.html的header中加入如下

```html
<link
    rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
    />
    <style>
      *{
        font-family: "Roboto", sans-serif;
        margin: 0;
      }
    </style>
```





materials icon

在react app 路径下安装icons-material 依赖

```bash
yarn add @mui/icons-material
```









# MUI 5 crash course

move on to Mui doc > usage

quick start: play with Button component

通过Button的startIcon属性往Button中加入Icon

在这找icon https://mui.com/material-ui/material-icons/



typography

https://mui.com/material-ui/react-typography/

```react
import {Button, Typography} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';


function App() {
  return (
    <div className="App">
      <Button variant="text" size='small'>Text</Button>
      <Button startIcon={<SettingsIcon/>} variant="contained" size="large" color='success'>Contained</Button>
      <Button variant="outlined">Outlined</Button>

      <Typography variant="h1" component="p">
          it uses h1 style but it's acutally a p tag
      </Typography>;
    </div>
  );
}

export default App;
```





## material UI sx prop

自定义Button的style

```react
import {Button, Typography} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';


function App() {
  return (
    <div className="App">
      <Button variant="text" size='small'>Text</Button>
      <Button startIcon={<SettingsIcon/>} variant="contained" size="large" color='success'>Contained</Button>
      <Button variant="outlined">Outlined</Button>

      <Typography variant="h1" component="p">
          it uses h1 style but it's acutally a p tag
      </Typography>;
			
      
      <Button variant='contained'  
              sx={{backgroundColor: "skyblue", 
                    color:"#fff",
                    margin: 5,
                    "&:hover": {
                      backgroundColor:"lightblue"
                    },
                    "&disabled": {
                    backgroundColor: "gray",
                    color: "white"
                    }
                    }}
      >
          My Unique Button
      </Button>

    </div>
  );
}

export default App;
```





## Custom Mui components

import styled

```react
import {styled} from '@mui/material'
```



有点像styled component的用法,  利用已有的组件 + 自定义css = 生成新的组件, 这样自定义mui组件也可以复用

```react
import {Button, Typography, styled} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';

function App() {


  const BlueButton = styled(Button)({
    backgroundColor: "skyblue", 
    color:"#fff",
    margin: 5,
    "&:hover": {
      backgroundColor:"lightblue"
    },
    "&disabled": {
    backgroundColor: "gray",
    color: "white"
    }
  })
  
  return (
  	// 刚才写的jsx
  )
}
```



## How to crate a custom MUI thems

在src下新建theme.js

Mui doc > customization > theming



```react
import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette:{
        primary:{
            main: "#1760a5",
            light: "skyblue"
        },
        secondary:{
            main: "#15c630"
        },
        otherColor: {
            main: "#999"
        }
    }
})
```



接着在index.js中加入ThemeProvider包住`<App />`

```react
import { ThemeProvider } from '@emotion/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {theme} from './theme'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>

  </React.StrictMode>
);
```



这样在App组件中就可以使用theme所打包的颜色属性了, 甚至可以传入自定义mui component中使用

App.js的自定义mui component

```react
import {Button, Typography, styled} from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings';


function App() {

	// 自定义mui component
  const BlueButton = styled(Button)(({theme})=>({ // theme 传入这个组件
    backgroundColor: theme.palette.otherColor.main,  // 使用到theme.js中定义的颜色
    color:"#fff",
    margin: 5,
    "&:hover": {
      backgroundColor:"lightblue"
    },
    "&disabled": {
    backgroundColor: "gray",
    color: "white"
    }
  }))

  return (
    <div className="App">
      <Button variant="text" size='small'>Text</Button>
      <Button startIcon={<SettingsIcon/>} variant="contained" size="large" color='otherColor'>Contained</Button>
      <Button variant="outlined">Outlined</Button>

      <Typography variant="h1" component="p">
          it uses h1 style but it's acutally a p tag
      </Typography>;

      <Button variant='contained'  
              sx={{backgroundColor: "skyblue", 
                    color:"#fff",
                    margin: 5,
                    "&:hover": {
                      backgroundColor:"lightblue"
                    },
                    "&disabled": {
                    backgroundColor: "gray",
                    color: "white"
                    }
                    }}
      >
          My Unique Button
      </Button>

      <BlueButton>a customized blue button</BlueButton>
        
    </div>
  );
}

export default App;
```





# Web Project

## 准备工作

目录结构

```react
|--- App
			|--- Sidebar
			|--- Feed
			|--- Rightbar
```

保证各组件可以正常连接



## :moon: Mui layouts (Box, Container, Grid, Stack)

mui doc > component > LAYOUT



Box



Container



Grid



Stack

一维的flex box container

App.js: 用Box套在组件最外面, 用Stack包住子组件做layout 

```react
import { Box, Stack} from '@mui/material'

import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import Rightbar from './components/Rightbar';


function App() {

  return (
    <Box>
      {/* Navbar */}
      <Stack direction='row' spacing={2} justifyContent="center">
        <Sidebar />
        <Feed />
        <Rightbar />
      </Stack>
    </Box>
  );
}

export default App;
```

以Feed这个子组件为例子, 可以在Box中定义background color, flex占多长， padding的大小, 就像写css一样

```react
import { Box } from "@mui/material";

const Feed = () => {
    return (
        <Box bgcolor={"pink"} flex={4} padding={2}>Feed</Box>
    )
}


export default Feed;
```





## Mui responsive design

mui doc > customization > Breakpoints

break point: 即决定css responsive时分成几段, 每段的区间

Default breakpoints

Each breakpoint (a key) matches with a *fixed* screen width (a value):

- **xs,** extra-small: 0px
- **sm,** small: 600px
- **md,** medium: 900px
- **lg,** large: 1200px
- **xl,** extra-large: 1536px

These values can be [customized](https://mui.com/material-ui/customization/breakpoints/#custom-breakpoints).



以Sidebar为例子, 定义Box的sx属性, 使得其display的取值具有一个分段效果

```react
import { Box } from "@mui/material";

const Sidebar = () =>{
    return (
        <Box bgcolor={"skyblue"} flex={1} padding={2} sx={{display:{xs: "none", sm: "block"}}}>Sidebar</Box>
    )
}

export default Sidebar;
```





## Use Mui components

### mui app bar (Navbar)

App.js

```react
function App() {

  return (
    <Box>
      
      <Navbar />

      <Stack direction='row' spacing={2} justifyContent="space-between">
        <Sidebar />
        <Feed />
        <Rightbar />
      </Stack>
    </Box>
  );
}
```



Navbar

+ 注意 `<Badge>`的使用
+ 注意时如何做UserBox和Icons的responsive效果的
+ mui component的sx属性编辑自己的css style

```react
import { AppBar, Toolbar, styled, Typography, Box, InputBase, Badge, Avatar } from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import MailIcon from '@mui/icons-material/Mail';
import Mail from "@mui/icons-material/Mail";
import Notifications from '@mui/icons-material/Notifications'

const StyledToolbar = styled(Toolbar)(
    {
        display: "flex",
        justifyContent: "space-between"
    }
);

const Search = styled("div")(({theme}) => ({
    backgroundColor: "white",
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "40%"
}))

const Icons = styled(Box)(({theme}) => ({
    display: "none",
    gap: "20px",
    alignItems: "center",
    // if size of window is bigger than 'sm', then apply below style
    [theme.breakpoints.up("sm")]:{
        display: "flex"
    }
}))

const UserBox = styled(Box)(({theme}) => ({
    display: "flex",
    gap: "10px",
    alignItems: "center",
    [theme.breakpoints.up("sm")]:{
        display: "none"
    }
}))


const Navbar = () => {
    return (
        <AppBar position="sticky">
            <StyledToolbar>
                <Typography variant="h6" sx={{
                    display: {xs: "none", sm: "block"}
                }}>
                    Lama DEV
                </Typography>

                <PetsIcon sx={{
                    display: {xs: "block", sm: "none"}
                }}/>

                <Search><InputBase placeholder="search..."></InputBase></Search>

                <Icons>
                    <Badge badgeContent={4} color="primary">
                        <Mail/>
                    </Badge>
                    <Badge>
                        <Notifications />
                    </Badge>
                    <Avatar sx={{width: 30, height: 30}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXISBg6mx942CBTGaGIsAmjWyuNn5rbsPikw&usqp=CAU" />
                </Icons>

                <UserBox>
                    <Avatar sx={{width: 30, height: 30}} src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXISBg6mx942CBTGaGIsAmjWyuNn5rbsPikw&usqp=CAU" />
                    <Typography>John </Typography>
                </UserBox>

            </StyledToolbar>
        </AppBar>
    )
}

export default Navbar;
```



### mui menu

看到这里







### mui sidebar



### mui cards



### mui right menu



### mui tootip, fab, icons



### Mui Modal tutorial



### mui dark mode 



## how to deploy mui app



