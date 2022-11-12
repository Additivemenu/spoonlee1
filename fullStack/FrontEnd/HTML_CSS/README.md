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
+ Picture
+ Video
+ Audio



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
[Learning Material: wc3 selector](https://www.w3schools.com/CSSref/css_selectors.php)

用来修饰HTML元素的格式, 但首先你得选择特定的HTML标签来施加修饰, 这就需要选择器:

Demo |
------ |
[选择器demo](CSS_Sample/Selector/CSS_Selector.html)   |
[wc3 Selector: nth-child demo](https://www.w3schools.com/CSSref/tryit.php?filename=trycss3_nth-child)|


### 2.1.1 无括号选择器:
allow us to reach down to branch of tag tree

+ ‘>’ 表示下一层. 

+ 空格表示下属所有.

+ nth:child(int)

### 2.1.2 有括号选择器
select tag element based on text filter

+ 直接选择
  [ = ]
+ 相关性选择
  [ *= ]
+ 头尾选择
  [ ^= ]: 开头
  [ $= ]: 结尾
+ 多个选择器合并选择
  一般用于text的多重filter, 比如先筛出来href和"google"相关的, 再筛出来href是以".com.au"结尾的

### 2.1.3 特殊语法 class::宏 
注：一下的指令中包含”::”是CSS中为数不多的语句，一般都是”:”

可使用 class::宏来渲染段落的某部分
+ .pseudo::first-letter{}: 只对第一个字母生效
+ .pseudo::first-line{}: 只对第一行生效
+ .pseudo::selection{}:只对用鼠标选中部分生效

除此外, 了解伪元素的概念:
.pseudo::before{}：在元素前跟随，有大用可以做特效（以后会讲）
.pseudo::after{}: 在元素后跟随


## 2.2 :moon: Block element
即div tag
```html
<div class="block1"></div>
```

Demo |
------ |
[block demo](CSS_Sample/Block_Element/Block.html)   |
[block position demo](CSS_Sample/Block_Position/Block_Position.html) |


### 2.2.1 Basics of Block
#### 2.2.1.1 block 基本属性
width, height, background
```css
.block1{
  width: 300px;
  height: 300px;
  background: red;
}
```
#### 2.2.1.2 设置html, body margin & padding

如下设置之后, block与网页的间距会消失
```css
html,body{
    margin:0;
    padding:0;
}
```

#### 2.2.1.3 border & border-radius
  
block有圆角
```css
.block1{
    width: 300px;
    height: 300px;
    background: red;
    border: 3px solid black;
    border-radius: 10px;
  }
```

block变成circle
```css
.block1{
    width: 300px;
    height: 300px;
    background: red;
    border: 3px solid black;
    border-radius: 50%;
  }
```

#### 2.2.1.4 :star:文档流

设置两个block, 会发现block2并不是出现在block1的右边, 而是在它下面

事实上, 一个bolck实际上是占一行的文档。Block默认是从左上角开始出现，新的block会占新的一行，而不是出现在旧的block的右边。

```html
  <div class="block1"></div>
  <div class="block2"></div>
```
```css
.block1{
    width: 300px;
    height: 300px;
    background: red;
    border: 3px solid black;
    border-radius: 10px;
}

.block2{
width: 300px;
height: 300px;
background: yellow;
border: 3px solid black;
border-radius: 10px;
}
```

#### 2.2.1.5 :star:Display属性
block的display属性, 默认是block, 即服从上面的文档流, 一个block结束了, 下一个block从下一行开始;

如果将display设为inline-block, block对外会呈现出inline的性质, 像text一样从左向右排列, 一行满了再去下一行.

```html
  <div class="block1"></div>
  <div class="block2"></div>
  <div class="block2"></div>
```

```css
html,body{
    margin:0;
    padding:0;
}

.block1{
    width: 300px;
    height: 300px;
    background: red;
    border: 3px solid black;
    border-radius: 10px;
    display:block;
}

.block2{
    width: 300px;
    height: 300px;
    background: yellow;
    border: 3px solid black;
    border-radius: 10px;
    display:inline-block;
}
```
![](Src/block_display.png)


### 2.2.2 :star: Position of Block
关于block的position属性

#### 2.2.2.1 static (by default)
```css
position: static;
```
Position属性如果是Static，则位移属性（left,right,top,bottom）无效，block的位置完全由文档流决定

#### 2.2.2.2 :star: relative

```css
position: relative
```
此时位移定义可以生效:
+ Left: 使得原来位置在新的位置左侧; right同理
+ Top: 使得原来位置在新的位置上侧; bottom同理

```html
<div class="block1"></div>
<div class="block2"></div>
<div class="block2"></div>
```

```css
html,body{
    margin:0;
    padding:0;
}


.block1{
    width: 300px;
    height: 300px;
    background: red;
    border: 3px solid black;
    border-radius: 10px;
    display:block;
    position: relative;     /*now that left, top works*/
    left: 100px;
    top: 100px;
}

.block2{
    width: 300px;
    height: 300px;
    background: yellow;
    border: 3px solid black;
    border-radius: 10px;
    display:inline-block;
}
```
![](Src/relative%20position.png)
+ 使用位移属性, 有可能将block移出视口
+ 位移属性优先级顺序: 同时定义了left, right, top and bottom的情况下, left, top优先, right, bottom作废


#### 2.2.2.3 absolute
```css
position: absolute;
```
position为absolute的block将会从文档流中脱离出来
+ **文档流**这里指的是，默认情况下，一个block从左上角开始，其实是占一行，下一个block直接从下一行开始而不是接着上一个block的右边开始，当然你可以通过将display属性从默认的block改为inline-block，使得下一个block接着上一个block的右边开始。总之文档流指的是一种文档的布局排布序列，从上到下，从左到右。
+ **脱离文档流**的意思是，不影响接下来block的布局排序，但其自身还是遵从文档流，跟着上一个block, 如蓝色的block还是在绿色的block的下一行

> 疑问：如果连写俩absolute sub block会怎么样？还是各自一行吗？还是重叠在一起？我倾向于重叠在一起

```html
<div class="block1">
    <div class="sub_block1"></div>
    <div class="sub_block2"></div>
    <div class="sub_block3"></div>
</div>
```
```css
html,body{
    margin:0;
    padding:0;
}

.block1{
    width: 500px;
    height: 500px;
    background: red;
}

.sub_block1{
    width: 100px;
    height: 100px;
    background: yellow;
}

.sub_block2{
    width: 100px;
    height: 100px;
    background: lightgreen;
    position: absolute;     /*isolate sub_block2 from document flow*/
}

.sub_block3{
    width: 100px;
    height: 100px;
    background: purple;
    position: relative;     /*now that displacement attributes works*/
    left: 50px;
    top: 50px;
}
```
将sub_block2从文档流独立出去, sub_block3的位置紧跟上一个在文档流中的元素(sub_block1)
![](Src/position_absolute.png)


如果将sub_block2算入文档流, 则sub_block3的位置紧跟上一个在文档流中的元素(sub_block2)
![](Src/position_absolute2.png)

#### 2.2.2.4 :star: relative & absolute

turn to here


#### 2.2.2.5 fixed

#### 2.2.2.6 sticky

#### 2.2.2.7 :star: block的覆盖关系




### 2.2.3 Dimension of Block



## 2.3 Flexbox