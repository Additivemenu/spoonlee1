import { configureStore } from '@reduxjs/toolkit'
import postsReducer from './PostSlice'      // default import

const rootReducer = {
    posts: postsReducer     // ! 为什么要起 posts这个名字?, posts 对应 useSelector(state => state.posts)中的posts
}

// store 里可能会有不同的reducer
const store = configureStore({
  reducer: rootReducer
})

export default store;
