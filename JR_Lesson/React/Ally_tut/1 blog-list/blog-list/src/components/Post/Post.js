const Post = ({currentPosts, loading}) =>{

    if(loading){    // if still loading data, remind user 
        return <h2>Loading</h2>
    }

    return (
        <ul className = 'list-group'>
            {   
                currentPosts.length > 0 &&      // boundary condition: currentPosts有内容再返回html
                currentPosts.map(ele => {
                    return (
                        <li key={ele.id} className='list-group-item'>
                            {ele.title}
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default Post;