// 读取resource > 1.html, 2.html, 3.html的内容并合在一起

const fs = require('fs')
const util = require('util')
const mineReadFile = util.promisify(fs.readFile)        // 将fs.readFile转化为Promise

// // 方式1: 使用回调函数的形式来实现
// fs.readFile('./resource/1.html', (err, data1) => {
//     if(err) throw err;
//     fs.readFile('./resource/2.html', (err, data2) => {
//         if(err) throw err;
//         fs.readFile('./resource/3.html', (err, data3) => {
//             if(err) throw err;

//             console.log(data1 + data2 + data3)
//         })
//     })
// })


// 方式2: 使用async, await; 两者结合看不到回调函数， 非常简洁易读, 因为await允许我们直接从Promise对象中抽取了PromiseResult信息
async function main(){

    try{
        // read 1.html
        let data1 = await mineReadFile('./resource/1.html')
        // let data1 = await new Promise((resolve, reject) => {
        //     reject("I am Batman!")
        // })
        let data2 = await mineReadFile('./resource/2.html')
        let data3 = await mineReadFile('./resource/3.html')

        console.log(data1 + data2 + data3)


    }catch(e){
        console.log('error: '+ e)
    }

}   

main()