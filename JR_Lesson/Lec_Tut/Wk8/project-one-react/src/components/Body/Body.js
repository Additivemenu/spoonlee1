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
    active
}) => {
    return(
        <div className={styles.container}>
            <Home active= {active === '/home'}></Home>
            <Resume active= {active === '/resume'}></Resume>
            <Services active= {active === '/services'}></Services>
            <Blog active= {active === '/blog'}></Blog>
            <Contact active= {active === '/contact'}></Contact>
        </div>

    )
}
  
export default Body