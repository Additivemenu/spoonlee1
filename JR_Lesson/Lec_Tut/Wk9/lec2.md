1-31 react



上节课回顾

组件化



写react代码时, 考虑顺序

1. component, declarative
2. Single responsibility, open close
3. Readable, Maintainable, Reusable



---



# React state 5min-



SPA: single page application (浏览器在渲染不同内容时, 不通过切换页面来实现, 而是通过JavaScript更新DOM来实现) preferred

MPA: muliple page application 远古网页



demonstration: 

Nav.js

将Enum赋给active

```react
import styles from './Nav.module.css'
import Item from './components/Item'

const Nav = () => {
    return (
        <nav className={styles.container}>
            {/* Copy paste a lot */}
            {/* <a href="/home" className='nav__item nav__item--active'>Home</a>
            <a href="/resume" className='nav__item'>Resume</a>
            <a href="/blog" className='nav__item'>Blog</a>
            <a href="/services" className='nav__item'>Service</a>
            <a href="/contacts" className='nav__item'>Contacts</a> */}

            {/* refactor: use function */}
            <Item href="/home" active={true | false}>Home</Item>
            <Item href="/resume" active={true | false}>Resume</Item>
            <Item href="/blog" active={true | false}>Blog</Item>
            <Item href="/services" active={true | false}>Services</Item>
            <Item href="/contacts" active={true | false}>Contacts</Item>
        </nav>
    )
}

export default Nav;
```



Item.js

先定义active = false, onClick NavItem时就将active变成true, 此时应该触发特效

```react
import './Item.css'
import classNames from 'classnames'


// we just destruct property object in function argument
const Item = ({href, children}) =>{

    // ! Declarative is not free ! 
    // ! 浏览器的所有JavaScript语法都是命令式, 即底层还是在命令式地运行代码 !
    // ! 我们需要一个中介 (React), 把声明式, 转化为命令式 !
    let active = false;

    const handleClick = (event) => {
        // SPA, 我们不需要页面跳转
        event.preventDefault();
        active = true;
        console.log('HERE');
    }

    return (
        <a 
        href={href} 
        onClick = {handleClick}             // declarative: do something when this tag is onClick
        className={classNames('nav__item', {
            'nav__item--active': active})}>
            {children}
        </a>
    )

}

export default Item
```



但此时在网页上点击 NavItem 元素, 发现并定义的conditioanl className引发的特效并没有奏效, 这是为什么呢? 因为上面的代码:

```react
let active = false;

const handleClick = (event) => {
  ...
  active = true;
  ...
}
```

是命令式的, 和react的声明式并不兼容！



由此:

+ Declarative is not free 
+ 浏览器的所有JavaScript语法都是命令式, 即底层还是在命令式地运行代码
+ 我们需要一个中介 (React), 把声明式, 转化为命令式

引出hook



## hook 21min-

react提供了一系列hooks, 帮我们实现声明式语法



我们做如下处理, 来使得active的定义兼容声明式

修改Item.js中

```react
const [active, setActive] = useState(false);		// 定于active初始值为false, 有点像Java里用带参构造器new一个对象
// let active = false;

const handleClick = (event) => {
  // active = true;
  setActive(!active);
}
```

这样就work了, 点击一个NavItem就会切换它下面的短横线是否显示

上面的

```react
// 解构写法
const [value, setValue] = useState()

// 一般写法
const handler = useState()
const value = handler[0]
const setValue = handler[1]
```





Q & A 29min-37min

为什么不直接写命令式的代码?

+ 命令式的代码, 关注于过程, 因而实现相同的结果会有很多种写法, 读起来费劲, 也不好维护
+ 声明式的代码关注于结果, 写法相对固定, 易读易于维护



## 同时只让一个NavItem呈现点击特效 37min-



需求: 点击Home的时候, 把Resume的active设置成false

问题: NavItem本身并不知道Home和Resume的存在

只有在Nav中, 才有Home, Resume, Blog, Services, Contact

|--- Nav

​		|--- NavItem



父传子OK

子传父NO

兄弟互传NO

:question: JS里还能在function里再定义一个function???



如果想实现"子传父", 只能把子类的状态提升到父类中, 再通过父传子来进行信息沟通

state lifting 状态提升

我们把在NavItem中的active, setActive转移到它的父级Nav中, 将它们作为NavItem()的argument传入

Nav.js

