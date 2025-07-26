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
    console.log(cc1 + " / "+ cc2)       // 无法destruct出超过一层的object: [object Object] / [object Object] 错啦! 这是因为混用了'\'
    console.log('cc1')
    console.log(cc1)
    console.log(cc2)

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
    console.log("subject1: "+ subject1)
    console.log("subject2: "+ subject2)


    student.courses[0] = {name: 'wow'}
    console.log("student.courses: "+ student.courses)
    console.log('myCOurses: ' + myCourses)
    console.log("subject1: " + subject1)

    // 有点离谱, 为什么subject1不是myCourese[0]的shallowCopy?
    myCourses[0] = {name: "mycourses0"};    
    console.log(subject1)           //  'javaspring'

    // 
    console.log("-----------检查解构object成员变量是否是shallowCopy-----------")
    const personArr=[
        {name: "Tom", age: 12, courses:[{name: 'math', mark:90}, {name: 'physics', mark:89}] },
        {name: "Jerry", age: 16, courses:[{name: 'math', mark:100}, {name: 'physics', mark:95}]}
    ]
    const [
        tom,                // tom is a shallowCopy of personArr[0]
        jerry
    ]= personArr
    console.log(tom)         // 注意打印只写tom, 别写别的字符串拼接, 不然显示[object Object]
    console.log(jerry)

    tom.age = 14
    console.log(tom)            // 14
    console.log(personArr)      // 14

    // 想get第三层的object 变量也是可以的, 但是明显写起来会绕了很多
    const [
        {courses: tomCourses},
        {courses: jerryCourses}
    ] = personArr;

    console.log('tom, jerry courses:')
    console.log(tomCourses)
    console.log(jerryCourses)


    // ...rest
    console.log('--------...rest----------')
    const{
        name,
        ...studentWithoutName
    } = student;
    console.log(studentWithoutName);      // 除去name属性的object打印出来  (嵌套了再多层的object也可以)



}