import React, { Component } from "react";
import './index.css'

// step1: 创建一个用来保存用户名的context(上下文)对象
const MyContext = React.createContext();
const {Provider, Consumer} = MyContext;


export default class A extends Component {
  state = { username: "tom" , age: 18};


  render() {
    const {username, age} = this.state

    return (
      <div className="parent">
        <h3>I am Component A</h3>
        <h4>my user name is: {username}</h4>

        {/* step2: 使用destruct的写法 -- 此时 B组件及其后代都可以准备接收 value(必须是value 不能是其他名字)的信息了 */}
        <Provider value={{username: username, age: age}}>   
            <B/>
        </Provider>
        
        {/* 不用destruct的写法 */}
        {/* <MyContext.Provider>

        </MyContext.Provider> */}


      </div>
    );
  }
}

class B extends Component {
  render() {
    return (
      <div className="child">
        <h3>I am Component B</h3>
        <h4> the user name that I received from Component A: {this.props.username}</h4>
        <C username={this.props.username} />
      </div>
    );
  }
}


// 类组件
// class C extends Component {

//   // step3
//   static contextType = MyContext; // 声明接收context


//   render() {

//     console.log(this.context)   // 读取context

//     const {username, age} = this.context;

//     return (
//       <div className="grandson">
//         <h3>I am Component C</h3>
//         <h4> the user name that I received from Component A: {username}, age: {age}</h4>
//       </div>
//     );
//   }
// }


// 函数式组件
function C(){

  return (
          <div className="grandson">
            <h3>I am Component C</h3>
            <h4> the user name that I received from Component A: 
              <Consumer>
                {
                  value => {
                    return `${value.username}, age: ${value.age}`
                  }
                }
              </Consumer>
            </h4>
          </div>
        );

}
