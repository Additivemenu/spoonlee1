:computer: [尚硅谷: Promise从入门到精通](https://www.bilibili.com/video/BV1GA411x7z1/?spm_id_from=333.337.search-card.all.click&vd_source=c6866d088ad067762877e4b6b23ab9df)



# 1. Promise的介绍与基本使用

1-12

## Promise是什么？

Promise是一门新的技术(ES6规范), 是JS中进行异步编程的新解决方案(旧方案是单纯使用回调函数)

```js
// 异步操作举例
1. fs文件操作
require('fs').readFile('./index.html', (err, data)=> {}) // 回调函数的例子

2. 数据库操作

3. AJAX 网络请求 (AJAX上层的Axios)
$.get('/server', (data)=>{})  // 回调函数的例子

4. 定时器
setTimeout(()=>{}, 2000)  // 回调函数的例子
```



从语法上来说, Promise是一个构造函数

从功能上来说, Promise对象用来封装一个异步操作并可以获取其成功/失败的结果值



## why Promise? 

Promise指定回调函数的方式更加灵活

旧的: 必须在启动异步任务前指定

Promise: 启动异步任务 ---> 返回Promise对象 ---> 给Promise对象绑定回调函数(甚至可以在异步任务结束后指定/多个)



---

Promise支持链式调用, 可以解决回调地狱问题

回调地狱问题: 回调函数嵌套调用, 外部回调函数异步执行的结果是嵌套的回调执行条件

回调地狱缺点: 不便于阅读, 不便于异常处理

解决方案: Promise链式调用





## Promise初体验

### e.g.1  抽奖

03

使用Promise时, 分两步

+ 实例化Promise, 定义什么时候Promise状态为成功, 什么时候为失败 (封装异步操作)
+ 对Promise实例调用then(), 定义该Promise实例状态为成功时干什么, 失败时干什么

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div class="container">
        <h2 class="page-header">Promise初体验</h2>
        <button class="btn btn-primary" id="btn">点击抽奖</button>
    </div>

    <script>
        // 生成随机数
        function rand(m,n){
            return Math.ceil(Math.random()*(n-m+1)) + m-1;
        }

        /**
         * 点击按钮, 2s后显示是否中奖（30%概率中奖）
         *      若中奖, 恭喜恭喜, 奖品为10w rmb 
         *      若未中奖, 再接再厉
         */
        // 获取元素
        const btn = document.querySelector('#btn');
        // 绑定单击事件
        btn.addEventListener('click', function(){
            // // 方式一: 不用Promise   定时器 --------------------
            // setTimeout(()=>{
            //     // 30% 1~100
            //     // 获取从1到100的随机数
            //     let n = rand(1, 100)

            //     if(n <= 30){
            //         alert('恭喜恭喜, 奖品为10w rmb ')
            //     }else{
            //         alert('再接再厉');
            //     }

            // }, 1000)
            // ----------------------------------------------------
						
          	// ----------------------------------------------------
            // 方式二: 使用Promise
            // Promise实例化需要接收一个函数作为argument
            // resolve: 异步任务成功调用resolve 函数类型数据
            // reject: 异步任务失败调用reject 函数类型数据
            const p = new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    // 30% 1~100
                    // 获取从1到100的随机数
                    let n = rand(1, 100)

                    if(n <= 30){
                        resolve()       // 调用resolve()会将Promise对象的状态设置为 [成功]
                    }else{
                        reject()        // 调用reject()会将Promise对象的状态设置为 [失败]
                    }

                }, 1000)
            });

            // 调用then()
            // Promise状态为成功时调用第一个arg
            // Promise状态为失败时调用第二个arg
            p.then(()=>{
                alert('恭喜恭喜, 奖品为10w rmb ')
            }, ()=>{
                alert('再接再厉');
            });
          	// ------------------------------------------------------

        })
    </script>
    
</body>
</html>
```



04

可以通过reject() 和 resolve() 向回调函数传值

还是上面的html为例

+ 将产生的随机数n作为argument传入reject()和resolve(), 之后then()中的对应状态的回调函数就可以用n了

```html
    <script>
        // 生成随机数
        function rand(m,n){
            return Math.ceil(Math.random()*(n-m+1)) + m-1;
        }

        /**
         * 点击按钮, 2s后显示是否中奖（30%概率中奖）
         *      若中奖, 恭喜恭喜, 奖品为10w rmb 
         *      若未中奖, 再接再厉
         */
        // 获取元素
        const btn = document.querySelector('#btn');
        // 绑定单击事件
        btn.addEventListener('click', function(){
            // // 方式一: 不用Promise   定时器
            // setTimeout(()=>{
            //     // 30% 1~100
            //     // 获取从1到100的随机数
            //     let n = rand(1, 100)

            //     if(n <= 30){
            //         alert('恭喜恭喜, 奖品为10w rmb ')
            //     }else{
            //         alert('再接再厉');
            //     }

            // }, 1000)

            // 方式二: Promise
            // Promise实例化需要接收一个函数作为argument
            // resolve: 异步任务成功调用resolve 函数类型数据
            // reject: 异步任务失败调用reject 函数类型数据
            const p = new Promise((resolve, reject)=>{
                setTimeout(()=>{
                    // 30% 1~100
                    // 获取从1到100的随机数
                    let n = rand(1, 100)

                    if(n <= 30){
                        resolve(n)       // 调用resolve()会将Promise对象的状态设置为 [成功], 向then()中对应回调函数传入n
                    }else{
                        reject(n)        // 调用reject()会将Promise对象的状态设置为 [失败], 向then()中对应回调函数传入n
                    }

                }, 1000)
            });

            // 调用then()
            // Promise状态为成功时调用第一个arg
            // Promise状态为失败时调用第二个arg
            p.then((value)=>{
                alert('恭喜恭喜, 奖品为10w rmb, 中奖数字为: '+ value)
            }, (reason)=>{
                alert('再接再厉, 您的号码为: ' + reason);
            });


        })


    </script>
```





### e.g.2 fs读取文件



### e.g.3 ajax请求





## Promise对象状态属性

10-11

## Promise工作流程

12

# 2. Promise API

13-17

# 3. Promise 关键问题

18-24



# 4. Promise自定义封装

25-42

# 5. async与await

43-46