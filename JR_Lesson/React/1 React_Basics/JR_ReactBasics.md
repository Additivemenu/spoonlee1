龙哥React (上)

| Class            | Content                           |
| ---------------- | --------------------------------- |
| [1](./react1.md) | React入门, JSX                    |
| [2](./react2.md) | React 组件化                      |
| [3](./react3.md) | React hooks: state, state lifting |
| [4](./react4.md)  | Thinking in React                 |

基本是对应尚硅谷React的chapter1, chapter2, 而且比尚硅谷讲的要浅的多, 且并没有如何导入API的内容





一般流水线:

1. 创建react app: 合适的路径下 `npx create-react-app project-name`

2.  搭建文件目录, 将Component.js连接起来

   ```react
   // Component.js里:
   import ... from ...
   
   const ComponentName = () => {
     
     ...
     return (
       // 注意JSX必须上来先用div包一下
     	<div className="container">
       		... 
       </div>
     )
   }
   
   
   export default ComponentName
   
   // index.js作为组件的索引, 只需写一句话
   export {default} from './ComponentName'
   ```

​	



`npm start run`启动
