# animation
说起动画，原来的动画都是基于一些插件 flash Java，离我们最近的是js实现的动画。
利用定时器，性能低下，实现复杂。
css 引入了animation 当然了之后也有 javaScript Animation API

来一个简单的小栗子
能看到两个新的属性
> animation css属性

> @keyframes

## 属性： animation
本身是复合属性
包含了：
```css
animation-name
animation-duration
animation-timing-function
animation-delay
animation-iteration-count
animation-direction
animation-fill-mode
animation-play-state
```
animation-name: 动画名称，通过@keyframes声明的动画
### @keyframes 声明动画的规则
```css
@keyframes 动画名称 {
  完成动画关键帧列表
}
```
动画名称命名规则：
**符合 CSS 语法中对标识符的定义**
使用以下字符组合

- 任意字母（a～z或A～Z）；
- 数字（0～9）；
- 短横线（-）；
- 下划线（_）；
- 转义字符（使用反斜杠\转义）；
- Unicode字符（反斜杠\后面跟十六进制数字）。

注意：

1. 不能是css属性支持的关键字 none, initial, unset, inherit等
2. 不能以十进制数字开始

**关键帧定义的注意点：**
**形式： 关键帧选择器 { css样式 } **
关键帧选择器：可以是百分比也可以是关键字

```css
@keyframes a1 {
  from {
    color: red;
  }
  to {
    color: blue;
  }
}
/* 等价于 */
@keyframes a2 {
  0% {
    color: red;
  }
  100% {
    color: blue;
  }
```

注意点：

1. 顺序不影响动画的执行
2. 初始关键可以不设置，以默认样式为基础关键帧
3. 关键帧中定义的样式中的!important将不生效 ，优先级比行间样式要高
4. 关键帧列表可以合并(钟摆运动)
```css
@keyframes a3 {
  0%, 100% {
    transform: rotate(45deg)
  }
  50% {
    transform: rotate(-45deg)
  }
}
```

5. 重复定义关键帧，指挥覆盖相同属性
```css
@keyframes a4 {
  100% {
    left: 50px;
  }
  100% {
    top: 100px;
    left: 25px;
  }
}
```

其他animation属性
animation-duration
animation-timing-function
animation-delay
同transition

声音线条案例
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1701747498879-c695eeef-8051-42e1-8a06-654f1fe8c316.png#averageHue=%23ffffff&clientId=uae326fa9-3a24-4&from=paste&height=60&id=u5588f76b&originHeight=60&originWidth=191&originalType=binary&ratio=1&rotation=0&showTitle=false&size=885&status=done&style=none&taskId=u155f6ce1-2c85-44e1-a2a3-116b1e569a8&title=&width=191)
**animation-iteration-count**: 设置动画完成次数
可以是小数哦~

**animation-direction**： 动画完成的方向 关键帧的方向 0 =》 100%， 100% =》 0 等

- animation-direction属性值如果是normal，那么动画执行的方向是0%→100%、0%→100%，每一轮的动画方向都是正常的。
- animation-direction属性值如果是reverse，那么动画执行的方向是100%→0%、100%→0%，每一轮的动画方向都是相反的。
- animation-direction属性值如果是alternate /ɔːltərneɪt/，那么动画执行的方向是0%→100%、100%→0%，每轮的动画方向是相反的。
- animation-direction属性值如果是alternate-reverse，那么动画执行的方向是100%→0%，0%→100%，每轮的动画方向是相反的

双向动画案例

**animation-fill-mode：**

1. none: 默认值。动画不会应用任何样式到目标元素，在动画开始前或结束后，元素将回到它的初始状态。
2. forwards: 动画结束后，目标元素将保留由动画的最后一个关键帧计算值。简而言之，动画完成后，元素看起来将停留在动画的最终状态。
3. backwards: 动画将在动画开始之前（即延迟期间）应用第一个关键帧的样式。这意味着元素将在动画实际开始播放之前就采取初始关键帧的样式。
4. both: 动画将遵循forwards和backwards的规则，即动画将在开始前和结束后扩展其关键帧样式。元素在动画开始前和结束后都将保留相应的样式。

**animation-play-state：**

1. paused：暂停动画。当设为此值时，动画会停止在当前帧，不会进行到下一帧。
2. running：运行动画。设为此值时，动画会正常进行。



animation事件

