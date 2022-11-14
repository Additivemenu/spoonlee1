

[HTML精简笔记](https://www.wolai.com/topcoderdoc/qxVBEVDrfSzif4djdw4hGm)

主要标签(tag)就4部分: 1)文本相关; 2)heading; 3) multi-media; 4) HTML list

标签格式:
```html
<p class="", ... >html content</p> 
```
+ html content 可以是text, 也可以是html tag, 比如一个表示image的tag
+ tag 后面的class， 可以用来区分相同类型的tag

# 1. HTML基本语法

## 1.1. 文本相关

## 1.2 Heading

## 1.3 :star:multi-media
### 1.3.1 Image
[document: img tag](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/img)
```html
<img class="fit-picture"
src="/media/cc0-images/grapefruit-slice-332-332.jpg"
alt="Grapefruit slice atop a pile of other slices">
```

### 1.3.2 Video
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


### 1.3.3 Audio
[document: audio tag](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/audio)




## 1.4 HTML list

[HTML List demo](HTML_Sample/HTML_LIST.html)

![result](Src/htmlist1.png)

注意其中nested list的写法

HTML <table> 快过时了, 因为现在有了新的布局工具


# 1.2 注意特殊语法:
+ p.active 和p .acitve 的区别 （2h08min-）
前者指p本级有个叫active的class，后者指p下属所有级适用的叫active的class
注解:本级，下属级指代写html时的分属关系，如<p> <em></em>  </p> 中em下属于p
+ Vscode的emmet (快捷指令宏): e.g. 批量写p： p>span.sp-$*6，按tap
