用来打卡前端小练手项目

[day1: auto-changing background](./Day1/index.html)
+ 做网页中的button, 也可以用<a> (<a>中甚至可以嵌套img)
+ animation属性

---

[day2: sliding-cards (导库实现)](./Day2/index.html)

---

[day3: 手写sliding-cards](./Day3/index.html)
+ 关于element的properties与method. [MDN: element](https://developer.mozilla.org/en-US/docs/Web/API/Element)
+ background的一个gradient变化: background属性, gradient函数 [MDN: gradient](https://developer.mozilla.org/en-US/docs/Web/CSS/gradient)
+ default隐藏button, hover时才显现出来的效果: opacity属性 - 0完全透明(transparent), 1完全不透明(opaque)
+ hover到一个elementA上, 触发elementA下的elementB的style变化: 
    ```css
    elementA:hover elementB{
        ...
    }
    ```
+ sliding-cards的smooth滑动效果: container的scroll-behaviour属性
+ 写card居中时, 注意flex三连是写到哪个层级里, 嵌套的div很多, 一定分清楚层级
  + 容器内元素很多时候, 如果仅仅使用flex, 容器内的元素布局就会比较复杂.  可以对容器用position: relative, 容器内的的某些子元素可以用position: absolute来直接指定其相对于容器的位置(e.g.这个例子里的pre-btn, nxt-btn 就是这样做出来的)

---
[day4: to-do-lists](./Day4/index.html)
+ pseudo element做依附于html元素的pseudo element: ✅
  + 注意✅是怎么做出来的, 只定义box的两个border-width, 然后rotate
+ JS toggle className