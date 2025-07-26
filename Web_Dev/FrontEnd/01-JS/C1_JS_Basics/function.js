//primitive type argument------------------------
function func2(info) {
    console.log(`${info} juice`); // ${} extract str input
}

func2("orange");
func2("apple");


// array -----------------------------------------

// object type argument ---------------------------

const obj = {
    // const only confines type of obj, cannot confine its content
    name: "Shawn",
    age: 18,
  };

  function func6(obj) {
    console.log("name:", obj.name);
    console.log("age:", obj.age);
    console.log(obj);

    obj.name = "xueshuo"
    obj.age = 30;
  }

  func6(obj);
  console.log(obj);     // print object
  //---------------------------------
  // function func6(obj) there is only 1 entrance
  // but there are two 'exit'
  // return: 出口之一，特点是产生新内容,同时不更改原始数据
  // 复杂结构的传参: 出口之一, 特点是可以获得内容修改, 缺点是更改了原始的数据。
  //---------------------------------

  // 使用object元素作为函数输入 ------------------
  function func7({ name, age }) {

    name = "shawn";
    age = "20";
    return { name, age };
  }

  const people = {
    // const only confines type of obj, cannot confine its content
    name: "Shawn",
    age: 18,
  };

  const newPeople = func7(people);
  console.log(newPeople); 
  console.log(people); 


// 箭头函数 ----------------------- 

const array = [11,12,13,14,15]
const array_func4 = (num) =>{
  console.log(num)
}

array.forEach(array_func4)


// 为object定义method ------------------------------
const circle = { //notive it only confine the type of cirle,
    // not its content(its content is still changeable)
      radius: 1,
      location: {
        x: 1,
        y: 2,
      },
      isVisible: true,
    
      draw1() {
        console.log("draw1");
      },
    
      draw2() {
        console.log("draw2");
      },
    };
    
    circle.draw1()
    circle.draw2()
