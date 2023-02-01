import Home from "./components/Home"
import styles from './Body.module.css'

// 函数名首字母大写
const Body = () => {
    return(
        <div className={styles.container}>
            <Home></Home>
        </div>

    )
}
  
export default Body