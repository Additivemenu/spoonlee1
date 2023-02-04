import Home from "./components/Home"
import Resume from "./components/Resume"
import Services from "./components/Services"
import Blog from "./components/Blog"
import Contact from "./components/Contact/Contact"
import styles from './Body.module.css'


// 参数传递问题
// - APP
//   - Header
//        - Logo
//        - Nav {active}
//   - Body  {active} 
//        - Blog
//        - Contact
//   - Footer


// 函数名首字母大写
const Body = ({
    currentPage
}) => {
    return(
        <div className={styles.container}>
            {currentPage === '/home' && <Home></Home>}
            {currentPage === '/resume' && <Resume></Resume>}
            {currentPage === '/services' && <Services></Services>}
            {currentPage === '/blog' && <Blog></Blog>}
            {currentPage === '/contact' && <Contact></Contact>}

            {/* <Home active= {currentPage === '/home'}></Home>
            <Resume active= {currentPage === '/resume'}></Resume>
            <Services active= {currentPage === '/services'}></Services>
            <Blog active= {currentPage === '/blog'}></Blog>
            <Contact active= {currentPage === '/contact'}></Contact> */}
        </div>

    )
}
  
export default Body