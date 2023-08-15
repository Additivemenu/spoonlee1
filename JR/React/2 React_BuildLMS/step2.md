龙哥 2-28 lec



React 中不是说绝对不能用document，有的情况下只能用document (比如做Dropdown list组件之类的), 但是不要用document做命令式的内容



遵守react哲学 step1-5 写代码, 写代码水到渠成 越是复杂的功能越应该遵守react哲学



澳洲面试官喜欢问的问题

```js
大多数是开放问题, 而不是yes or no的客观技术问题, 希望问你你的经历, 由你来主导面试
回答永远是答案 + 例子 (例子从项目经验中获取)
- 什么样的代码是好代码?
- 在你的代码经历中, 遇到的最大的挑战是什么样的?
- 你认为什么样的团队是好的团队?
  
  
在澳洲, 如何回答面试问题? 可以尝试问问chatGPT怎么回答学习学习  (回答往往都是故事 + 你的答案)
- 准备好15个小故事 (不要生硬的背诵式答案, 而是从项目中积攒的经历, 挫折...这样显得真实生动)
	故事要体现:
	- Readable, Maintainable, Reusable
  - SOLID
  - Component, Declarative
	比如有次我做某个功能的时候..., 刚开始...., 但是意识到...问题, 我...处理, 体现了Component, declarative
所以积攒经验, 尤其是struggling的经验会很有用
```



# 开始讲课 

## 继续写Navigation 20:15- 20:44

```js
React哲学
- 划分组件层级
- 静态版本
- 状态的最小显示 (不考虑state lifting)
- 状态的正确位置 (考虑state lifting)
- 回调函数

邓宁-克鲁格心理效应 (Dunning-Kruger effect)
```



20:23-

我们接着做Navigation



Navigation中的每个item, 点击呈现白色, 不点击没有颜色 这个需求  

:bangbang: 自己实现下这个需求, 做更小的一个demo(就1个button, 点击亮出现dropdown, 不点击不亮)

```js
金句: 任何东西在页面上发生改变 ---> state  ---> state放在哪里? 先放在最小位置
css中不用hover, 利用js也能实现类似的功能

金句:  需要变化stlye时，使用classnames (导入的依赖)来控制额外的class
```

```react
function Item(){
  	// we nned a state here to control whether the item is show white color and label here
  // boolean state
  	const [isHighlight, setIsHighlight] = useState(false);
  
  // 需要变化stlye时， 使用classnames (导入的依赖)来控制额外的class
  return (

  )
}
```



```css
```







20:44

修改颜色





## 接着做Header 20:51

### Step1 建立目录结构, 保证组件连接  20:51-21:00

```
-Header
	- Search
		- ResultDropdown (又是dropdown!)
	- Login
		- Login Modal
```





### step2 静态版本 21:00-

编辑css做布局与样式

绕一大圈不如写一个css variable来控制顶部的gap



:star: 使用react icon 21:25 导入图标, 尽量别用svg

https://react-icons.github.io/react-icons/



龙哥: 我要是用tailwind会快很多



:star: css variable 放在index.css `:root{}`统一管理 21:37

龙哥: css 我们也想做复用嘛



#### ResultDropdown 和LoginModal 21:45

还是先做静态版本, 再去做state



:star:简单的重复大于复杂的抽象 21:49-

重复之后再去考虑抽象







#### 点击Login弹窗 21:55-

Modal

弹窗的写法

```react
<Wrapper>			{/*弹窗背后的那层虚化背景*/}
		
	<Container>		{/*弹窗*/}
		
  </Container>
</Wrapper>
```





#### 组件复用: NakedButton 22:02-





Css: W3 school CSS 建议通读背诵





#### 组件复用: CloseButton 22:10-



### step3 state最小位置  22:17- 22:33

需求: 点击close button, 关闭modal 代表的弹窗



需求: 点击login button, 打开modal代表的弹窗





需求: 点击(onFocus属性)search 的input, 显示ResultDropdown, 不点击 (onBlur属性)不显示ResultDropdown

短路计算的应用

input里的值变化(onChange 属性)时





衍生状态 22:32

当一个状态可以由其他状态推导出来, 就可以用衍生状态









#  总结 22:33-

坚持走react哲学的路

P3前端虽然功能能实现, 不代表你写的代码质量好, 要遵守react哲学一步步写出react代码

