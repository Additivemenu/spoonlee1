# css 过渡

本质：从一个状态过渡到一个状态
transition:

1. 如何切换状态
2. 哪（些）个属性参与了变化？（transiton-property）
3. 用多长时间完成过渡？(transition-duration)
4. 过渡的状态，是快是慢，还是先快后慢, (transition-timing-function)
5. 提前开始过渡，延后开始过渡(transition-delay)

## 如何切换状态

可以利用伪类 :hover
也可通过 js 操控（修改类名，修改属性）

API:
transition-property: all | 绝大多数的 css 属性都可以
display, background-image, content; 这些属性不可以。
当使用多个属性时用 ，分割就可以
transition-property: 属性 1， 属性 2， 。。。

transition-duration: 时间 可以是秒（s) 也可以是 毫秒（ms）

transition-timing-function: 关键字 | 贝塞尔曲线|定格动画
关键字：

| 关键字      | 含义                     | 相对应的贝塞尔曲线            |
| ----------- | ------------------------ | ----------------------------- |
| linear      | 匀速变化                 |  cubic-bezier(0,0,1,1)        |
| ease        | 两头慢中间快             | cubic-bezier(0.25,0.1,0.25,1) |
| ease-in     | 先慢后快                 | cubic-bezier(0.42,0,1,1)      |
| ease-out    | 先快后慢                 | cubic-bezier(0,0,0.58,1)      |
| ease-in-out | 两头慢，中间快（匀变速） | cubic-bezier(0.42,0,0.58,1)   |

内塞尔曲线 cubic-bezier(n, n, n, n)

定格动画 steps(n，start|end)

1. **步数（steps）**：一个整数，表示你想要动画分割成多少步。
2. **方向（direction）**：可以是 start 或 end。这个参数是可选的，默认值为 end。
   - 当设置为 start 时，函数在每个时间间隔的开始时改变属性值。
   - 当设置为 end 时，函数在每个时间间隔的结束时改变属性值。

steps() 功能特别适用于那些需要模拟机械运动或不需要平滑过渡的动画场景，比如电子钟的秒针跳动，或者图像精灵的逐帧动画。
![image.png](https://cdn.nlark.com/yuque/0/2023/png/647071/1701331188085-a9744184-efae-4d82-b4d4-60e82dd04b21.png#averageHue=%23f3e1dc&clientId=u46373819-667e-4&from=paste&height=275&id=uab79a1d7&originHeight=275&originWidth=616&originalType=binary&ratio=1&rotation=0&showTitle=false&size=29706&status=done&style=none&taskId=ue29b12b9-bbe7-4a23-8e0b-0d2e23983ea&title=&width=616)

transition-delay: 时间
正值：延后开始过渡
负值：提前开始过渡

Transition 相关的事件。

ontransitionstart

ontransitionend

ontransitioncancel

ontransitionrun
