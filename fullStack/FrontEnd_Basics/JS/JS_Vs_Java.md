# variable声明
+ JS用let, const

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

# object & class
+ JS的object可以直接产生

## array
+ {...} 展开
  + 如果object只有1层, spread operator相当于深拷贝
  + {...person, name: 'li'} vs. {name:'li', ...person} 的区别
    + 后写的属性覆盖前面写的属性 