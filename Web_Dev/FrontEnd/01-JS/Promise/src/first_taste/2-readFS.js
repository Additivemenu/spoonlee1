//
const fs = require('fs');

// // 方式一： 不使用Promise, 回调函数的形式 -----------------------------------------
// fs.readFile('./resource/content.txt', (err, data)=>{
//     // 如果有错误, 抛出
//     if(err) throw err;
//     //  输出文件内容
//     console.log(data.toString());
// })

// 方式二: Promise形式 --------------------------------------------------
// step1 实例化Promise 定义何时成功, 何时失败
let p = new Promise((resolve, reject)=>{
    fs.readFile('./resource/content.txt', (err, data)=>{
        if (err) reject (err);
        resolve(data);
    })
})

// step2 then 定义成功做什么, 失败做什么
p.then(value => {
    console.log(value.toString())
}, reason => {
    console.log(reason)
})
