龙哥 Feb-26  

龙哥的课主要听思路, 具体代码没必要跟, 具体代码练习跟Ally



要点:

+ 前端设计模式: 如何平衡组件复用与职责多样性的问题
+ 关于是否使用ui库的讨论



# 课前和学生讨论P3技术栈

面试官: 关于React组件化, 你有何心得?  如果你用material ui在p3的话, 就不好回答这种问题了. 澳洲中大型企业据说大部分不用material ui, 还是html, css, js, 以及react基础更加重要, 如果面试官没用过material UI 那你会花费大量时间去和面试官讲你的context, 但是如果是聊基础, 那你就可以省出时间因为你和面试官是有共同点的

面试时, 面试官一般一般都要求举具体例子 (e.g. 做弹窗, 做button时, 遇到过什么challenge? 即使你说你自己当时struggle了很久, 也有可能引起面试官共情, 用material ui你和面试官能聊的东西会少很多),  面试时间很有限, 要避免陷入陷阱: 大量时间去brief自己项目的context

一个面试官的逻辑: 你能用好UI库, 不代表你可以自己写react component; 能自己写好react component, 大概率你也能handle UI库. 简历里出现UI库 (e.g. antd pro, material ui, semantic ui, tailwind ui (但tailwind css可以写))是很大的减分项



# 录屏开始 8:27 -

React下半段课程的内容预览

+ P3前端项目go through (按我们组来讲)

  + debug

  + 学习能力

  + 代码能力

+ 知识点

  + Context --> React Router Dom
  + Testing ---> Jest ---> React Testing lib



# 搭建react脚手架与配置 8:27-8:45

搭建前端 create-react-app



中间穿插聊到:

+ 前端架构: create-react-app,  `further reading: next.js`
+ Css 框架: stlyed-components, css module, tailwind
+ 代码结构, 代码开发环境:  eslint-config-airbnb (一些编码规范) https://github.com/lin-123/javascript 建议通读背诵



老师配置eslint https://www.npmjs.com/package/eslint-config-airbnb

# React哲学 8:45-

以我们的P3为例子

今天先写SideNavigation



## Step1 划分组件层级 + Step2 静态版本

即react哲学中的前两部

```js
- App
	- SideNavigation
		- Logo		(只是gamera的logo)
		- Navigation (指navigation的那一个button list)
			- Item
				- Dropdown

```



### 先做SideNavigation

20:57-21:13 搭建目录结构, 保证组件正常连接



21:13-

主干搭建好, 开始添加css (龙哥这里用module.css了) 



21:27- 

css variable --->  MDN doc

如果一个组件的长宽会影响其他的组件时, 使用css variable (查MDN如何用css variable)来建立他们之间的dependency





### :moon: 开始写Navigation 21:41 - 22:08



21:53-

尝试运行, check Navigation的效果, 但是报错debug

:star: `<a>`里面可以放其他标签





:star: 复用的问题: 前端设计模式 22:08-

有的item hover是有drop down出来, 有的item是点击跳转另一个页面, 但他们都是item内容类似但功能却不同, 这中间如何平衡复用(因为这两种Item结构上有共同点)与item的功能的多样性(但这两种Item的功能又不完全一样)?

龙哥是把上面提到的两种item的共同点(比如结构上都icon 跟一个 name)提取出来放在Item组件里， 然后又新建两个组件: DropdownItem, LinkItem, 这两个组件依赖Item组件. 

Java里为了降低耦合度, 采用里氏替换原则也有类似的做法



```react

// item: 最小可复用单元抽离出来, 外面再套其他组件
export default function Item({
  	icon,
  	children
}){
  return (
  		<div className={styles.container}>
    			<div className={styles.item}>
      				<div className={style.icon}>{icon}</div>
            	<div className={style.label}>{children}</div>
      		</div>
    	</div>
  )
}


// LinkItem, 里面放一个Item
export default function LinkItem({
  icon,
  url,
  children
}){
  return (
		<a href={url}>
    		<Item icon={icon}>{children}</Item>  
    </a>
  )
}

// DropdownItem, 里面放一个Item
export default function DropdownItem({
  icon,
  children
}){
  return (
  		<div>
    			<Item icon={icon}>{children}</Item>
    	</div>	
  )
}



// Navigation里使用LinkItem 与 DropdownItem
export default function Navigation(){
  	return (
    	<nav className={styles.container}>
      		<LinkItem icon={<FaGamepad />} url="/games" >Games</LinkItem>
          <LinkItem icon={<AiOutlineFileSearch />} url="/search" >Search</LinkItem>
          <LinkItem icon={<BiNews />} url="/news" >News</LinkItem>
          <LinkItem icon={<BiCommentsDots />} url="/reviews" >Reviews</LinkItem>
        	<DropdownItem icon={<FiMoreHorizontal />}>More</DropdownItem>
      </nav>
    	
    )
}
```



### 写DropdownItem的弹窗 22:20-22:33

弹窗其实是挂在DropdownItem里(通过jsx), 当鼠标hover上去时才显示(通过css)

```react
// Navigation里使用LinkItem 与 DropdownItem
export default function Navigation(){
  	return (
    	<nav className={styles.container}>
      		<LinkItem icon={<FaGamepad />} url="/games" >Games</LinkItem>
          <LinkItem icon={<AiOutlineFileSearch />} url="/search" >Search</LinkItem>
          <LinkItem icon={<BiNews />} url="/news" >News</LinkItem>
          <LinkItem icon={<BiCommentsDots />} url="/reviews" >Reviews</LinkItem>
        	<DropdownItem icon={<FiMoreHorizontal />}
            	items={[
           			 {label:'About Us', url:'/about-us'},
                  {label:'Support', url:'/support'},
                  {label:'Terms', url:'/terms'},
                  {label:'Privacy', url:'/privacy'}
          		]}
            
            >More</DropdownItem>
      </nav>
    	
    )
}


// DropdownItem 接着加工
export default function DropdownItem({
  icon,
  children,
  Items
 
}){
  return (
  		<div className={styles.container}>
    			<Item icon={icon}>{children}</Item>
      
      		<ul className={styles.items}>
            	{items.map((label, url)=>{
              	return (
                  <li key={url} className={styles.item}>
                    <a
                      href={url}
                      className={style.link}
                      >
                      {label}
                    </a>
                  </li>
                )
            })}
      		</ul>
    	</div>	
  )
}

```





22:33-22:35

简单的向DropdownItem加入state















