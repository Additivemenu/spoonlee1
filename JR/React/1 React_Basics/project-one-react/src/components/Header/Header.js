import styles from './Header.module.css'           // import everything from Header.css into an object: styles
import Logo from './components/Logo'
import Nav from './components/Nav'

// 函数名首字母大写
const Header = ({
    currentPage,
    onNavItemClick
}) => {
    return(
        //!!注意这里我们是直接用styles object的container属性来为className赋值 !!
        <div className={styles.container}>
                <Logo></Logo>
                <Nav currentPage={currentPage} onNavItemClick={onNavItemClick}></Nav>
         </div>
    )
}
  
export default Header