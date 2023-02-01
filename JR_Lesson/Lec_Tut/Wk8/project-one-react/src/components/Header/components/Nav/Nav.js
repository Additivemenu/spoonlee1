import styles from './Nav.module.css'
import Item from './components/Item'
import { useState } from 'react';

const Nav = () => {

    // active is a String, setActive(String)
    const [active, setActive] = useState('HOME')     // active is a variable, setActive is a function

    return (
        <nav className={styles.container}>

            {/* refactor: use function */}
            {/* 注意这里html标签里的property的赋值, 等号右边是花括号括起来的 */}
            {/* 注意html标签的props.active为boolean, */}
            <Item href="/home" active={active === 'HOME'} setActive={() => setActive('HOME')}>Home</Item>
            <Item href="/resume" active={active === 'RESUME'} setActive={() => setActive('RESUME')}>Resume</Item>
            <Item href="/blog" active={active === 'BLOG'} setActive={() => setActive('BLOG')}>Blog</Item>
            <Item href="/services" active={active === 'SERVICES'} setActive={() => setActive('SERVICES')}>Services</Item>
            <Item href="/contacts" active={active === 'CONTACTS'} setActive={() => setActive('CONTACTS')}>Contacts</Item>
        </nav>
    )
}

export default Nav;