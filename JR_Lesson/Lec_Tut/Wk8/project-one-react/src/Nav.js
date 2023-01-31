import './Nav.css'
import NavItem from './NavItem'

const Nav = () => {
    return (
        <nav className="nav">
            {/* Copy paste a lot */}
            {/* <a href="/home" className='nav__item nav__item--active'>Home</a>
            <a href="/resume" className='nav__item'>Resume</a>
            <a href="/blog" className='nav__item'>Blog</a>
            <a href="/services" className='nav__item'>Service</a>
            <a href="/contacts" className='nav__item'>Contacts</a> */}

            {/* refactor: use function */}
            <NavItem href="/home">Home</NavItem>
            <NavItem href="/resume">Resume</NavItem>
            <NavItem href="/blog">Blog</NavItem>
            <NavItem href="/services">Services</NavItem>
            <NavItem href="/contacts">Contacts</NavItem>
        </nav>
    )
}

export default Nav;