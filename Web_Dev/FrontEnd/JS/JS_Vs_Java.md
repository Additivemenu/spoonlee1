# variable声明
+ JS用let, const, 弱类型

# control loop


# function
+ JS的箭头函数
+ JS一些函数的argument可以是另一个函数
```js
// officers is an array of objects
const officerIds = officers.map((officer)=>{
  return officer.id
})  

```

:bangbang: 和Java很大的不同是, JS中函数可以作为变量被到处传递, 函数变量本质上也是object, 而Java中没有函数变量这种说法, Java只是通过functional interface来完成类似的功能 

由于JS是动态语言, 代码块都可以作为变量来进行传递的.


# object & class
+ JS的object可以由字面量直接赋值产生
+ JS的object(including array and function)不需要任何额外方法, 可以直接被打印


## Array
+ {...} 展开
  + 如果object只有1层, spread operator相当于深拷贝
  + {...person, name: 'li'} vs. {name:'li', ...person} 的区别
    + 后写的属性覆盖前面写的属性 


