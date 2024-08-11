对于布局之前我们学习过 浮动 定位。那本身不算真正的布局，接下来要学习才属于真正的css布局（layout);

Flexbox，也称为弹性盒模型，是一种新的布局模式。它提供了一种更加有效的方式来布局、对齐和分配容器内项目的空间，即使它们的大小是动态的或者未知的。Flexbox布局主要思想是让容器能够改变其子元素的宽度、高度（和顺序）以最好地填充可用空间（主要是为了适应所有类型的显示设备和屏幕大小）。

### 如何声明flex布局
```css
element {
  display: flex;
  /* display: inline-flex */
}
```
这里介绍两个概念 **flex容器**，**flex项目**

1. **Flex容器（Flex Container）**：你可以通过将一个元素的 display 属性设置为 flex 或 inline-flex 来创建一个Flex容器。
2. **Flex项目（Flex Items）**：Flex容器内的直接子元素自动成为Flex项目

![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1701853065148-9d604db5-767c-4561-865a-7741d0fe6811.png#averageHue=%23fbf6f6&clientId=u3b24d6f5-d6b1-4&from=paste&height=470&id=ufb971e6d&originHeight=470&originWidth=882&originalType=binary&ratio=1&rotation=0&showTitle=false&size=105505&status=done&style=none&taskId=u41a01e81-6693-4e07-b3ad-f7d78653c8a&title=&width=882)
这里的flex inline-flex说明一下：
flex 会使容器表现为块级元素，而 inline-flex 会使容器表现为内联元素

- 设置为 display: flex 时，Flex容器未显式设置与宽度相关的属性时，其宽度与其父容器等同（相当于 width: 100% ）
- 设置为 display: inline-flex 时，Flex容器未显式设置与宽度相关的属性时，其宽度等同于所有Flex项目的宽度和

使用建议：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1701852876259-f1a43705-ed54-4fdb-850b-b4374a0d03c9.png#averageHue=%23d2a97d&clientId=u3b24d6f5-d6b1-4&from=paste&id=u5af3ce4e&originHeight=618&originWidth=2268&originalType=url&ratio=1&rotation=0&showTitle=false&size=635172&status=done&style=none&taskId=u8e299cc4-b518-448f-b504-e12296d00df&title=)
使用 display: inline-flex 时最好结合 min-width 和 min-height 一起使用。不建议显式设置 width 和 height 

### 设置display: flex;后发生了什么？
flex项目们会水平单行排列，无论多少个项目都会在一行内展示，可能会发生压缩。默认排列的方向被称为主轴方向，也会有一个侧轴。
可以适用后续一些flex相关的css属性。
注意：
display 设置为 flex 时，Flex容器从表现形式上类似于块容器，事实它是一个Flex容器，上下文格式是FFC（Flexbox Formatting Content），因此运用于块容器（Block Formatting Content）上的一些布局属性就不再适用，比如：

- CSS的 float  和 clear 属性在Flex项目上不起作用，也不会让Flex项目脱离文档流
- CSS的 vertical-align 属性在Flex项目上不起作用
- CSS伪元素 ::first-line  和 ::first-letter 在Flex容器上不起作用，而且Flex容器不会为其祖先提供首行或首字母格式化
### flex容器中的主轴和交叉轴
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1701911412581-d3076230-f389-404a-9eef-7406f17b6d53.png#averageHue=%23fbfbfb&clientId=u474d2e92-5b67-4&from=paste&height=533&id=u149ae8c1&originHeight=533&originWidth=919&originalType=binary&ratio=1&rotation=0&showTitle=false&size=41260&status=done&style=none&taskId=u9cdb7a6f-c7d7-47e6-af29-678cd3195be&title=&width=919)
flex项目默认按照主轴方向排列
#### 3.1 如何修改主轴方向
**flex-direction**:  决定了Flex容器内部Flex项的排列方式

1. row：这是默认值，Flex项目沿着文本的书写方向水平排列，即从左到右排列（在RTL（从右到左）的语言环境中，如阿拉伯语和希伯来语，Flex项将从右到左排列）。
2. row-reverse：与 row 相似，但是Flex项目的开始和结束位置相反，即从右到左排列（在RTL环境中，将从左到右排列）。
3. column：Flex项目将垂直排列，从上到下。
4. column-reverse：与 column 相似，但Flex项目的开始和结束位置相反，即从下到上排列。
#### 3.2 主轴方向的对齐方式
主轴方向上的排列方式是通过** justify-content **属性来控制的。该属性定义了容器中项目对齐主轴的方式，以下是该属性可接受的值：

1. flex-start：项目靠近主轴的起点排列。
2. flex-end：项目靠近主轴的终点排列。
3. center：项目居中排列在主轴上。
4. space-between：项目在主轴上平均分布，第一个项目靠近起点，最后一个项目靠近终点，其余项目平分剩余空间。
5. space-around：项目在主轴上平均分布，但所有项目两侧的空间相同，因此项目之间的空间是项目与容器边缘空间的两倍。
6. space-evenly：项目在主轴上平均分布，所有项目与容器边缘的空间以及项目之间的空间都相等。
7. ![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1701915838827-bffa2931-5fb6-4c1e-b157-2b2974142642.png#averageHue=%23b0b1ae&clientId=u474d2e92-5b67-4&from=paste&id=uee8aa849&originHeight=1750&originWidth=1172&originalType=url&ratio=1&rotation=0&showTitle=false&size=578711&status=done&style=none&taskId=u0923dcfe-2e6b-4494-a55b-bc015b9f627&title=)
#### 3.3 交叉轴方向的对齐方式
当flex项目宽度超过flex容器宽度，会被压缩，而非换行展示，想要换行展示需要是用**flex-wrap**属性
 flex-wrap 属性在Flex布局中用于控制Flex项是否换行以及如何换行。这个属性对于管理当Flex容器空间不足以容纳所有 Flex项在一行或一列（取决于主轴方向）时的布局非常有用
flex-wrap 属性的可选值：

1. nowrap（默认值）：所有Flex项会尽可能在一行（或一列）上排列。如果Flex项总宽度（或高度）超过了容器的宽度（或高度），Flex项将不会换行，而是会缩小尺寸或者溢出容器。
2. wrap：Flex项将会在必要时换行到新的行（或列），第一行（或列）的项将位于容器的顶部（或起始边），而新行（或列）将被添加在当前行（或列）的下面（或结束边）。
3. wrap-reverse：与 wrap 类似，Flex项也会在必要时换行，但新行（或列）将位于当前行（或列）的上面（或起始边）。这意味着Flex容器内的第一行（或列）将出现在底部（或结束边），新行依次堆叠在上面。

也可以理解设置 交叉轴方向

通过设置容器上的** align-items** 属性 可以控制flex项目在交叉轴上面的排列方式
**align-items** 属性定义了Flex容器内所有Flex项在交叉轴上的对齐方式。这个属性可以接受如下的值：

1. stretch（默认值）：Flex项会被拉伸以填满容器在交叉轴上的高度，除非Flex项已经设置了具体的高度（或宽度，如果 flex-direction 是 column 或 column-reverse）。
2. flex-start：所有Flex项向交叉轴的起始边界对齐。
3. flex-end：所有Flex项向交叉轴的结束边界对齐。
4. center：所有Flex项在交叉轴上居中对齐。
5. baseline：所有Flex项根据它们的基线进行对齐。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1701915810415-34cfc3f8-b9b9-450c-b919-d546b9924eb5.png#averageHue=%23b4ae7d&clientId=u474d2e92-5b67-4&from=paste&id=u87a91ac2&originHeight=1716&originWidth=1504&originalType=url&ratio=1&rotation=0&showTitle=false&size=1014589&status=done&style=none&taskId=u130ed0bd-af6f-42b0-8bcf-50f2bbd450b&title=)

跟align-items类似的属性align-content,
align-items 用于单行Flex子项的对齐方式，而align-content 用于多行Flex子项之间的间隔和分布。如果Flex子项不换行，align-content 属性不会有任何效果。
align-content 属性可以接受以下值：

- flex-start: 所有行紧靠在容器的交叉轴起始边缘。
- flex-end: 所有行紧靠在容器的交叉轴结束边缘。
- center: 所有行在交叉轴方向上居中对齐。
- space-between: 所有行在交叉轴方向上均匀分布，第一行贴近起始边缘，最后一行贴近结束边缘。
- space-around: 所有行在交叉轴方向上均匀分布，每个行在前后都有相同的空间。
- space-evenly: 所有行在交叉轴方向上均匀分布，每个行之间的间隔相同。
- stretch (默认值): 所有行将会被拉伸以占用交叉轴方向上的剩余空间。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1701929125241-db719901-9dcb-4ec2-bad9-37eadbfb902a.png#averageHue=%23e0e0e0&clientId=u474d2e92-5b67-4&from=paste&height=1510&id=u72ed8f2d&originHeight=1510&originWidth=2034&originalType=binary&ratio=1&rotation=0&showTitle=false&size=408641&status=done&style=none&taskId=ud20007ca-822c-430c-8570-f84e31cb987&title=&width=2034)
#### 3.4 flex对齐特性

- justify表示水平方向的样式设置；
- align表示垂直方向的样式设置；
- items表示全体元素的样式设置；
- content表示整体布局的样式设置；
- self表示元素自身的样式设置，其一定是应用在子元素上的。
### 
### flex项目
上面说了justify-content, align-items, align-content，对齐方式，接下来说说flex项目自己的对齐方式
#### align-self

- auto：Flex项将继承Flex容器的 align-items 属性的值。
- flex-start：Flex项会被放置在容器的起始边缘。
- flex-end：Flex项会被放置在容器的结束边缘。
- center：Flex项会被居中放置在容器内部。
- baseline：Flex项的基线会与其他Flex项的基线对齐。
- stretch：Flex项会被拉伸填满容器在交叉轴上的空间。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1702352870741-9ae586d8-0880-493f-907a-e7f85ab24ad3.png#averageHue=%2314181d&clientId=uc03fe2d0-c45c-4&from=paste&height=1338&id=uc9dbcd1f&originHeight=1338&originWidth=1274&originalType=url&ratio=1&rotation=0&showTitle=false&size=1020971&status=done&style=none&taskId=u230b06a3-bd6a-4df2-942c-0882eddf195&title=&width=1274)
#### order
在Flex项目上，还可以使用 order 指定具体的数值，在不改变DOM结构之下对Flex项目进行排序，其中数值越大，越在往后排, 默认值是0；
#### flex-grow
默认值：0
用于控制 flex 项目在主轴上的增长比例。它定义了每个 flex 项目相对于其他项目在剩余空间中分配的比例
分配规则：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1702362493706-91508015-5c68-42e0-8c36-cc76b74a2f61.png#averageHue=%23131618&clientId=uc03fe2d0-c45c-4&from=paste&id=uc7ab6bc5&originHeight=618&originWidth=1564&originalType=url&ratio=1&rotation=0&showTitle=false&size=274961&status=done&style=none&taskId=u82b9d560-70c7-41f5-8372-cfa3133fc3a&title=)
应用：sticky footer 布局 三栏布局;
#### flex-shrink
默认值是1；
用于控制 flex 项目在主轴上的收缩比例。它定义了当空间不足时，每个 flex 项目相对于其他项目的收缩比例
收缩规则：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1702362528264-4bb84226-acb7-4557-961e-4389c0e38d1a.png#averageHue=%23131618&clientId=uc03fe2d0-c45c-4&from=paste&id=u4224a63d&originHeight=871&originWidth=1094&originalType=url&ratio=1&rotation=0&showTitle=false&size=429457&status=done&style=none&taskId=u77e0cc64-3f4a-4128-b76b-8c42a712aff&title=)
#### flex-basis
默认值： auto;
**flex-basis** 是 Flex 布局中的一个属性，用于设置 flex 项目在主轴上的初始尺寸。它定义了一个项目在分配多余空间之前的基本大小。
flex-basis和width的区别
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1702516507273-e205c4f9-78a2-4e9a-8f67-5f89fddd2ded.png#averageHue=%23b3c1a8&clientId=uc03fe2d0-c45c-4&from=paste&height=153&id=u17409a86&originHeight=153&originWidth=355&originalType=binary&ratio=1&rotation=0&showTitle=false&size=5181&status=done&style=none&taskId=u16779aa7-1c05-4134-a6ac-02abad8ad2e&title=&width=355)
flex-basis: 当内容区域大于flex-basis 元素的宽度为内容区域宽度
width: 同上，元素宽度为width属性

flex-basis 与 width 同时作用呢？
max(flex-basis, min(width, 内容宽度))
在flex布局中最好使用flex-basis

flex-basis还支持一些关键字, 直接忽略width属性的作用	
content: 和max-content效果一致
max-content: 文字不换行最大区域
min-content: 文字自然换行最小区域
fit-content: 作用不详
#### flex
在 Flex 布局中，**flex** 是一个用于设置 **flex-grow**、**flex-shrink** 和 **flex-basis** 三个属性的缩写属性；

| **单值语法** | **等同于** | **备注** |
| --- | --- | --- |
| flex: initial | flex: 0 1 auto | 初始值，常用 |
| flex: 0 | flex: 0 1 0% | 适用场景少 |
| flex: none | flex: 0 0 auto | 推荐 |
| flex: 1 | flex: 1 1 0% | 推荐 |
| flex: auto | flex: 1 1 auto | 适用场景少，但很有用 |

#### flex-gap
在 Flex 布局中，**gap** 是一个用于设置项目之间的间隙的属性。它是 **row-gap** 和 **column-gap** 的简写形式，用于定义主轴和交叉轴上的间隙大小。
具体来说，**gap** 属性接受一个长度值，表示项目之间的间隙大小。可以使用一个值来同时设置主轴和交叉轴上的间隙，也可以使用两个值分别设置主轴和交叉轴上的间隙。

### ![img](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9ITE4ySUt0cGljaWNHSEJJOGVyWWROMVBmZENxYjNBbXNlaWJnczZnSVAxSzNpYVNqRE5JaWJ2R29YbHlTbVpRaWJmdHBqcUVRbGpSYjE2RGVHWk92MmxvbGxKdy82NDA?x-oss-process=image/format,png)

