JR-wk1-lec2

0-14min
唠嗑
+ 解决一个问题, 可以多选几个方法

---

# Selector 14min-
+ 标签选择器
+ 类选择器
  + 类选择器可以在页面中多次使用 
  + 使用最多
+ ID选择器
  + 同一页面中只能使用1次(因为ID是unique的)
  + 使用很少

优先级: ID selector>类selector>标签selector>通配符选择器; 
  + 优先级高的会覆盖优先级低的

:question: 上节课的name, id的区别 17min-

:question: class是不是也可以归为一类? 不同标签可以使用相同的类名, 主要用于css选择

HTML快速打字
```css
div*5

div>span

div+p   

div.class1

div#id1

ul>li#id2

div.demo$*5 /*class name中的数递增*/

div{hello}  /*tag内容*/

div{$}*5    /*内容中的数字递增*/
```

CSS简写: 只打首字母
```css
text-align: center; 
/* type in tac */

text-indent:2em;
/* type in ti2 */

```

:gem: practice 
0-08  33min-55min

14-18 (见PPT P7: 选择器总结) -1h44min

https://developer.mozilla.org/en-US/docs/Web/CSS/Pseudo-classes

1h34min-
json setting, autoformat, autosave

# CSS文本属性
:gem: practice

09-13 55min-

10: inline-height = 上间距+font-size+下间距

PPT p8

code sandbox, 可以在Inspector里试代码, 好了再放进代码里


# :moon: block element 1h44min-


19 1h44min-1h53min



20 1h53min-1h58min



PPT 22 1h46min- 
+ block
+ inline
  + 设置width, height无效; 默认宽度是自己的宽度
  + 想要设置宽高, 可以转换为inline-block再设置
+ inline-block
  + `<img>`, `input`, `td`



21 1h58min-2h03min
+ 方法一: line-height(和height匹配) + text-align
+ 方法二: Display: flex; justify-content:center; align-items: center;
PPT 23

休息 2h03min-2h10min

唠嗑 2h10min-2h16min

## 背景


22 2h16min-2h23min

23 2h23min-2h39min
+ background-position
  + x,y默认值是center


24 2h39min-

25 2h42min-2h51min

## :moon: CSS三大特性 2h51min-3h

:question: 讲的啥????

PPT 24

26 层叠性

27 继承性

28 优先性

29 权重注意点

30 权重的叠加

## :moon: box model 3h-



31 定义padding, border, margin会改变box的大小 3h-

# 看到这里

32 border-box  3h08min-
+ h1不指定宽度, 继承其parent的宽度, 定义的padding加不上去 :question: 讲错了吧, 能加上去阿
+ h1指定宽度, 定义的padding才能加上去

33 3h13min-

34


## flex
35 3h17min-3h25min

[flexbox playground](https://codepen.io/ndangelo/pen/BaamRam)


作业在哪里?