```react
import styles from './Nav.module.css'
import Item from './components/Item'
import { useState } from 'react';

const Nav = () => {
    const [active, setActive] = useState(false)     // active is a variable, setActive is a function

    return (
        <nav className={styles.container}>

            {/* refactor: use function */}
            <Item href="/home" active={active} setActive={setActive}>Home</Item>
            <Item href="/resume" active={active} setActive={setActive}>Resume</Item>
            <Item href="/blog" active={active} setActive={setActive}>Blog</Item>
            <Item href="/services" active={active} setActive={setActive}>Services</Item>
            <Item href="/contacts" active={active} setActive={setActive}>Contacts</Item>
        </nav>
    )
}

export default Nav;
```

Item.js

```react
import './Item.css'
import classNames from 'classnames'
import { useState } from 'react';


// we just destruct property object in function argument
const Item = ({href, children, active, setActive}) =>{

    //const [active, setActive] = useState(false);

    const handleClick = (event) => {
        // SPA, 我们不需要页面跳转
        event.preventDefault();
        setActive(!active);
        console.log('HERE');
    }

    return (
        <a 
        href={href} 
        onClick = {handleClick}             // declarative: do something when this tag is onClick
        className={classNames('nav__item', {
            'nav__item--active': active})}>
            {children}
        </a>
    )

}

export default Item
```



但这时因为共享一个active, setActive, 5个NavItem的onClick的行为是绑定在一起的





## 继续优化52min-

