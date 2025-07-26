display: grid/inline-grid;完成 grid布局
display:grid和display:inline-grid的区别是：inline-grid容器外部盒子保持内联特性，因此可以和图片文字在同一行显示；grid容器保持块状特性，宽度默认为100%，不和内联元素在一行显示。

| **作用在grid容器上** | **作用在grid子项上** |
| --- | --- |
| grid-template-columns | grid-column-start |
|grid-template-rows  |grid-column-end|
|grid-template-areas|grid-row-start|
|grid-template|grid-row-end|
|grid-auto-columns|grid-column|
|grid-auto-rows|grid-row|
|grid-auto-flow|grid-area|
|grid|justify-self|
|justify-items|align-self|
|align-items|place-self|
|place-items||
|justify-content||
|align-content||
|place-content||
|column-gap||
|row-gap||
|gap||


基本概念
网格：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1702957254406-dedaadc3-2414-445e-b489-0269bb2b20d9.png#averageHue=%23f0fbe3&clientId=u7e62491d-0ace-4&from=paste&height=347&id=uc4936983&originHeight=347&originWidth=345&originalType=binary&ratio=1&rotation=0&showTitle=false&size=9176&status=done&style=none&taskId=u9722ee2a-00e3-4729-ba43-815b5b056ce&title=&width=345)
 行，列， 线段，单元格。

## grid-template-columns grid-template-rows;
**grid-template-columns** 和 **grid-template-rows** 是用于定义 CSS Grid 布局的两个属性。它们分别用于指定网格容器的列和行的大小和结构。
grid-template-columns设置的列的宽度，单元格的宽度
grid-template-rows设置是行的高度，单元格的高度

支持的参数：
默认值：none
### 长度值

- px（像素）
- em（相对于当前字体尺寸的单位）
- rem（相对于根元素字体尺寸的单位）
- vw/vh（视口宽度/高度的百分比）
- %（百分比，相对于容器的大小）
### 分数单位

- fr（fraction，分数单位，代表可用空间的一部分）
### 关键词

- auto：自动计算每行或每列的大小。
- min-content：设置大小为内容的最小尺寸。
- max-content：设置大小为内容的最大尺寸。
### 函数

- repeat()：允许重复相同大小的行或列多次。
- minmax()：设置一个大小范围，语法是minmax(min, max)，其中min是最小值，max是最大值。
- fit-content()：限制网格轨道的尺寸，在给定的最大值和所需的最小值之间。

repeat();
预定义的尺寸或重复模式

- auto-fill：自动填充网格线，网格容器会根据列或行的尺寸重复创建尽可能多的轨道，并在容器内填满它们。
- auto-fit：与auto-fill类似，但任何未被内容占用的轨道将会被收缩并且不会占据空间。

repeat()函数只能作用在grid-template-columns和grid-template -rows这两个CSS属性上。

fit-content(limit)

```
fit-content(limit) = max(min-content, min(limit, max-content))
```
#### 补充：
repeat()函数只能作用在grid-template-columns和grid-template -rows这两个CSS属性上。
### 补充：网格线命名
```css
ele {
  grid-template-rows: [line-start] 100px [line-1] 200px [line-end]
}
```


## grid-template-area grid-template

### grid-template-areas

CSS Grid 布局中用于指定网格区域的属性。它允许你通过一个字符字符串来定义网格容器的布局，每个字符代表一个单元格，从而创建具有特定区域的网格结构。

若干行字符串表示单元格名称，例如

```css
.ele {
  grid-template-areas: 
    "头部 头部 头部 头部 头部"
    "侧边栏 侧边栏 内容区 内容区 内容区"
    ". footer footer footer ."
}
```

单元格名称 汉字也可以 . 代表空的单元格

注意：每块区域保证是 **矩形** L型， 凹凸型都是无效区域



配合着子项目中的 grid-area属性 使用

```css
.ele {
  grid-template-areas: 
    "头部 头部 头部 头部 头部"
    "侧边栏 侧边栏 内容区 内容区 内容区"
    ". footer footer footer ."
}
.header {
  grid-area: 头部
}
.sidebar {
  grid-area: 侧边栏
}
.content {
  grid-area: 内容区
}
.footer {
  grid-area: footer
}
```



grid-template: 三个属性的简写

grid-template: 行 / 列

grid-template: 

​      area1 行1

​      area2 行2 /

​      列 

包含<string>（区域名称）的grid-template缩写属性是不支持repeat()函数的



### grid-auto-columns和grid-auto-rows属性

显式网格：我们定义的网格

隐式网格：超出我们定义的网格的区域

grid-auto-columns和grid-auto-rows属性的作用是指定任何自动生成的网格（也称为隐式网格）的尺寸大小

```html
<style>
  .grid {
    display: grid;
  grid-template: 1fr 1fr / 1fr 1fr;
}

</style>
<div class="grid">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
</div>
```



## grid-auto-flow

用于指定在自动生成的网格项目放置到网格容器中时的放置顺序。

默认值： row: 表示没有指定位置的网格在水平（行）方向上自然排列；

![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703042386718-9741dfc7-0451-4682-8a09-ee72d6324466.png)

column: 没有指定位置的网格在垂直（列）方向上自然排列

![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703042403356-27263286-8fc9-4a14-bc5c-03abe8d13ba1.png) 

dense: 自然排列启用“密集”打包算法，也就是说，如果稍后出现的网格比较小，则尝试看看其前面有没有合适的地方放置该网格，使网格尽可能排列紧凑

## grid

熟练使用grid缩写属性，是掌握网格布局的重要标志之一。

grid属性的缩写规则比较复杂。grid是这些CSS属性的缩写集合：grid-template- rows、grid-template-columns、grid-template-areas、grid-auto-rows、grid- auto-columns和grid-auto-flow。

