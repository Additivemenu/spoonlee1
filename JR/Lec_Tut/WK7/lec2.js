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
    console.log("-----------destructing-------------");
    const arr = ['A', 'B', 'C'];
    // 和上面等效的
    const arr1 = {0: 'A', 1: 'B', 2:'C'}
    
    // 解构数组
    const {0: aa, 1: bb, 2: cc} = arr
    console.log(aa);
    console.log(bb);
    console.log(cc);

    const [a, b, c] = arr   // a = 'A', b = 'B', c = 'C'
    console.log(a);
    console.log(b);
    console.log(c);

    // destructing嵌套
    console.log("---------destructing嵌套-----------")
    const student = { 
        name: 'Alice', 
        age: 26, 
        courses: [
            {name: 'Introduction to JavaScript', }, 
            {name: 'How to give up JavaScript', }]
    };

    const {
        name: myName,
        age: myAge,
        // courses: [
        //     {name: course1},
        //     {name: course2}]
        // 和上面等效
        courses: {
            0: {name: course1},
            1: {name: course2}
        }
    } = student;
    console.log(`${myName}, ${myAge}, I study: \n ${course1} and \n ${course2}`)

    // 需要注意destructing 只能操作一层, 深层了得嵌套使用
    // e.g. 从student object中destruct出两个course的名称
    console.log("-----需要注意destructing 只能操作一层, 深层了得嵌套使用------")
    const{
        courses: [
            {name: c1},
            {name: c2}
        ]
    } = student;
    console.log(c1 + " / "+ c2)     // Introduction to JavaScript / How to give up JavaScript

    const{
        courses:[
            cc1,
            cc2
        ]
    }= student;
    console.log(cc1 + " / "+ cc2)       // 无法destruct出超过一层的object: [object Object] / [object Object]

    const{
        courses: myCourses
    } = student;
    console.log(myCourses);         // desctruct仅一层的object: courses 数组,  且myCourses为courses的shallowCopy

    student.courses[0] = {name: 'javaspring'};
    console.log(myCourses);         // myCourses为student.courses的shallowCOpy

    // 从student object中destruct出courses数组中的两个course对象
    // 用deepCopy?
    console.log(`--------------从student object中destruct出courses数组中的两个course对象---------------`);
    const[
        subject1,
        subject2
    ] = myCourses
    console.log(subject1)
    console.log(subject2)


    student.courses[0] = {name: 'wow'}
    console.log(student.courses)
    console.log(myCourses)
    console.log(subject1)

    // 有点离谱, 为什么subject1不是myCourese[0]的shallowCopy?
    myCourses[0] = {name: "mycourses0"};    
    console.log(subject1)           //  'javaspring'


    // ...rest
    console.log('--------...rest----------')
    const{
        name,
        ...studentWithoutName
    } = student;
    console.log(studentWithoutName);      // 除去name属性的object打印出来  (嵌套了再多层的object也可以)



}


// ⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️JS函数的默认参数⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️⬇️
{
    console.log("default parameter");
    const marks = {
        math: 100,
        java: 99
    };

    const getTotalScore = (results) => {
        const {
            math: mathScore,
            java: javaScore

        }  = results

        console.log('math: ' + mathScore)
        console.log('Java: ' + javaScore)
        console.log("total marks is: "+ (mathScore+javaScore) )

    }
    getTotalScore(marks);

    // 利用destruct functional argument来设定函数的默认参数
    console.log('-------利用destruct functional argument来设定函数的默认参数-------');
    const getTotalScore1 = (
        {math = 0, 
        java = 0}) => {

        console.log('math: '+ math)
        console.log('Java: '+ java)
        console.log("total marks is: "+ (math+java) )
    }

    marks1 = {
        math: 95
    }
    getTotalScore1(marks1);


    // e.g 在argument中使用'=', 设置两层的参数默认值
    console.log('--------在argument中使用=, 设置两层的参数默认值----------');
    const getTotalScore2 = ({
            math = 0, 
            java = 0
        } = {
            math: 0,
            java: 0
        }) => {

        console.log('math: '+ math)
        console.log('Java: '+ java)
        console.log("total marks is: "+ (math+java) )
    }

    getTotalScore2();    // 空参, 则传入函数的object为{math:0, java:0}
    getTotalScore2({math: 90});   


}