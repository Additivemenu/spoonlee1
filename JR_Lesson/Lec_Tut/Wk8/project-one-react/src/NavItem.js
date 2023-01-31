import './NavItem.css'

// we just destruct property object in function argument
const NavItem = ({href, children}) =>{
    return (
        <a href={href} className="nav__item">{children}</a>
    )

}

export default NavItem