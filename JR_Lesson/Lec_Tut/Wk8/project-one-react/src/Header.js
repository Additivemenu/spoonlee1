import './Header.css'
import Logo from './Logo'
import Nav from './Nav'

// 函数名首字母大写
const Header = () => {
    return(
        <div className="header">
            <Logo></Logo>
            <Nav></Nav>
      </div>
    )
}
  
export default Header