HTML & CSS




# 1. HTML

[HTML精简笔记](https://www.wolai.com/topcoderdoc/qxVBEVDrfSzif4djdw4hGm)

主要标签(tag)就4部分: 1)文本相关; 2)heading; 3) multi-media; 4) HTML list

标签格式:
```html
<p class="", ... >html content</p> 
```
+ html content 可以是text, 也可以是html tag, 比如一个表示image的tag
+ tag 后面的class， 可以用来区分相同类型的tag

## 1.1 HTML基本语法

### 1.1.1 文本相关

### 1.1.2 Heading

### 1.1.3 multi-media

### 1.1.4 HTML list

[HTML List demo](HTML_Sample/HTML_LIST.html)

![result](Src/htmlist1.png)

注意其中nested list的写法

HTML <table> 快过时了, 因为现在有了新的布局工具



## 1.2 注意特殊语法:
+ p.active 和p .acitve 的区别 （2h08min-）
前者指p本级有个叫active的class，后者指p下属所有级适用的叫active的class
注解:本级，下属级指代写html时的分属关系，如<p> <em></em>  </p> 中em下属于p
+ Vscode的emmet (快捷指令宏): e.g. 批量写p： p>span.sp-$*6，按tap


# 2. CSS

## 2.1 选择器
[Resource: wc3 selector](https://www.w3schools.com/CSSref/css_selectors.php)

用来修饰HTML元素的格式, 但首先你得选择特定的HTML标签来施加修饰, 这就需要选择器:

[选择器demo](CSS_Sample/Selector/CSS_Selector.html)

### 2.1.1 无括号选择器:
  + ‘>’ 表示下一层. 

  + 空格表示下属所有. 如ul.info li, 表示选择ul.info下属的所有li标签

  + nth:child(int)

### 2.1.2 有括号选择器
  