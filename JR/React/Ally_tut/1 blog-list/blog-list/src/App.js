import {useState, useEffect} from 'react'   // 注意要导入hooks
import axios from 'axios';

import './App.css';

import Pagination from './components/Pagination'
import Post from './components/Post'


function App() {

  const[posts, setPosts]= useState([]);            // 用来存后端发来的post list
  const[loading, setLoading] = useState(false);    // 用来表示是否loading后端发来的数据
  
  const[currentPage, setCurrentPage] = useState(1);     // 表示currentPage index
  const[currentPosts, setCurrentPosts] = useState([]);  // 用来存currentPage对应的post lists
  const[postsPerPage] = useState(10);     // currentPage对应的post lists的长度

  const fetchPosts = async() => {
    setLoading(true); // 表示开始loading后端的数据
    // 因为js是单线程的, 所以需要try-catch包住 axios.get('')以防其失败整个页面崩溃
    try{
      const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
      console.log('res', res);  
      setPosts(res.data); // res is an object, res.data is an array
      setLoading(false);  // 成功load到后端的数据, loading状态应该改为false
    }catch(error){    // 可以具体在这里写error handlding的逻辑, 这里就先不写了
      setLoading(false);
      // 甚至可以具体set一个状态值, 比如401, 404, 500, 对应处理
    }
  }

  // 当组件渲染时, 调用fetchPosts()
  useEffect(()=>{
    fetchPosts()
  }, [])  // 第二个argument为[], 表示第一次挂载App时就会调用fetchPosts()

  // 定义如何将post list分页, 以及何时分页
  useEffect(()=>{
    // get current page posts. 
    // e.g. 点击'5'的button, 对应显示在post lists 中index为40-49的posts
    const indexOfLastPost = currentPage * postsPerPage;  // 50 
    const indexOfFirstPost = indexOfLastPost - postsPerPage;  // 40
    const currentPostArr = posts.slice(indexOfFirstPost, indexOfLastPost);  //[40, 50) 左闭右开
    setCurrentPosts(currentPostArr);
  }, [currentPage, postsPerPage, posts])    // 当[currentPage, postsPerPage, posts]中任何一项发生变化. 就会触发useEffect()中的第一个argument的函数


  return (
    <div className="container">
      <h1 className="title">My blog list</h1>
      <Post currentPosts={currentPosts} loading={loading}/>
      <Pagination 
        postsPerPage = {postsPerPage} 
        totalPosts = {posts.length}   
        currentPage = {currentPage}
        setCurrentPage = {setCurrentPage}
      />
    </div>
  );
}

export default App;
