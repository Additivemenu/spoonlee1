const fns = [];

// giao, 把函数变量放入一个数组...
for (let i = 0; i < 10; i ++) {
    fns[i] = function(){
        console.log(i);
    }
}

console.log(fns[3] )     // 函数变量
/**
 * ƒ (){
        console.log(i);
    }
 */

fns[4]()    // 调用函数变量对应的函数体
/**
 * 4
 */


// 解构
{



}