[react: curely bracket vs. quotes](https://sawyerh.medium.com/how-react-props-relate-to-html-attributes-and-js-functions-6785a89a299#:~:text=In%20React%2C%20%E2%80%9Cprops%E2%80%9D%20is,element%20that%20accepts%20custom%20attributes.)

[react: curely bracket vs. quotes2](https://stackoverflow.com/questions/69376913/react-native-property-values-in-quotes-vs-braces#:~:text=Quotes%20are%20for%20when%20you,you%20need%20to%20use%20braces.)

+ **Quotes** are for when you're passing a simple string.
+ **Braces** are for when you want to run Javascript code. For example if you wanted to pass a variable as a prop, you'd need to use braces.



Nav.js

声明式: 当这个标签的active为它的名字的时候

:question: 下面这段怎么执行????? {}中的active和props.active是一个东西吗? 尤其`setActive = {() => setActive('Home')}`是怎么和NavItem.js中的`setActive(!active)`一起工作的?

```react
import styles from './Nav.module.css'
import Item from './components/Item'
import { useState } from 'react';

const Nav = () => {

    // active is a String, setActive(String)
    const [active, setActive] = useState('HOME')     // active is a variable, setActive is a function

    return (
        <nav className={styles.container}>

            {/* refactor: use function */}
            {/* 注意这里html标签里的property的赋值, 等号右边是花括号括起来的 */}
            {/* 注意html标签的props.active为boolean, */}
            <Item href="/home" active={active === 'HOME'} setActive={() => setActive('HOME')}>Home</Item>
            <Item href="/resume" active={active === 'RESUME'} setActive={() => setActive('RESUME')}>Resume</Item>
            <Item href="/blog" active={active === 'BLOG'} setActive={() => setActive('BLOG')}>Blog</Item>
            <Item href="/services" active={active === 'SERVICES'} setActive={() => setActive('SERVICES')}>Services</Item>
            <Item href="/contacts" active={active === 'CONTACTS'} setActive={() => setActive('CONTACTS')}>Contacts</Item>
        </nav>
    )
}

export default Nav;
```



Item.js 不变

```react
import './Item.css'
import classNames from 'classnames'
import { useState } from 'react';


// we just destruct property object in function argument
const Item = ({href, children, active, setActive}) =>{

    //const [active, setActive] = useState(false);

    const handleClick = (event) => {
        // SPA, 我们不需要页面跳转
        event.preventDefault();
        setActive(!active);
        // console.log('HERE');
    }

    return (
        <a 
        href = {href} 
        onClick = {handleClick}             // declarative: do something when this tag is onClick
        className={classNames('nav__item', {
            'nav__item--active': active})}>
            {children}
        </a>
    )

}
```



此时就实现让一个NavItem呈现点击特效了



## 继续优化代码写法55min-

上面Nav.js中我们仍有许多重复的代码, 我们采用Array来批量输入HTML tag的props参数 (JS技巧)

```react
import styles from './Nav.module.css'
import Item from './components/Item'
import { useState } from 'react';


const ITEMS = [
    {href: '/home', value: 'HOME'},
    {href: '/resume', value: 'Resume'},
    {href: 'service', value: 'Services'},
    {href: '/blog', value: 'Blog'},
    {href: 'contact', value: 'Contact'}
]

const Nav = () => {

    // flag is a String, setFlag(String)
    const [flag, setFlag] = useState('HOME')     // active is a variable, setActive is a function

    return (
        <nav className={styles.container}>

            {/* 减少copy, passte, 和下面的代码等效, 写法比较高级 map(), destruct, HTML标签的props传递综合在一起 */}
            {ITEMS.map(({href, value}) => (
                <Item 
                    href={href} 
                    active={flag=== href} 
                    setActive={() => setFlag(href)}
                >
                    {value}
                </Item>
            ))}

        </nav>
    )
}

export default Nav;
```







## 难点来了! 我们继续优化代码的readability 1h04min-

Nav.js

提升我们代码的可读性, 将Item函数(React eanabled jsx操作)的输入参数(props的一个成员)从之前的

```react
setActive={() => setFlag(href)
```

改为

```react
onClick={() => setFlag(href)
```



这样一来, 看到Item函数里有一个叫onClick的函数变量 (它的名字叫成其他的也没关系, :question: 等等onClick不是保留字段吗??)就知道它应该是定义了Item函数如何处理onClick事件 (\<a\>一个property) 的  (---个人觉得应该不是保留字, 因为即使在\<a\>中我们把onClick写成onCliiik也没有出现错误提示) 可读性大大提高了, 别人看到Item那段声明式的代码就知道Item的行为是怎样的

```react
const Nav = () => {

    // flag is a String, setFlag(String)
    const [flag, setFlag] = useState('/home')     // active is a variable, setActive is a function

    return (
        <nav className={styles.container}>

            {/* 减少copy, passte, 和下面的代码等效, 写法比较高级 map(), destruct, HTML标签的props传递综合在一起 */}
            {ITEMS.map(({href, value}) => (
                <Item 
                    href={href} 
                    active={flag=== href} 
                    onClick={() => setFlag(href)}			// !!! *****改动在这里, 代表一个函数变量, 将会把一段代码（操作）传入到Item函数里****** !!!
                >
                    {value}
                </Item>
            ))}

        </nav>
    )
}


```



Item.js

对应的, 在handleClick函数中, 将原来的

```react
setActive(!active);
```

改为

```react
onClick();
```



```react
const Item = ({href, children, active, onClick}) =>{

    //const [active, setActive] = useState(false);

    const handleClick = (event) => {
        // SPA, 我们不需要页面跳转
        event.preventDefault();
        onClick();              // !!! ******改动在这里!! 执行onClick()里的代码****** !!!
        // console.log('HERE');
    }

    return (
        <a 
        href = {href} 
        onClick = {handleClick}             // declarative: do something when this tag is onClick
        className={classNames('nav__item', {
            'nav__item--active': active})}> 
            {children}
        </a>
    )

}

export default Item
```



这样一来, 代码的可读性大大提高了

还是挺神奇的, 传入Item函数的一个代码块, 在执行时居然对引用Item函数的函数(Item的`父级`函数)内的其他变量进行了修改



1h14min-1h24min 休息





# 1h24min- 继续



## Angular.js的诟病



Index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Myact</title>
</head>
<body>
    <div id="root"></div>

</body>
<script src="./index.js"></script>
</html>
```



index.js

```js
let num = 0

const Count = () =>{
    const container = document.createElement('div')

    // text
    const text = document.createTextNode(num)       // create text node here once per render

    const handleClick = () => {
        num++;
    }
    
    // button
    const button = document.createElement('button')
    button.innerHTML = 'Plus'
    button.type = 'button'
    button.addEventListener('click', handleClick);

    // add up
    container.appendChild(text)
    container.appendChild(button)

    // div
    //      text
    //      button
    return container

}


document.querySelector('#root').appendChild(Count())
```



发现想实现的功能并未实现, 因为TextNode只在被render的时候创建了1次, 但当click on button, num更新了而页面并没有被再次渲染, 

想要实现我们的功能就得让页面re-render on update of num



index.js

```js
let num = 0

const Count = () =>{

    const container = document.createElement('div')

    // text
    const text = document.createTextNode(num)       // create text node here once per render

    // button
    const handleClick = () => {
        num++;

        // !!! re-render !!!
        document.querySelector('#root').innerHTML = ''
        document.querySelector('#root').appendChild(Count())
    }
    
    const button = document.createElement('button')
    button.innerHTML = 'Plus'
    button.type = 'button'
    button.addEventListener('click', handleClick);

    // add up
    container.appendChild(text)
    container.appendChild(button)

    // div
    //      text
    //      button
    return container

}


document.querySelector('#root').appendChild(Count())
```



但面临巨大的性能问题, 因为我们每次修改都需要重新渲染整个页面

这就是Angular.js的最初逻辑: 总得重复渲染



## React 提出了virtual DOM的概念 1h39min-

DOM 是tree view (树状结构)

看到这里

