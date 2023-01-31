1-29 react 2



复盘上节课 0- 16min

declerative

Component



面试问题没有把握不要蒙

培养自己参加讨论的能力, 公司里面开会你总得张口有观点吧

谦虚谨慎, 代码不能只要能跑就行, 注意readable, maintainable, reusable



# 继续组件化16min-

接上节课最后的jsx操作将\<app\>组件化

React 里html标签的class写为className, 以和OOP的class进行区分





往js中注入css file: 只需在js中import对应文件即可

key map: cmd+d 多行批量选择



对Header进一步组件化 (Body, Footer先不管)

+ 将Header里的logo 和 nav继续组件化, 分出去称为独立的js file

+ logo, nav的css也独立出去

## Header.js

```react
import './Header.css'
import Logo from './Logo'
import Nav from './Nav'

// 函数名首字母大写
const Header = () => {
    return(
        <div className="header">
            <Logo></Logo>
            <Nav></Nav>
      </div>
    )
}
  
export default Header
```

Header.css

```css
.header{
    max-width: 1000px;
    margin: 0 auto;

    display: flex;
    justify-content: space-between;     
    align-items: center;
}
```



### Logo.js

```react
import './Logo.css'

const Logo = () =>{
    return(
        <div className="logo">
            <span className="logo_highlight">Tifa</span>
            Lockhart
        </div>
    )
}

export default Logo;
```



Logo.css

```css
.logo{
    font-size: 1.5rem;
    font-weight: 500;
}


.logo_highlight{
    color: #377e9a;
    margin-right: 6px;
}
```



### Nav.js

```react
import './Nav.css'

const Nav = () => {
    return (
        <nav className="nav">
            {/* Copy paste a lot */}
            <a href="/home" className='nav__item nav__item--active'>Home</a>
            <a href="/resume" className='nav__item'>Resume</a>
            <a href="/blog" className='nav__item'>Blog</a>
            <a href="/services" className='nav__item'>Service</a>
            <a href="/contacts" className='nav__item'>Contacts</a>

        </nav>
    )
}

export default Nav;
```



Nav.css

```css
.nav{
    display: flex;
}

.nav__item{
    text-decoration: none;
    padding: 16px;
    color: #49515d;
    font-size: 15px;
    opacity: 0.6;

}

/* active effect for nav item */
.nav__item--active{
    opacity: 1;
}

.nav__item--active::after{
    content: "";
    display: block;
    height: 3px;
    background-color: #377e9a;
    margin-top: 4px;

}
```







# refactor 43min-

## 利用函数产生相似标签

上面Header > Nav下有5个相似的标签, 我们继续把这些标签作为NavItem独立成组件并用function来生成它们



+ property object: 一个html标签的property作为一个object输入函数

+ children 57min-: 夹在在一对html开闭标签中间的东西 :question: children也属于property的成员?



NavItem.js

```react
import './NavItem.css'

// we just destruct property object in function argument
const NavItem = ({href, children}) =>{
    return (
        <a href={href} className="nav__item">{children}</a>
    )
}

export default NavItem
```

NavItem.css



利用children使得我们的jsx写法更加接近html的写法

```react
<NavItem href="/home">Home</NavItem>			// prefer


<NavItem href="/home" label="Home"></NavItem>		// 不用children的写法 not prefer， 因为看起来不像html

// 如果不用children, 如下写法
const NavItem = ({href, label}) =>{
    return (
        <a href={href} className="nav__item">{label}</a>
    )
}

```





## 实现conditional classsname 58min-1h10min

上面利用函数产生相似标签中, 标签的className一直是"nav_item", 现在我们来做conditional classname



方式一: 手写

在className = ? 的地方写个函数由href的值conditionally 返回一个字符串作为className

NavItem.js

```react
import './NavItem.css'

const getClassName = (href) => {
    if(href === '/home'){
        return 'nav__item nav_item--active'
    }
    return 'nav__item'
}


// we just destruct property object in function argument
const NavItem = ({href, children}) =>{
    return (
        <a href={href} className={getClassName(href)}>
            {children}
        </a>
    )

}

export default NavItem
```





方式二: 使用第三方classnames库  1h05min-

how to render conditional className https://stackoverflow.com/questions/30533171/react-js-conditionally-applying-class-attributes

https://github.com/JedWatson/classnames 安装第三方包

```bash
npm install classnames
```





```react
```