整体可以分为四大类：



grid: none;

grid: grid-template;

grid: <grid-template-rows> / [ auto-flow && dense? ] <grid-auto-columns>?

grid: [ auto-flow && dense? ] <grid-auto-rows>? / <grid-template-columns>



提一嘴 gap:

gap: 用来设置网格行与列之间的间隙

column-gap: 用来设置行元素之间的间隙

row-gap:  用来设置列元素之间的间隙



## 排列方式

#### 1、justify-items

| 属性值  | 描述                         | 图示                                                         |
| ------- | ---------------------------- | ------------------------------------------------------------ |
| start   | 左对齐。                     | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703059619115-49f7c5b0-e478-4131-93fd-9f53507e521e.png) |
| end     | 右对齐                       | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703059637352-7d13db39-97a8-4769-be36-d6e7b14fada4.png) |
| center  | 居中对齐                     | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703059660848-8bafb4f8-5ae5-4be8-bd58-f4c0ca5e7461.png) |
| stretch | 拉伸，占满单元格的整个宽度。 | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703059695924-eb375d35-dd35-4695-9549-1eb3f35b49d8.png) |



#### 2、align-items

| 属性值   | 描述                         | 图示                                                         |
| -------- | ---------------------------- | ------------------------------------------------------------ |
| start    | 上对齐。                     | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703059746012-ad16198f-3d56-42fa-85da-d716a30972fc.png) |
| end      | 下对齐                       | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703059769120-a1383634-6f06-4b14-84c8-fad51ca6c3c6.png) |
| center   | 居中对齐                     | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703059790094-f3f20fd9-f288-4436-967f-04cae332031a.png) |
| stretch  | 拉伸，占满单元格的整个宽度。 | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703059705502-055c804e-3fed-41f8-a619-10a059691864.png) |
| baseline | 按照文字基线对齐             | 有文字按照文字对齐，没有的话按照元素底部对齐                 |

- normal是默认值，会根据使用场景的不同表现为stretch或者start。
- 如果grid子项是具有内在尺寸或具有内在比例的元素，则此时normal的表现类似于start属性值的表现

![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703060505633-97d973f9-1cd9-4fa4-a166-78c04a9099d7.png)



place-items: <align-items> <justify-items>?



justify-content属性和align-content属性分别指定了网格元素整体水平方向和垂直方向上的分布对齐方式。

要想justify-content属性和align-content属性起作用，就需要让grid子项的总尺寸小于grid容器的尺寸。要么给gird子项设置较小的具体的尺寸值，要么让gird子项的尺寸是auto，同时保证内容尺寸较小

#### 3、justify-content

| 属性值 | 图示                                                         | 属性值        | 图示                                                         |
| ------ | ------------------------------------------------------------ | ------------- | ------------------------------------------------------------ |
| start  | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703060678553-b3fa24fa-280b-4aed-bcf8-c16a096cb377.png) | space-around  | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703060748430-412aa0bd-0047-4852-a296-d4978754b808.png) |
| end    | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703060694840-5ff54d58-60a0-401e-99a6-2b7f4d821662.png) | space-between | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703060733455-192987f4-9f91-4778-bd55-2cc857119230.png) |
| center | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703060644583-48486bca-a92b-4034-938d-da3143aff4ba.png) | space-evenly  | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703060766857-76df5009-cea7-448b-b9ed-664e40a1b50b.png) |

#### 4、 align-content

| 属性值 | 图示                                                         | 属性值        | 图示                                                         |
| ------ | ------------------------------------------------------------ | ------------- | ------------------------------------------------------------ |
| start  | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703061462314-2b785ecb-9cbf-475a-ae6f-dfc9df81cfef.png) | space-around  | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703061184701-ec5d2feb-39bc-4f1f-ad1f-a0585b8ed64d.png) |
| end    | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703061448826-85c65579-713e-4b45-b0c3-4f80212bda2b.png) | space-between | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703061246090-58160199-4ef8-4385-914d-37393e2797db.png) |
| center | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703061167231-f91e212c-a9d8-4863-a133-997a1c273f1a.png) | space-evenly  | ![img](https://cdn.nlark.com/yuque/0/2023/png/647071/1703061261102-ef38092a-6a94-4ca1-9cff-2c0b038869c7.png) |

place-content: <align-content> <justify-content>?



## grid项目区间范围设置属性

grid-column-start

grid-column-end

grid-row-start

grid-row-end

基本用法

```css
.item-1 {
  grid-column-start: -2;
  grid-column-end: 2;
  grid-row-start: 2;
  grid-row-end: 4;
  background-color: red;
}
```

表示区域，重点在于合围 四条线合围成一块区域，去找线对应的位置，表示就好了。

**span** 关键字

合并单元格   指定项目在网格中横向或纵向跨越的轨道数量

不建议grid-column-start和grid-column-end同时使用span <number>语法，因为完全没有必要，且grid-column-end设置的span <number>值不会产生任何效果 

缩写 

grid-row :  start / end

grid-column:  start / end

grid-area: r-start / c-start / r-end / c-end



## grid子项对齐属性justify-self和align-self
```css
.item {
  justify-self: auto | normal | stretch | start | end | center | baseline;
  align-self: auto | normal | stretch | start | end | center | baseline;
}
```

除了auto属性值，其他各个属性值的含义与justify-items和align-items属性中属性值的含义是一样的.

- auto是默认值，表示使用grid容器上设置的justify-items或align-items属性值。
- normal通常表现为stretch拉伸，如果是具有内在尺寸和原始比例的元素，则表现为start。
- stretch指grid子项拉伸。
- start指grid子项起始位置对齐。
- end指grid子项结束位置对齐。
- center指grid子项居中对齐。
- baseline指grid子项第一行文本基线对齐。
