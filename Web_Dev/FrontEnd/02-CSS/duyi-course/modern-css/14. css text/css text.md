补充一些css 字体相关的属性

1.  text-shadow: 水平偏移，垂直偏移，模糊半径，阴影颜色

仅仅有四个值，类比于box-shadow 没有inset关键字（内阴影）不支持扩展也就是第四个数字类型参数
一些经典文字阴影效果

![image.png](https://cdn.nlark.com/yuque/0/2024/png/647071/1704347303828-60a21eb0-d6ce-4848-b1b8-de612aedd690.png#averageHue=%238d8d8d&clientId=u50284bda-3f8d-4&from=paste&height=1420&id=u0fcd6a40&originHeight=1278&originWidth=1157&originalType=binary&ratio=0.8999999761581421&rotation=0&showTitle=false&size=210110&status=done&style=none&taskId=u0f18b959-29fb-4347-a2c6-3b8773ac47d&title=&width=1285.5555896111487)

可以利用text-shadow实现文字描边。但是细节会有问题，锯齿状。
可以使用下面的API

2. -webkit-text-stroke: 描边大小 描边颜色

注意 text-stroke描边原理是居中描边，会影响字重。

3. -webkit-text-fill-color: 颜色；

效果和color类似，会覆盖color效果。
可以保留color的继承特性，同时可以简化text-shadow属性。

4. text-emphasis 文字强调

[https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis](https://developer.mozilla.org/en-US/docs/Web/CSS/text-emphasis)

5.  text-orientation控制文本展示方向

mixed
默认值。顺时针旋转水平书写的字符 90°，将垂直书写的文字自然布局。
upright
将水平书写的字符自然布局（直排），包括垂直书写的文字（as well as the glyphs for vertical scripts）。注意这个关键字会导致所有字符被视为从左到右，也就是 [direction](https://developer.mozilla.org/zh-CN/docs/Web/CSS/direction) 被强制设为 ltr。
sideways
所有字符被布局为与水平方式一样，但是整行文本被顺时针旋转 90°。



 
