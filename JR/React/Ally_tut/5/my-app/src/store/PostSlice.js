import { createSlice } from '@reduxjs/toolkit'      // just like createContext in previous tutorials

const initialState = [
  {id: 1, title: 'First Post', body: 'This is the first post'},
  {id: 2, title: 'Second Post', body: 'This is the second post'}
]

// Slice is like Context, which is used to warp states and functions as a 'package'
const postSlice = createSlice({
    name: 'posts',
    initialState,           // 存在一个隐性的变量: state; 有了initialState, state的形态就确定了
    reducers: {
        addPost:  (state, action) => {      // 定义由action, 和原来的state作为输入, state如何变化, 返回的结果是更新后的state
            const {title, body} = action.payload

            const id = state.length+1           
            state.push({id, title, body})       // 
        },
        deletePost: (state, action) => {    // 返回的结果是更新后的state
            const postId = action.payload
            const res = state.filter(post => post.id !== postId)
            console.log('res', res)
            return res;
        }
    }

})

// !export action ! 哪里有postSlice.actions属性?
// ! 为什么不 export slice的state属性?
export const {addPost, deletePost} = postSlice.actions;      // named export

export default postSlice.reducer;        // default export, 把定义名为'posts'的slice中的reducer export出去