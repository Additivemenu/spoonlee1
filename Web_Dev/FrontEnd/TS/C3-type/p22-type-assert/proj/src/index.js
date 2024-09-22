"use strict";
{
    let someValue = "this is a string"; // 但我清楚知道这其实是一个字符串
    let strLength1 = someValue.length;
    // 如果要写断言，建议用as，因为上面的形式在react中会有歧义。尖括号语法与JSX的标签语法相冲突
    let strLength2 = someValue.length;
}
