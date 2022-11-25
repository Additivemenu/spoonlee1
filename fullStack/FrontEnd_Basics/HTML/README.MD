
Contents

- [1. HTML basic tags](#1-html-basic-tags)
  - [1.1. 文本相关](#11-文本相关)
  - [1.2 :star: multi-media](#12-star-multi-media)
    - [1.2.1 Image](#121-image)
    - [1.2.2 Video](#122-video)
    - [1.2.3 Audio](#123-audio)
- [1.2 注意特殊语法](#12-注意特殊语法)

---
学习资源

[HTML精简笔记](https://www.wolai.com/topcoderdoc/qxVBEVDrfSzif4djdw4hGm)

---
HTML核心

标签格式:
```html
<p class="", ... >html content</p> 
```
+ html content 可以是text, 也可以是html tag, 比如一个表示image或hyper link的tag
+ tag 后面的class name， 可以用来区分相同类型的tag. 在JS中有对应函数可以操纵class name
---


# 1. HTML basic tags
根据HTML基本标签, 先分割UI design, 再结合`文档流`写出一个HTML框架作为写web project的第一步

## 1.1. 文本相关

+ Heading
        从`<h1>` 到`<h6>` 由大到小有各种不同的 Heading，为页面创造视觉层级效果

+ Paragraph
        `<p>`里面可以使用`<br/>`换行

+ Bold/Italic 
        使用对应 tag 包住要强调的元素进行加粗或者斜体
        NB: 使用语义话表达的`<strong>`&`<em>`代替`<b>`&`<i>`
+ List
        [HTML List demo](./HTML_Sample/HTML_LIST.html) (注意其中nested list的写法)
        ![result](Src/htmlist1.png)
        HTML `<table>` 快过时了, 因为现在有了新的布局工具

+ 其他常用tag
        `<div>`, `<section>`, `<header>`, `<footer>`...

## 1.2 :star: multi-media
### 1.2.1 Image
[document: img tag](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)
```html
<img class="fit-picture"
src="/media/cc0-images/grapefruit-slice-332-332.jpg"
alt="Grapefruit slice atop a pile of other slices">     <!--表示当src unavailable时的代替选项-->
```

### 1.2.2 Video
[document: video tag](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/video#attr-controls)
```html
<video controls width="250">

    <source src="/media/cc0-videos/flower.webm"
            type="video/webm">

    <source src="/media/cc0-videos/flower.mp4"
            type="video/mp4">

    Download the
    <a href="/media/cc0-videos/flower.webm">WEBM</a>
    or
    <a href="/media/cc0-videos/flower.mp4">MP4</a>
    video.
</video>
```


### 1.2.3 Audio
[document: audio tag](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)


# 1.2 注意特殊语法
+ p.active 和p .acitve 的区别 （2h08min-）
前者指p本级有个叫active的class，后者指p下属所有级适用的叫active的class
注解:本级，下属级指代写html时的分属关系，如<p> <em></em>  </p> 中em下属于p
+ Vscode的emmet (快捷指令宏): e.g. 批量写p： p>span.sp-$*6，按tap
