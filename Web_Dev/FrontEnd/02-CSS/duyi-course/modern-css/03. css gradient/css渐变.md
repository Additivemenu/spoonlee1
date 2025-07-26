CSS渐变是CSS世界中第一次真正意义上使用纯CSS代码创建的图像。它可以应用在任何需要使用图像的场景。

border-image
background-image
## 一、线性渐变 linear-gradient
基本语法：linear-gradient(渐变方向，颜色1 变化区间，颜色2 变化区间，。。。,颜色n 变化区间 )
渐变方向：
关键字： to + 方向（top, bottom, right, left), to left , to top, to top left, to left top
角度： 50deg
默认值：自上而下，to bottom, 180deg
变化区间（渐变断点）：
一个值: 作为颜色变化的边界
两个值: 作为区间的开始以及终止
重复线性渐变：repeating-linear-gradient();
注意：渐变区间的大小指的是在渐变方向的的小
```css
element {
	background-image: linear-gradient(45deg, #fff 100px, skyblue 100px 200px, #fff 200px;
}
```
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1700465984040-aeaf3fa2-2f4b-4160-8cd3-1350103b2af5.png#averageHue=%23fbf7f6&clientId=u81bd5df5-ffc1-4&from=paste&height=208&id=ub4ada198&originHeight=1191&originWidth=1779&originalType=binary&ratio=1&rotation=0&showTitle=false&size=486473&status=done&style=none&taskId=u421b748c-c1a8-496a-9461-0efc297dacd&title=&width=310)
## 二、径向渐变 radial-gradient
基本语法：radial-gradient（ 形状 半径大小 at 原点位置 ，渐变颜色1 边界，渐变颜色2 边界，。。。， 渐变颜色n, 边界n）
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1700547052758-e3d42d4c-21dd-48a8-845b-3d080925013f.png#averageHue=%23b0e3f6&clientId=uf47008a4-b3a4-4&from=paste&height=197&id=udd79cec7&originHeight=197&originWidth=472&originalType=binary&ratio=1&rotation=0&showTitle=false&size=74878&status=done&style=none&taskId=ub6e1f386-63e7-4e2b-a3ee-314ea84af99&title=&width=472)
位置： 
      at + background-postion的属性值
at + 关键字：center(默认值）top left right bottom, 可组合， at left at left top
at + 位置： at 0 0 ,at left 0 top 20px
形状：circle, ellipse
半径大小：
一个值：以圆的方式
两个值：以椭圆的方式
关键字：

| **关键字** | **描述** |
| --- | --- |
| closest-side | 渐变中心距离容器最近的边作为终止位置 |
| closest-corner | 渐变中心距离容器最近的角作为终止位置 |
| farthest-side | 渐变中心距离容器最远的边作为终止位置 |
| farthest-corner | 默认值。渐变中心距离容器最远的角作为终止位置 |

![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1700547940353-e08445a8-5455-493d-8d16-712c9d305b18.png#averageHue=%23b9e9fa&clientId=uf47008a4-b3a4-4&from=paste&height=227&id=u517b53d8&originHeight=227&originWidth=561&originalType=binary&ratio=1&rotation=0&showTitle=false&size=48664&status=done&style=none&taskId=ucbfb4f27-9cb0-4895-862b-e88846c13c9&title=&width=561)
重复径向渐变：repeating-radial-gradient();
## 三、锥形渐变 conic-gradient (/ˈkɒnɪk/)
基本语法：conic-gradient(from 起始角度 at 中心位置， 角渐变断点)
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1700549948352-cac0ee8e-6f07-4a06-a1f5-904ae9c5d975.png#averageHue=%23b4e7f9&clientId=uf47008a4-b3a4-4&from=paste&height=192&id=u9daa3018&originHeight=192&originWidth=366&originalType=binary&ratio=1&rotation=0&showTitle=false&size=48016&status=done&style=none&taskId=u14cd1f91-dfff-46b7-9fce-f72d60babf7&title=&width=366)
from 45deg
角渐变断点：只需要提供角度就可以

