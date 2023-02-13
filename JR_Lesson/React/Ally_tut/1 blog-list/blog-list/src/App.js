import {useState, useEffect} from 'react'   // 注意要导入hooks
import axios from 'axios';

import './App.css';

import Pagination from './components/Pagination'
import Post from './components/Post'


function App() {

  const [posts, setPosts]= useState([]);
  const [loading, setLoading] = useState(false);    // 用来表示是否loading后端发来的数据

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


  return (

    <div className="container">
      <h1 className="title">My blog list</h1>
      <Post/>
      <Pagination/>
    </div>
  );
}

export default App;
