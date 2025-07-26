利用css使元素完成几何变化，如 **平移，缩放，倾斜，旋转**。当然，变换也分为**2D变换**，和**3D变换**。属性差别不大，重点理解3D的相关原理
先从2D变换说起

## 2D变换
变换坐标系（笛卡尔坐标系）
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1700722646237-a9891b6f-d901-4d05-bda9-8d2251104ac3.png#averageHue=%23fcfcfc&clientId=u9a7ab434-eba5-4&from=paste&height=1199&id=u17828dc3&originHeight=1199&originWidth=1192&originalType=binary&ratio=1&rotation=0&showTitle=false&size=225462&status=done&style=none&taskId=u62f13942-5874-4b44-92c1-dfe17efd312&title=&width=1192)
transform的坐标系，在这个基础上做了些改变，改变了Y轴的方向 从自下向上改为了向上向下
![](https://cdn.nlark.com/yuque/0/2023/png/647071/1700722943132-90eaf1c8-22c9-443f-b715-ce80f765b637.png#averageHue=%23fdfdfd&clientId=u9a7ab434-eba5-4&from=paste&id=u341428a2&originHeight=436&originWidth=531&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=ue2172145-18ad-477d-a617-2fd4965459a&title=)
左右变换基于这个坐标系
坐标的（0，0）点，相当于元素的中心，也是变换原点
**注意：在变换中一定要注意变换原点， 不同的变换原点，变换的效果是不一样的**
###  平移
translateX: 元素沿着X轴方向移动 
translateY: 元素沿着Y轴方向移动
translate(x, y) 
translate(x) => transkate(x, 0) => translateX(x)
居中
### 缩放
scaleX（缩放倍率）:  沿着X轴缩放
scaleY（缩放倍率）：沿着Y轴缩放
scale(x, y)
scale(A) => scale(A, A)
负值也有意义：水平，或者垂直方向反转后缩放
### 旋转
rotate（角度）: 这个方法可以让元素围绕其原点顺时针（正值）或逆时针（负值）旋转指定的角度
### 倾斜
skewX（角度）: 沿着X轴方向倾斜元素
![](https://cdn.nlark.com/yuque/__latex/cb4315276caa6c4df57edf88001bb380.svg#card=math&code=x%27%20%3D%20x%20%2B%20y%20%2A%20tan%28%CE%B8%29%0A&id=X52Em)
![](https://cdn.nlark.com/yuque/__latex/305c91b52419227161b41626a6912960.svg#card=math&code=y%27%20%3D%20y&id=nHZkL)
skewY（角度）:沿着Y轴方向倾斜元素
![](https://cdn.nlark.com/yuque/__latex/047217ca669dd7acf1c747467d93b25b.svg#card=math&code=x%27%20%3D%20x%0A&id=Yz5Sn)
![](https://cdn.nlark.com/yuque/__latex/00ae8163c3f8aa00c4d9bc6bc7e8f2ce.svg#card=math&code=y%27%20%3D%20y%20%2B%20%2B%20x%20%2A%20tan%28%CE%B8%29&id=nCNv5)
skew(x, y)
skew(x) => skew(x, 0) => skewX(x)
倾斜的效果可以用以下这种方式想象：

1. 将元素想象成一个矩形纸片。
2. 保持纸片的底部固定在桌面上。
3. 将纸片的顶部推向左边或右边，形成一个斜角。
### 变换原点 transform-origin
不同的变换原点，变化的效果是不一样的，默认的变换原点是元素的中心点
transform-origin: 0, 0;
可以是数字，百分比，关键字

| 关键字 | 值 |
| --- | --- |
| left | 0% |
| center | 50% |
| right | 100% |
| top | 0% |
| bottom | 100% |

**每次变换，变换原点都不变，除非自行设置**。
什么叫不动，一定好好理解

1. 


![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1700729082642-d229b786-84ac-4575-ab97-cc99edaed062.png#averageHue=%23fdfcfc&clientId=u9a7ab434-eba5-4&from=paste&height=612&id=uceada0d7&originHeight=612&originWidth=724&originalType=binary&ratio=1&rotation=0&showTitle=false&size=31662&status=done&style=none&taskId=u255e7f7d-28ae-486a-92d9-d28f571a512&title=&width=724)

2. 变换后

![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1700729335216-aabb53c5-3b23-48ca-afaa-18adb8ac6f07.png#averageHue=%23fcfbfb&clientId=u9a7ab434-eba5-4&from=paste&height=568&id=ue3972676&originHeight=568&originWidth=603&originalType=binary&ratio=1&rotation=0&showTitle=false&size=35652&status=done&style=none&taskId=u9ccc4aa6-854d-4dfb-a8da-360d744cc4d&title=&width=603)
重置坐标系
## ![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1700729443137-a3e00947-7f51-46ca-8e1e-e13949fb77fb.png#averageHue=%23fdfdfc&clientId=u9a7ab434-eba5-4&from=paste&height=812&id=ue7592974&originHeight=812&originWidth=1305&originalType=binary&ratio=1&rotation=0&showTitle=false&size=71199&status=done&style=none&taskId=u59074537-3381-47c6-9e5d-336e6c3ea30&title=&width=1305)
## 
 

## 3D变换
之前我们所说的都是2D变换，也就是平面变换，接下来说一说3D变换，元素看起来会更有立体感。
先从 translate来说
translateX, translateY是2D变换，在xy轴上分别移动
translateZ，属于3D变换，在新的轴上Z轴移动
### 3d平移
translatez()
translate3d(Xpx, Ypx, Zpx);
其中，Xpx、Ypx 和 Zpx 是移动距离，可以是负值，单位通常是像素(px)或者百分比(%)
沿着Z轴平移无效。
透视距离
perspective：景深
眼睛到屏幕的距离
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1701074340632-3b09827e-45b6-426e-9f20-63f739027685.png#averageHue=%23f2f2f2&clientId=uc73d5f64-a91b-4&from=paste&height=185&id=u617e4a78&originHeight=185&originWidth=376&originalType=binary&ratio=1&rotation=0&showTitle=false&size=14182&status=done&style=none&taskId=u6b37dfc1-1ae4-492a-aa21-fcfcd4a1385&title=&width=376)

用法： 
在父级容器中：
```css
parentElement {
  perspective: 2000px;
}
```
在当前元素
```css
self {
  transform: perspective(2000px);
}
```

原理：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1701074696436-73714862-9566-44a2-aeba-50123f93423f.png#averageHue=%23fbfbfb&clientId=uc73d5f64-a91b-4&from=paste&height=516&id=u8d9fd606&originHeight=516&originWidth=648&originalType=binary&ratio=1&rotation=0&showTitle=false&size=25707&status=done&style=none&taskId=u729acdd5-fe1d-4bae-bc63-3b436dc633b&title=&width=648)
默认透视距离无限大，所以在z轴方向变化，没有视觉效果
∞ + 100 === ∞ - 100 

设置perspective后，
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1701074937590-f07344b0-4d1e-4507-aee5-2cd4074f71ab.png#averageHue=%23fbfbfa&clientId=uc73d5f64-a91b-4&from=paste&height=620&id=ubb8cc15f&originHeight=620&originWidth=1115&originalType=binary&ratio=1&rotation=0&showTitle=false&size=67155&status=done&style=none&taskId=ucd7569a6-faa5-4f62-8481-18a8c045d80&title=&width=1115)
以及
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1701075025949-d9aef185-5571-436e-84cb-2d0594882409.png#averageHue=%23faf9f8&clientId=uc73d5f64-a91b-4&from=paste&height=558&id=u94e37906&originHeight=558&originWidth=756&originalType=binary&ratio=1&rotation=0&showTitle=false&size=59723&status=done&style=none&taskId=ua3c1bbd3-f9ab-4912-b3f4-8e01fe35c5d&title=&width=756)
### 3D旋转
rotateX
rotateY
rotateZ
rotate和rotate效果一样
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1701076102483-aadeb253-dc8f-428b-80a1-9db4e9e4ec7e.png#averageHue=%23f9d8d8&clientId=uc73d5f64-a91b-4&from=paste&height=208&id=uf5b1edc6&originHeight=208&originWidth=740&originalType=binary&ratio=1&rotation=0&showTitle=false&size=22158&status=done&style=none&taskId=u5e4267fd-d22b-40bc-9582-06e8a4a245f&title=&width=740)
rotate3d(x, y, z, deg)
参数x、y、z分别表示旋转向量的x轴、y轴、z轴的坐标
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1701076252265-c70aae19-fd1c-4c7e-aed8-2b0c3a9bc4ba.png#averageHue=%23fefefe&clientId=uc73d5f64-a91b-4&from=paste&height=321&id=u5fa20493&originHeight=321&originWidth=423&originalType=binary&ratio=1&rotation=0&showTitle=false&size=7610&status=done&style=none&taskId=ub886cd04-0668-4ad5-ab42-89d23247153&title=&width=423)
```css
element {
	transform: rotate3d(1, 1, 1, 45deg)
}
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1701076277633-335fe996-0124-4100-bcbb-71b898f3ff50.png#averageHue=%23fefefe&clientId=uc73d5f64-a91b-4&from=paste&height=317&id=u349c19bf&originHeight=317&originWidth=428&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10922&status=done&style=none&taskId=u45dd2e97-263b-4185-806b-6a5cae5a5dd&title=&width=428)
### 3D缩放
scaleZ
scaleZ 是一个不常用的 CSS 变换函数，因为在真实世界的视角中
，这意味着在二维平面（比如电脑屏幕或者纸上）上是无法观察到深度缩放的效果的。
在 CSS 3D 变换中，通常使用 scaleX 和 scaleY 来分别沿 X 轴和 Y 轴缩放元素，或者使用 scale 同时影响两个轴。scaleZ 函数是理论上存在的，但它不会对元素造成任何可见的缩放效果。当元素在三维空间中进行转换时，它们的深度（Z轴上的大小）通常是通过 translateZ 或 perspective 来模拟的

perspective两种用法的差别：
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1701143734516-da737862-890a-42b3-b7b2-63a487824cf5.png#averageHue=%23efdede&clientId=uc73d5f64-a91b-4&from=paste&height=287&id=u32239c6d&originHeight=287&originWidth=852&originalType=binary&ratio=1&rotation=0&showTitle=false&size=19830&status=done&style=none&taskId=uc03037a2-c7cb-4ea7-ba4e-1e8308f8dd0&title=&width=852)

perspective-origin: 视觉位置。
值同 background-position;

transform-style:preserve-3d声明的含义
transform-style支持两个关键字属性值，分别是preserve-3d和flat

- preserve-3d表示应用3D变换的元素位于三维空间中，preserve-3d属性值的渲染表现更符合真实世界的3D表现。
- flat是默认值，表示应用3D变换的元素位于舞台或元素的平面中，把三维空间压缩在舞台元素的二维空间中。

![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1701143919356-f602bc16-2b6c-42b3-b5bc-bcf6e0437d52.png#averageHue=%23b5bbc8&clientId=uc73d5f64-a91b-4&from=paste&height=174&id=u3ed5605b&originHeight=174&originWidth=431&originalType=binary&ratio=1&rotation=0&showTitle=false&size=10830&status=done&style=none&taskId=u918fea58-64c7-41a3-8cc3-cffcf78f723&title=&width=431)
## 案例
