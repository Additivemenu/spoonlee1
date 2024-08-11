通过图片显示来增强边框的表现力

### 九宫格
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1699856895521-21028e88-b5a5-4575-88e2-7d931173a4c9.png#averageHue=%23878888&clientId=udd755ed6-6093-4&from=paste&height=370&id=uc1476411&originHeight=1191&originWidth=1194&originalType=binary&ratio=1&rotation=0&showTitle=false&size=411360&status=done&style=none&taskId=u29fa1291-02ac-4822-881d-6e531e296fb&title=&width=371)


API:
#### border-image-source: url(图像地址）
引入图片边框资源
#### border-image-slice:    [数字|百分比]{1,4}  && fill?
划分图片，用作元素图片边框
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1699857557341-b54a691e-6fb7-4d7a-8088-cb27e72be133.png#averageHue=%239d9c9a&clientId=udd755ed6-6093-4&from=paste&height=183&id=u0b439ae3&originHeight=183&originWidth=567&originalType=binary&ratio=1&rotation=0&showTitle=false&size=47464&status=done&style=none&taskId=ub8d36acc-96a6-469b-9dae-cdb308518ea&title=&width=567)

#### border-image-width:  [ 数字 | 百分比  ]{1,4} | auto
边界图像的宽度
#### border-image-outset:  [ 数字 | 百分比 ]{1,4}
向外扩充边界图像
#### border-image-repeat:   [ stretch | repeat | round | space ]{1,2} 
stretch：拉伸图片以填充边框，默认值
repeat：平铺图片以填充边框。
[round](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image-repeat#round)：平铺图像。当不能整数次平铺时，根据情况放大或缩小图像。
[space](https://developer.mozilla.org/zh-CN/docs/Web/CSS/border-image-repeat#space)： 平铺图像。当不能整数次平铺时，会用空白间隙填充在图像周围
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1699857991085-39de2dc6-6e89-4a0e-af44-1e66d0e17650.png#averageHue=%23ececeb&clientId=udd755ed6-6093-4&from=paste&height=246&id=u1d893a29&originHeight=246&originWidth=660&originalType=binary&ratio=1&rotation=0&showTitle=false&size=57127&status=done&style=none&taskId=ue4c43997-daf9-42b3-a904-8373dc67714&title=&width=660)

