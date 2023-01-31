import './Nav.css'
import NavItem from './NavItem'


const Nav = () => {
    return (
        <nav className="nav">
            {/* Copy paste a lot */}
            <NavItem href="/home">Home</NavItem>
            <NavItem href="/resume">Resume</NavItem>
            <NavItem href="/blog">Blog</NavItem>
            <NavItem href="/services">ervices</NavItem>
            <NavItem href="/contacts">Contacts</NavItem>
        </nav>
    )
}


NavItem();

export default Nav;