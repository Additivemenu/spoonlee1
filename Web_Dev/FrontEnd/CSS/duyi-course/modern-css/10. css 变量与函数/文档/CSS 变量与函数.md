在CSS中，变量是用于存储和重复使用值的一种机制。CSS变量也被称为自定义属性（Custom Properties），其以**--**开头命名。变量的定义和使用如下所示：

1. **定义变量：**
```css
:root {
  --main-color: #3498db;
  --font-size: 16px;
}
```
在上面的例子中，**:root**选择器表示文档的根元素，通常是HTML文档中的**<html>**元素。在**:root**中定义的变量可以在整个文档中使用。

2. **使用变量：**
```css
body {
  color: var(--main-color);
  font-size: var(--font-size);
}
```

以上是变量的基本内容。
## 变量命名
--开头， 限制较少，不支持$、[、]、^、(、)、%、"等字符，使用需要转义

```javascript
.box {
            --color: blue;
            --变量: 24px;
            ---: 2px dashed skyblue;
            --23: 20;
            --\]: 20px;

            color: var(--color);
            border: var(---);
            font-size: var(--变量);
            z-index: var(--23);
            margin-left: var(--\]);
            position: relative;
        }
```
## var()特性
var完整语法
var(自定义属性， 后备css属性)

```css
.box {
  --what: 32px;
  color: var(--what, red);
  font-size: var(--what);
}
```
后备CSS属性值只在前面的自定义属性**一定无效**的时候才渲染，如果var()函数的第一个参数值可能有效，则后备CSS自定义属性值是不会渲染
如果第一个参数值是不合法的，则var()函数解析为当前CSS属性的初始值或继承值（如果有继承性），也就是按照unset全局关键字的规则渲染

#### CSS自定义属性值可以是任意值或表达式
#### CSS自定义属性值可以相互传递
## 属性作用域
和js中的作用域特点很像 
js中作用域， 全局作用域，局部作用域，作用域链
css中作用域，全局作用域，局部作用域，继承，但与权重无关。

## 其他
行间样式也支持设置css变量
通过javaScript设置（获取）css变量

```html
<div class="container" style="--color: red">
      <div class="box" style="color: var(--color)">123</div>
    </div>
    <script>
      const box = document.querySelector(".box");
      const color = box.style.getPropertyValue("--color");
            box.style.setProperty("--color", "green");  
    </script>
```

1. 
