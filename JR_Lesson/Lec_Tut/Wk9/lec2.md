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





继续优化52min-

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
        console.log('HERE');
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



此时就实现需求了



继续55min-

看到这里
