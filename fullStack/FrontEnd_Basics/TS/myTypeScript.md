:computer: [尚硅谷李立超: TypeScript](https://www.bilibili.com/video/BV1Xy4y1v7S2/?spm_id_from=333.337.search-card.all.click&vd_source=c6866d088ad067762877e4b6b23ab9df)

:pencil: [chapter1: TS basics](./Chap1/README.md)

:pencil: [chapter2: Ts编译选项](./Chap2/README.md)

---

# TS introduction
01

JS 特点: 易学易懂

JS 缺点：JS的易学易用也导致很多前端工程师不求甚解,  而且JS写的项目难以维护, 不适合开发大型项目
+ JS的变量类型是动态的, 不限定变量的类型, 尤其是函数的参数也没有固定的类型, 会带来安全隐患


什么是TypeScript?
+ 以JavaScript为基础构建的语言, 是JavaScript的超集
+ 可以在任何支持JS的平台中执行
+ TS扩展了JavaScript, 并添加了类型
+ :bangbang: TS不能被JS解释器直接执行, TS需要先编译为JS才能执行, 就像SCSS和CSS的关系

TS增加了什么?
+ 类型
+ Enum
+ Interface
+ abstract class 
+ 支持ES新特性
+ 丰富的配置选项
+ 强大的开发工具

# TypeScript开发环境搭建
+ 下载安装node.js
+ 使用npm全局安装typescript
  + 命令行输入`npm i -g typescript`
+ 创建一个ts文件
+ 使用tsc(typescript compiler)对ts文件进行编译
  + 进入命令行
  + cd进入ts文件所在目录
  + 执行命令 `tsc xxx.ts` 编译ts文件为js文件


---

关于切换node版本
（1）安装node版本管理模块
```bash
sudo npm install n -g
```

(2)下边步骤请根据自己需要选择

```bash
// 下载稳定版node (preferred)
sudo n stable

// 下载最新版node
sudo n latest
```