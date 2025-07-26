![1838504980-49cd061e2b2ea03f.gif](https://cdn.nlark.com/yuque/0/2024/gif/647071/1704248685812-b6c44a71-6099-4706-8602-0c5811500814.gif#averageHue=%23707841&clientId=u8569aeaa-043e-4&from=ui&id=u663f828a&originHeight=720&originWidth=1280&originalType=binary&ratio=0.8999999761581421&rotation=0&showTitle=false&size=7893842&status=done&style=none&taskId=u6214696a-bab4-4904-b230-a512826b95f&title=)

![1833561657-78d22a87894b9219.gif](https://cdn.nlark.com/yuque/0/2024/gif/647071/1704248727740-2a2571fd-2351-4348-80ad-40ffd1fe7afe.gif#averageHue=%2316003b&clientId=u8569aeaa-043e-4&from=ui&id=ufc337629&originHeight=720&originWidth=1280&originalType=binary&ratio=0.8999999761581421&rotation=0&showTitle=false&size=1306374&status=done&style=none&taskId=u62d5df0b-1da7-46c4-a234-cc4f2d2a9c6&title=)

裁剪
裁剪一个三角形，之前还在利用border去模拟。
现在一行代码搞定
```css
ele {
  clip-path: polygon(50% 0, 0 100%, 100% 100%)
}
```

它可以按照 svg 路径、盒子模型、基本多边形路径等几种不同的方式来裁切

svg路径：
```css
ele {
  clip-path: url(#svg)
}
```
基本图形：
矩形：
```css
clip-path: inset(top right bottom left)
```
![image.png](https://cdn.nlark.com/yuque/0/2024/png/647071/1704252003176-c8b28086-582a-4535-b5a4-df4edcb455f5.png#averageHue=%23f6f5f4&clientId=u8569aeaa-043e-4&from=paste&height=596&id=u31abdd5e&originHeight=536&originWidth=601&originalType=binary&ratio=0.8999999761581421&rotation=0&showTitle=false&size=28046&status=done&style=none&taskId=u018dea5b-5016-48f1-9972-ba94e9778e4&title=&width=667.7777954678481)
圆形
```css
clip-path: circle(半径 at x y);
```
椭圆
```css
clip-path: ellipse(水平半径 垂直半径 at x y);
```
多边形ploygon
```css
clip-path: ploygon(x1 y1, x2 y2, x3 y3, ...)
```
