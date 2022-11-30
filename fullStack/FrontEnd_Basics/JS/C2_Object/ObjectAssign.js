let dest, src, result;

/**
 * 简单复制--------------------------------------
 */

dest = {};          // destination object
src = {id: 'src'};  // source object

result = Object.assign(dest, src);
// Object.assign修改dest
// 同时也会返回修改后的dest

console.log(dest === result);       // true, === return true if value and type both same
console.log(dest !== src);          // true(If both operands are objects, === return true only if they refer to the same object.), !== is opposite to ===
console.log("result: ",result);                // {id: src}
console.log("dest: ", dest);                  // {id: src}

/**
 * 多个source object ------------------------
 */

dest = {};

result = Object.assign(dest, {a:'foo'}, {b: 'bar'});

console.log("------多个source object------");
console.log("result: ",result);                // {a: 'foo', b: 'bar'}

/**
 * get函数与set函数 --------------------------------------
 */
console.log("------get, set函数------");

dest = {
    set a(val){
        console.log(`Invoked dest setter with param ${val}`);
    }
};

src = {
    get a(){
        console.log('Invoked src getter');
        return 'foo';
    }
}

Object.assign(dest, src);
// API task break down: 
// 1. 调用src的get方法, return 了'foo'
// 2. then, 调用dest的设置方法并传入参数"foo"

// 因为这里dest的set函数不执行赋值操作, 所以实际上并没有把值转移过来
console.log(dest);              // {set a(val) {...}}