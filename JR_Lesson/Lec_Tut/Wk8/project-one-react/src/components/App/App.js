import styles from './App.module.css';

// html Component
import Header from '../Header'
import Body from '../Body'
import Footer from '../Footer'
import { useState } from 'react';


// 函数名首字母大写
const App = () =>{

  // active: String 可取的值有['/home', '/cotact', '/services', '/blog', '/resume']
  // ! 我感觉js是按引用传递的, 全局只有actvie, setActvie一个内存地址
  const [currentPage, setCurrentPage] = useState('/home') // 兄弟相传, 状态提升到二者的最近公共祖先

  return(
  	<div className={styles.container}>
    	<Header currentPage = {currentPage} onNavItemClick={setCurrentPage}></Header>
      <Body currentPage={currentPage}></Body>    
      <Footer></Footer>
    </div>
  )
}

export default App;
