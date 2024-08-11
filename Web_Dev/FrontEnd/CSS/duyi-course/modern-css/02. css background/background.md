背景相关的CSS属性
# API
## background-color
背景颜色
## background-image: url(图片地址)
引入背景图片,可以引入多张，用逗号分割

## background-repeat: repeat | no-repeat | repeat-x | repeat-y | round | space


repeat (默认值）默认大小重复，会被裁剪
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1700106166681-8f9ee487-e160-4469-a0ee-b9ee7dd0bb27.png#averageHue=%237e6955&clientId=u6f455f6e-9266-4&from=paste&height=500&id=u3aad3eff&originHeight=500&originWidth=502&originalType=binary&ratio=1&rotation=0&showTitle=false&size=245864&status=done&style=none&taskId=ua2295249-3dc6-409d-a4ef-f8796c7114b&title=&width=502)
no-repeat： 不重复
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1700106134650-5e50fdd1-be2e-4578-9edb-9658df70b033.png#averageHue=%23ec0f0c&clientId=u6f455f6e-9266-4&from=paste&height=502&id=u90b13e6a&originHeight=502&originWidth=498&originalType=binary&ratio=1&rotation=0&showTitle=false&size=103434&status=done&style=none&taskId=u30a8616a-7453-40ac-a656-125cff36580&title=&width=498)
repeat-x：水平方向无变化重复
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1700106214344-523ccd54-52c4-4333-a2a7-a2cc683478d7.png#averageHue=%23cc271f&clientId=u6f455f6e-9266-4&from=paste&height=491&id=u899a418b&originHeight=491&originWidth=494&originalType=binary&ratio=1&rotation=0&showTitle=false&size=103747&status=done&style=none&taskId=ub3b9e7cb-c901-4e17-9792-d49ffe1916b&title=&width=494)
repeat-y：垂直方向无变化重复
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1700106233359-758b0ac6-07ff-4d98-b5a1-fde177ef38f1.png#averageHue=%23cd2820&clientId=u6f455f6e-9266-4&from=paste&height=499&id=u6339232a&originHeight=499&originWidth=497&originalType=binary&ratio=1&rotation=0&showTitle=false&size=244329&status=done&style=none&taskId=ufbe235af-541c-4e0a-b1cc-c99f1b55425&title=&width=497)
round：图像会被压缩，尽可能的多的放入完整的背景
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1700106262682-9920a823-88c1-4c6f-ab1c-82fe62e70e39.png#averageHue=%237b6752&clientId=u6f455f6e-9266-4&from=paste&height=501&id=u53690c50&originHeight=501&originWidth=500&originalType=binary&ratio=1&rotation=0&showTitle=false&size=581021&status=done&style=none&taskId=ud0ba8a2e-d60d-449e-8023-eb5d3b9ce9c&title=&width=500)
space：图像会尽可能的重复，但是不会裁剪
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1700106288680-708c49df-fab4-4a2c-8818-c2df859d04a8.png#averageHue=%23ad4033&clientId=u6f455f6e-9266-4&from=paste&height=502&id=u7b75b80b&originHeight=502&originWidth=500&originalType=binary&ratio=1&rotation=0&showTitle=false&size=201492&status=done&style=none&taskId=u92539c50-8a41-4c10-8274-9cd2832c5d6&title=&width=500)

background-repeat也是符合属性可以拆分为backgorund-repeat-x, background-repeat-y;
同样也支持双值的写法
单值语法是完整的双值语法的简写：

| **单值** | **等价于双值** |
| --- | --- |
| repeat-x | repeat no-repeat |
| repeat-y | no-repeat repeat |
| repeat | repeat repeat |
| space | space space |
| round | round round |
| no-repeat | no-repeat no-repeat |

**围绕背景图大小位置提供的一些API**
## background-position: 为背景图片设置初始位置
[雪碧图生成地址](https://www.toptal.com/developers/css/sprite-generator)
可以书写的值
### 1个值的语法
| **单值** | **等同的双值** |
| --- | --- |
| 20px | 20px center |
| 20% | 20% center |
| top | top center |
| right | right center |
| bottom | bottom center |
| left | left center |
| center | center center |

百分比的情况：（剩余空间的百分比）
(容器宽度 - 图像宽度) * (水平偏移百分比 x%) = (水平偏移量) 
(容器高度 - 图像高度) * (垂直偏移百分比 y%) = (垂直偏移量)
### 2个值的语法
水平偏移量，垂直偏移量
**但是要注意 20px left; 两个水平偏移量是无效的**
### 3个值的语法与4个值的语法
background-postion: 水平方向 偏移量 垂直方向 偏移量
偏移量缺少，默认值为0
```css
background-position: left 10px top 15px;   /* 10px, 15px */
background-position: left      top     ;   /*  0px,  0px */
background-position:      10px     15px;   /* 10px, 15px */
background-position: left          15px;   /*  0px, 15px */
background-position:      10px top     ;   /* 10px,  0px */
background-position: left      top 15px;   /*  0px, 15px */
background-position: left 10px top     ;   /* 10px,  0px */
```
## background-origin: 设置background-position的参照原点
默认值 padding-box ：背景区域以内边距为参考
border-box: 背景位置以边框为参考
content-box: 背景位置以内容区为参考

## background-size: 设置背景图的大小
background-size: 宽度，高度
默认值: auto auto; 展示图片默认的大；
定值 auto 或者 auto 定值 根据原有图像的比例根据定值计算
关键字 **cover contain**
**cover（覆盖）: 图片尽可能把当前元素覆盖，不留空白，可能出现裁剪**

**contain（包含）: 图片尽可能的展示在元素中，可能出现留白**

## background-clip:设置元素的背景展示的区域
border-box(默认值):  背景展示区域延申至边框
padding-box: 背景展示区域延申至padding
content-box: 背景展示区域延申至content
text: 背景被裁剪成文字的前景色。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1700121976645-9fa4eb35-4fb0-4f09-b9ee-ff0736ec8a9c.png#averageHue=%23e1ddd9&clientId=u32930ef8-3d01-4&from=paste&height=364&id=u2729e4a6&originHeight=364&originWidth=637&originalType=binary&ratio=1&rotation=0&showTitle=false&size=139807&status=done&style=none&taskId=ua77ebbee-0567-4569-a644-07f246b3fa2&title=&width=637)
## background-attachment:决定背景图像的位置是在视口内固定，或者随着包含它的区块滚动。
scroll(默认值):  背景相对元素本身固定

fixed: 背景相对于视口固定，即使元素被滚动，背景不会跟随滚动 

local: 背景会随着元素内容一起滚动
## 




