import styles from './Nav.module.css'
import Item from './components/Item'
import { useState } from 'react';

const Nav = () => {

    // active is a String, setActive(String)
    const [flag, setFlag] = useState('HOME')     // active is a variable, setActive is a function

    return (
        <nav className={styles.container}>

            {/* refactor: use function */}
            {/* 注意这里html标签里的property的赋值, 等号右边是花括号括起来的 */}
            {/* 注意html标签的props.active为boolean, */}
            <Item href="/home" active={flag === 'HOME'} setActive={() => setFlag('HOME')}>Home</Item>
            <Item href="/resume" active={flag === 'RESUME'} setActive={() => setFlag('RESUME')}>Resume</Item>
            <Item href="/blog" active={flag === 'BLOG'} setActive={() => setFlag('BLOG')}>Blog</Item>
            <Item href="/services" active={flag === 'SERVICES'} setActive={() => setFlag('SERVICES')}>Services</Item>
            <Item href="/contacts" active={flag=== 'CONTACTS'} setActive={() => setFlag('CONTACTS')}>Contacts</Item>
        </nav>
    )
}

export default Nav;