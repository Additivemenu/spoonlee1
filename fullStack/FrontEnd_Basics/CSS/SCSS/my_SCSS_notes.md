跳转

[my_CSS_notes](../myCSSNotes.md)

---
content

- [0. 一些SCSS相关的terminal指令](#0-一些scss相关的terminal指令)
- [1. SCSS五大特性](#1-scss五大特性)
  - [1.1 variable](#11-variable)
  - [1.2 nesting](#12-nesting)
  - [1.3 Mixin](#13-mixin)
  - [1.4 Partials](#14-partials)
  - [1.5 Extend/Inheritance](#15-extendinheritance)
- [2. SCSS function](#2-scss-function)


---

学习资源

[sass官方](https://sass-lang.com/)

---

SCSS是一种改良版的CSS写法, 可以实现一些额外的具有类似programming language特性的简洁语法, 通过把.scss文件编译为.css文件, 可以大大提高CSS的coding效率



# 0. 一些SCSS相关的terminal指令

[how to install node.js and npm on Mac](https://treehouse.github.io/installation-guides/mac/node-mac.html
)



安装好node.js与npm之后, 安装sass
```bash
npm install -g sass         // intall sass using npm
sass      // 显示sass功能说明
```


```bash
// 将scss文件编译成css文件
// 注意先cd到合适的当前路径
sass SCSS/style.scss:CSS/style.css          
```

```bash
// 自动编译
sass --watch SCSS/style.scss:CSS/style.css
```


# 1. SCSS五大特性 

## 1.1 variable

+ 用`$`前缀来标识变量. 注意声明和引用变量都得用`$`

```scss
// scss

$primary-color: #555;

div.box{
    background-color: $primary-color;
}

h1.page-header{
    border: 1px solid $primary-color;
}

// 变量包含另一个变量, 但是注意用到的variable需要事先定义过  
$primary-border: 1px solid $primary-color;

h2.page-header{
    border: $primary-border;
}
```

```css
/*css*/

div.box {
  background-color: #555;
}

h1.page-header {
  border: 1px solid #555;
}

h2.page-header {
  border: 1px solid #555;
}
```

## 1.2 nesting
结合BEM(block__element--modifier) class name的命名规范, nesting让标签结构同HTML相比更加一目了然

```scss
// 对于一个nesting的scss选择器写法

ele1{
  //variable -------------------------------

  //style for ele1 -------------------------

  //style for sub-elements of ele1 ---------
  Tag{
    ...
  }

  &-elementName{
    ...
    &__modifierName{
      ...
    }
  }


  //style for pseudo class of ele1 ---------
  &:hover{

  }
}
```

:gem: e.g.1 对元素的nesting

```scss
.nav{
    height: 100px;
    ul{
        margin: 0;
        li{
            padding: 5px;
        }
        a{
            display: block;
            color: #000;
            &:hover{
                background-color: blue;
                color: #000;
            }
        }
    }
}
```
```css
.nav {
  height: 100px;
}
.nav ul {
  margin: 0;
}
.nav ul li {
  padding: 5px;
}
.nav ul a {
  display: block;
  color: #000;
}
.nav ul a:hover {
  background-color: blue;
  color: #000;
}
```

:gem: e.g.2 对属性(attribute)的nesting写法

当然如果不想对属性nesting写也可以

```scss
// scss
.nav{
    border: 1px solid #000{
        left: 0;
        right:0;
    };
}
```

```css
/*css */
.nav {
  border: 1px solid #000;
  border-left: 0;
  border-right: 0;
}
```

## 1.3 Mixin

[wiki: what is mixin](https://en.wikipedia.org/wiki/Mixin)

有点类似programming language中的函数概念, 定义一个mixin作为一组css样式的代码模块(甚至可以往模块里传递参数), 后面要用到这个代码模块时直接用`@include`调用即可, 大大提高代码复用率

`@mixin` & `@include`

mixin的返回值就是`{ }`括起来的代码.

:gem: e.g.1 mixin中为全为常量

```scss
// mixin 也可包含其他mixin或使用嵌套
@mixin alert{
    color: #000;
    a{
        color: pink;
    }
}

.alert-warning{
    @include alert;
}
```

```css
.alert-warning {
  color: #000;
}
.alert-warning a {
  color: pink;
}
```

:gem: e.g.2 mixin传递参数
+ again, 变量用$前缀标识

```scss
//mixin 可以传递参数(有点像函数了)
@mixin alert2($text-color, $background){
    color: $text-color;
    background-color: $background;
}

.alert-info{
    @include alert2(#333, green)
}
```

```css
.alert-info {
  color: #333;
  background-color: green;
}
```

## 1.4 Partials

`@import`: import其他scss文件
```scss
// partials @import, import其他scss文件
// import 一般写在scss文件开头
@import "base";   // import 名为 '_base.scss的文件'

```

```css
body {
  margin: 0;
  padding: 0;
}
```

<hr/>

`@each`: for-loop似的批量写法
+ 变量用$前缀标识
```scss
// scss
// @each
@each $animal in cat, dog, pig{
    .#{$animal}-icon{
        background-image: url('./images/#{$animal}.png');
    }
}
```


```css
/*css*/
.cat-icon {
  background-image: url("./images/cat.png");
}

.dog-icon {
  background-image: url("./images/dog.png");
}

.pig-icon {
  background-image: url("./images/pig.png");
}
```

## 1.5 Extend/Inheritance

类似programming language中的类的继承, 这里的'类'相当于是选择器

`@extend`: 让一个选择器继承另外选择器的样式, 提高代码复用率

如果单单只是复用代码, 还是用mixin; 如果涉及到选择器的继承再用extend, extend总体用的少.

```scss
// scss

//@extend, 让一个选择器继承另外选择器的样式, 提高代码复用率
.button{
    padding: 15px;
    width: 200px;
    height: 30px;
}

.button-info{
    @extend .button;
    background-color: yellow;
}
```

```css
/*css*/

.button, .button-info {
  padding: 15px;
  width: 200px;
  height: 30px;
}

.button-info {
  background-color: yellow;
}
```


# 2. SCSS function
SCSS定义了很多函数可供直接调用, 以@function为例, 颜色函数 lighten为减淡, darken为加深:
```scss
lighten($color, $amount)    // 颜色, 颜色变化百分比
darken($color, $amount)
```


e.g.
```scss
body{
  color: lighten($gray, 10%)
}
```


