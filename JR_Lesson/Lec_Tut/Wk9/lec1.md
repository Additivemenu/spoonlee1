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





## 往js中注入css 18min- 

只需import对应文件即可





cmd+d 多行批量选择







## refactor 36min-

将Header里的logo 和 nav继续组件化, 分出去称为独立的js file

logo, nav的css也独立出去





---

nav下有5个相似的标签, 我们继续把这些标签作为NavItem独立成组件并用function来生成它们



property object



57min- children	夹在在html标签中间的东西 :question: children也属于property的成员?



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



这样使得我们的jsx写法更加接近html的写法

```react
<NavItem href="/home">Home</NavItem>			// prefer


<NavItem href="/home" label="Home"></NavItem>		// not prefer

```

