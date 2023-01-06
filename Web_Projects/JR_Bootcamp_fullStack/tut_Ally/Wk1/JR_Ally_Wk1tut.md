
# 1. sign up form 19:32-20:15

[sign up form](./signupForm.html)


[sign up form 复现](./Redo_Practice/signUpForm_redo.html)

复现心得:
+ 先决定页面分成几块, 用几个`<fieldset>`, 使用`<legend>`来给`<fieldset>`元素定义caption
+ `<input>`和`<option>`中的value属性是干嘛的? 
  + value是输入框内的显示内容
  + 输入框外部的内容还得用`<p>`或者`<label>`来写
  + 使用padding来使得text的输入框加宽， 使用margin来控制一系列元素之间的间隔
+ 嵌套的box, 如果对里面的box写width:100%, 则里面box的width等于外面box的content那部分的宽度(而不是外面box的宽度)
+ **border-box的使用, 我觉得上来对全部元素直接border-box更为方便**
+ **对相同的标签使用不同的类名, 方便在CSS中对同类标签分类渲染, 如表示对话框输入的input的class="textInput", 表示单多选的input的class="choice"**
+ 替换`<select>`自带的小箭头


# 2. flex card 20:15-21:06

[flex_cards](./flex_card.html)

[flex cards 复现](./Redo_Practice/flexCard_redo.html)

复现心得:
+ 注意多层div的嵌套运用, 不同的层次的div可能有不同的作用
  + container中嵌套一个wrapper的意义
    + 可以更灵活地实现不同层级实现不同的布局, 功能
    比如实现拉小窗口流动到第二排的图片从左边开始, 而不是居中
+ **注意灵活运用margin来使得cards之间有间隙, padding的使用可以创造出画框的效果**
+ 如果不为div写width, height, 则默认div的宽高就是包络所有sub-element的最小矩形 
+ 使用box-shadow来使得cards更有立体感
+ 两种方式实现space-between

---

# Q&A 21:06-21:22

下节tut做grid

---

其他6个index.html都没讲, 我们只看index4即可

[index4.html](./index4.html)