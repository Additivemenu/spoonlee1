{
    // 可见写起来, 比TS函数重载简洁多了
    function identity(value) {
        return value;
    }
    // 写全了Generics:
    var s1 = identity(1);
    var s2 = identity("a");
    var s3 = identity({ id: 1, name: "aaa" });
    console.log(s3.name); // ok
    // 当我们调用的时候，TS其实可以根据我们传入的参数自动推导泛型的类型，所以，调用的时候，前面的<>是可以省略的
    var ss1 = identity(1);
    var ss2 = identity("a");
    var ss3 = identity({ id: 1, name: "aaa" });
    console.log(s3.name); // ok
}
{
    function getTuple(a, b) {
        return [a, b];
    }
    var as = getTuple("hello", "world");
    console.log(as); // [ 'hello', 'world' ]
}
{
    // 类型写死的写法
    function myNumberFilter(arr, callback) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (callback(item)) {
                result.push(item);
            }
        }
        return result;
    }
    var filterArr1 = myNumberFilter([1, 2, 3, 4, 5], function (item) { return item % 2 === 0; });
    console.log(filterArr1);
}
{
    // generics的写法, 使得封装更加灵活且严谨 =>  把函数看作一个黑盒, generics看成一个标签或者占位符
    function filter(arr, callback) {
        var result = [];
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (callback(item)) {
                result.push(item);
            }
        }
        return result;
    }
    var filterArr1 = filter(["xxx.js", "aaa.java", "bbb.md"], function (item) {
        return item.endsWith(".js");
    });
    console.log(filterArr1);
    var filterArr2 = filter([1, 2, 3, 4, 5], function (item) { return item % 2 === 0; });
    console.log(filterArr2);
}
