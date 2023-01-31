import './NavItem.css'
import classNames from 'classnames'

// conditional class name
const getClassName = (href) => {
    if(href === '/home'){
        return 'nav__item nav__item--active'
    }
    return 'nav__item'
}


// we just destruct property object in function argument
const NavItem = ({href, children}) =>{
    return (
        <a href={href} className={getClassName(href)}>
            {children}
        </a>
    )

}

export default NavItem