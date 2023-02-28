import {useDispatch} from 'react-redux'
import {deletePost} from '../store/PostSlice'       // as we use named export in PostSlice


// Post card component
const Post = ({post}) => {

    // 拿到action
    const dispatch = useDispatch();    

    const handleDelete = () => {
        dispatch(deletePost(post.id));      // post.id 将作为action.payload
    }

    return (
        <div className="post">
            
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <button 
                className="delete-button"
                onClick = {handleDelete}>
                    Delete
            </button>

        </div>
    )
}

export default Post;