
唠嗑 0-9min

margin合并塌陷 9min-
+ 给父级加Border可以解决父级塌陷问题
+ 加padding也可
+ 其他方法: 浮动, 固定, 绝对定位的盒子不会出现塌陷问题


这节课开始 14min-
# 01 em 15min-
+ 子元素的字体大小的em是相对于父元素的字体大小.
+ 元素的width/height/padding/margin用em的话是相对于该元素的font-size

chrome默认最小字体大小为12px, 

# 02 rem 22min-
+ rem比em更常用
+ 默认 1rem = 16px, 但是可以在html{font-size:}改

对应地, px一般用于border或者定位属性

# 03 bem(block__element--modifier) 31min-
+ Bem命名规范

e.g.
product-card__image--primary


JS的基础打好很重要

# 04 media query(响应式布局) 42min-
+ 有重叠的区间, 后写的覆盖前面写的
+ 好的规范: 写的时候区间从大到小（还是我听错了应从小到大）来写
+ 具体区间的划分看公司的规定


定位58min-

# 05 relative 58min-


# 06 absolute

# 07 absolute

sticky不算做有定位, 有定位只有3中relative, absolute, fixed

:question: fixed会影响文档流吗?

:question: 再理解理解代码

看看PPT


# 08 fixed 1h14min-

# 09 fixed 1h21min-

# 10 sticky 1h30min-
fixed与relative的结合
+ 除了position: sticky, 还需额外定义一个位移属性(滚动后的位置)才能实现sticky

看PPT 15


# transition 1h38min-

transition只是让变化有一个过程, 变化不是由transition定义的

11

a:hover b 实 现一个元素触发另一个元素的变化, 或者通过JS的event


中间休息

# SASS 2h06min-3h05min

```bash
npm install -g sass         // intall sass npm

npm -v

node -v

sass
```


scss 文件编译成普通的css文件
```bash
sass SCSS/style.scss:CSS/style.css          // 将scss文件编译成css文件
```

```bash
// 自动编译
sass --watch scss:css
```
为毛不需要指定路径:angry:



---

homework 3h05min-

JS预习: 
map reduce filter