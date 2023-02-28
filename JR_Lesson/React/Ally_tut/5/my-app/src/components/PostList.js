import React from 'react'

import {useSelector} from 'react-redux'
import Post from './Post'

const PostList = ()=>{
    // Call useSelector with a function that takes the Redux store state as its argument and returns the value (即store里的指定reducer所在的slice的state) you want to select from the state. 
    // This will subscribe the component to the Redux store and automatically update the component whenever the selected value changes:
    const posts = useSelector (state => state.posts)            // 像useContext那样, 获取redux的Provider组件里绑定的store的东西 
    // ! 这里的state指的是什么?---应该是Redux store的state   
    // !这里state.posts居然得到了我们在PostSlice里隐性定义的state (由initialState隐性定义)
    // ! 这样理解, state表示store的状态, state.posts代表了我们定义在PostSlice中的reducer, 也就能够找到该slicer的state
    // state.posts中posts指的是store里的

    console.log('posts', posts)

    return (
        <div className='post-list'>
            {
                posts.map(post => {
                    return (
                        <Post key={post.id} post={post}/>
                    )
                })
            }
        </div>
    )
}

export default PostList