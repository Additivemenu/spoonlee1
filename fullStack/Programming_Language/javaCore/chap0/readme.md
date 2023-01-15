跳转

:computer: [尚硅谷: IDEA的使用 404-412 已看](https://www.bilibili.com/video/BV1Kb411W75N?p=406&vd_source=c6866d088ad067762877e4b6b23ab9df) 有配套PDF介绍IDEA用法

:computer: [尚硅谷: IDEA的使用(2022年版) 待看](https://www.bilibili.com/video/BV1CK411d7aA?p=1&vd_source=c6866d088ad067762877e4b6b23ab9df)

:pencil: [尚硅谷: IDEA与git](./IDEA_git.md)

:pencil: [Gradle](./IDEA_Gradle.md)

:pencil: [韩顺平: jar](./jar.md)

学习资源

:book: [jetbrains official doc](https://www.jetbrains.com/help/idea/getting-help.html#contact-support)

---
Content 

- [1. IDEA的使用](#1-idea的使用)
  - [1.1 IDEA 启动](#11-idea-启动)
  - [1.2 IDEA Module](#12-idea-module)
  - [1.3 IDEA 常用设置](#13-idea-常用设置)
    - [Appearance \& Behaviour](#appearance--behaviour)
    - [Editor](#editor)
    - [Build, Execution, Deployment](#build-execution-deployment)
  - [1.4 IDEA keymap](#14-idea-keymap)
  - [1.5 IDEA template](#15-idea-template)
  - [1.6 more on pdf](#16-more-on-pdf)

---
# 1. IDEA的使用

尚硅谷有配套PDF讲解IDEA的使用

## 1.1 IDEA 启动 
408

create new project

IDEA project:
+ folder: .idea
+ folder: src
+ ProjectName.iml


## 1.2 IDEA Module
409

Eclipse与IDEA的区别:

Eclipse中workspace 相当于 IDEA中Project
Ecplise中Project 相当于 IDEA中Module

IDEA一个window只能管理一个Project, 但一个Project可以有多个Module;
而Eclipse中一个window可以管理多个Projects

---

IDEA中, right click Module --> Open Module Settings --> remove Module from Project: 不会删除Module, 但该Module会变成普通的文件夹


## 1.3 IDEA 常用设置
410

File --> Settings

### Appearance & Behaviour
主题, 字体大小

### Editor

鼠标滚轮调整字体大小

`general`: auto-import

`general-appearance`: show method separators

`General`-`Editor Tabs`: 多行显示tabs

---
`Font` 

---

`Color Scheme` - `Language Defaults` - `Comments`: 修改代码注释颜色


---

`File and Code Template` --> include --> file header: 修改代码头部信息

```JAVA
/**
@author xueshuo
@create ${YEAR}-${MONTH}-${DAY} ${TIME}
*/
```

---
`File Encodings`: 全改成UTF-8



### Build, Execution, Deployment
`Build, Execution, Deployment` - `Compiler`: 勾选 
+ Build Project automatically
+ Compile independent modules in parallel


注意不要误选了`file` --> `save power mode`, 不然IDEA很多功能会被disabled.

---

`Build, Execution, Deployment` - `Build Tools`: 勾选any changes, 这样当改变build.gradle中的dependency时, 对应external resources也会自动跟着改变

## 1.4 IDEA keymap
411

IDEA的很多快捷键和Eclipse不同. 
+ 可以通过功能查找kepmap, 或者根据keymap查找功能
+ 可以自定义kepmap

常用kepmap
+ `ctrl`+`alt`+`t`:  surround with
+ `alt`+`insert` / `cmd`+`N`: generate Constructor, getter, accessor
+ `command` + `O`: search for the class and check the source code
+ `command` + `fn` + `F12`: display all methods in current class

more on pdf or google


## 1.5 IDEA template
412

两个地方可以configure template
+ `Editor` --> `General` --> `Postfix Completion`: 不能改

+ `Editor` --> `Live Templates`: 可以自定义模板


## 1.6 more on pdf
+ 创建Java Web Project or Module
+ 关联数据库
+ version control
+ 断点调试
+ 配置Maven
+ 其他设置
  + javadoc
  + plugin 

