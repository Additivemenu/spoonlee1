import React, { useState } from 'react'
import {useDispatch} from 'react-redux'
import {addPost} from '../store/PostSlice'

const PostForm =  () => {
    // hooks
    const dispatch = useDispatch();
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')


    // functions
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(addPost({title, body}))        // need state
    }

    // jsx
    return (
        <form className='post-form' onSubmit = {handleSubmit}>
            <h2>Add Post</h2>

            <label htmlFor='title'>Title:</label>
            <input type='text' id='title' value={title} onChange={e => {setTitle(e.target.value)}}></input>

            <label htmlFor='body'>Body:</label>
            <textarea id='body' value={body} onChange={e => {setBody(e.target.value)}}></textarea>

            <button type='submit'>Add</button>
        </form>
    )
}

export default PostForm;