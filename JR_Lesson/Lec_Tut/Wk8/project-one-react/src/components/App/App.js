import styles from './App.module.css';

// html Component
import Header from '../Header'
import Body from '../Body'
import Footer from '../Footer'


// 函数名首字母大写
const App = () =>{
  return(
  	<div className={styles.container}>
    	<Header></Header>
      <Body></Body>    
      <Footer></Footer>
    </div>
  )
}

export default App;
