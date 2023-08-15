import { useState, useEffect } from "react";

const Pagination = ({postsPerPage, totalPosts, currentPage, setCurrentPage}) =>{

    const [pageNumbers, setPageNumbers] = useState([])

    useEffect(()=>{
        let arr = [];
        for(let i =1; i <= Math.ceil(totalPosts/postsPerPage); i++){
                arr.push(i);
        }
        setPageNumbers (arr);
        
    },[totalPosts, postsPerPage])       // 当[totalPosts, postPerPage]任意一项改变时, 触发第一个argument函数 
    // 注意如果你第二个argument为[], 表示初次加载页面时会触发执行函数, 而我们接收从后端的数据也是初次加载页面时触发
    // 如果这样, 那PageNumbers就是空的
    // 很明显有一个先后顺序: 应该是先接收后端数据， 再执行这里的useEffect()中的函数.  

    return (
        <nav>
            <ul className="pagination">
                {
                    pageNumbers.map(number => {
                        return (
                            <li key={number} className="pagination-item">
                            <button 
                                className='pagination-btn' 
                                onClick= {()=> setCurrentPage(number)}
                                style={{background: currentPage === number ? 'lightblue':null}}
                                >
                                    {number}
                            </button>
                         </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}

export default Pagination;