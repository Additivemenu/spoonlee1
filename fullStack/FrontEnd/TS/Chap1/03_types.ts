// !
//  也可以直接使用字面量进行类型声明
let aa: 10;

aa = 10;

// aa = 11;     // 通过字面量类型声明, 不能修改了


// ! 字面量
// 可以使用 |  来连接多个类型或者字面量 (联合类型)
let bb: "male" | "female";
bb = "male";
bb = "female"


let cc: boolean | string;
cc = true;
cc = "true";


// ! any
// 一个变量声明为any, 相当于对该变量关闭了TS的类型检测, 使用TS一般不用
let dd: any;
dd = 10;
dd = 'hello';
dd = true;

// ! 声明变量如果不指定类型, TS自动认为是any
let ee;

// ! 
// any 类型的变量可以赋给任何类型的变量
let ss: string;
ss = dd;


// ! unknown 表示未知类型的值
// 值可以是任意类型 
let ff: unknown;
ff = 10;
ff = 'hello';
ff = true;

// !
// 但是 unknown 类型的变量不能直接赋值给unknown类型的值
// unknown类型其实就是一个类型安全的any, 能用unknown尽量别用any
let gg = 'hello';
// gg = ff;     //! error

// 必须先做类型检查, 才能将unknown类型的值符给其他类型的变量
if(typeof ff === "string"){
    gg = ff;
}


// 类型断言, 用来告诉解析器变量的实际类型
/**
 * 语法:
 *  变量 as 类型
 *  <类型> 变量
 */
gg = ff as string; 
gg = <string> ff;



// ! void
function fn(): number{
    return 123;
}

function fn1(): void{
    
}

function fn2(): number | string{
    return 1;
}

// ! never 表示永远不会返回结果, 主要用来报错
function fn3(): never{
    throw new Error('报错了');
}

