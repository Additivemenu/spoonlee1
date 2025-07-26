学习资源

:book: ​ [sass official doc](https://sass-lang.com/)









# Intro



## why scss?

SCSS是一种改良版的CSS写法, 可以实现一些额外的具有类似programming language特性的简洁语法, 通过把.scss文件编译为.css文件, 可以大大提高CSS的coding效率



### scss vs. css 

SCSS Modules and CSS Modules both serve to modularize and encapsulate styles in a web application, particularly useful in frameworks like React. However, SCSS Modules offer several distinct advantages over plain CSS Modules due to the additional features provided by SCSS (Sass):

1. **Preprocessing Capabilities**: SCSS is a preprocessor language that offers features like variables, nesting, mixins, and inheritance, which are not available in plain CSS. This allows for more dynamic and reusable styling.

2. **Better Organization**: SCSS's ability to nest styles mimics the DOM structure, making it easier to manage and understand the relationship between styles.

3. **Code Reusability and Maintainability**: With features like mixins and extend/inheritance, SCSS allows for more reusable code, which can lead to cleaner and more maintainable stylesheets.

4. **Advanced Functionality**: SCSS provides functions, loops, and conditionals, allowing for more complex and programmatically generated styles, which is not possible with plain CSS.

5. **Compatibility with CSS**: SCSS is fully compatible with CSS, which means any valid CSS is also valid SCSS. This makes transitioning to SCSS modules easier for teams already familiar with CSS.

In summary, while CSS Modules offer the core benefit of scope isolation, SCSS Modules extend this by adding powerful preprocessing capabilities, leading to more maintainable, scalable, and readable styles.





### scss vs. scss modules in react

The key difference between using SCSS and SCSS Modules lies in how styles are scoped and managed:

1. <span style="color:yellow">**Local Scope with Modules**: SCSS Modules provide locally scoped class names, meaning the styles you define in a module are only applied to the component that imports them. This reduces the risk of style conflicts across your application.</span>

2. **Modular and Component-Specific Styling**: With SCSS Modules, each component can have its own styling file, making the styles easier to manage and understand in the context of each component. This is particularly beneficial in large applications where maintaining a global stylesheet can be challenging.

3. **Codebase Organization**: SCSS Modules help in organizing the codebase by keeping the styling closely tied to the respective components. This encapsulation makes it easier to understand and maintain the styling for each component.

4. **Easy Maintenance and Refactoring**: When using modules, refactoring or updating styles for a specific component becomes easier since you only need to modify the styles in one place, without worrying about unintended side-effects elsewhere.

5. **Combining Global and Local Styles**: SCSS Modules allow you to combine global styles (defined in regular SCSS files) with local styles (defined in module files), giving you flexibility in how you apply styling throughout your application.

In essence, while regular SCSS provides the preprocessing features like variables, mixins, and nesting, SCSS Modules add an extra layer of organization by locally scoping these styles to specific components, thereby enhancing maintainability and reducing style conflicts.



# some cmd to scss

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

[sass doc: styling](https://sass-lang.com/documentation/style-rules/)



## 1.1 variable

+ 用`$`前缀来标识变量. 注意声明和引用变量都得用`$`
  + 同样, 结合nesting, variable具有自己的作用域


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
用的最多!



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

