// 封装一个函数mineReadFile 读取文件内容
// 参数: path 文件路径
// 返回: Promise对象

function mineReadFile(path){
    // 返回 Promise 对象
    return new Promise((resolve, reject)=>{
        // 读取文件
        require('fs').readFile(path, (err, data) => {
            //
            if (err) reject(err);
            resolve(data);
        })
    })
}

// Promise 对象.then()
mineReadFile('./resource/content.txt')
.then(value=>{
    // 成功, 输出文件内容
    console.log(value.toString())
}, reason=>{
    // 失败
    console.log(reason)
})