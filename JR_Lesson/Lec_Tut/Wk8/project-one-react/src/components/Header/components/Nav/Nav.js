import styles from './Nav.module.css'
import Item from './components/Item'
import { useState } from 'react';


const ITEMS = [
    {href: '/home', value: 'HOME'},
    {href: '/resume', value: 'Resume'},
    {href: 'service', value: 'Services'},
    {href: '/blog', value: 'Blog'},
    {href: 'contact', value: 'Contact'}
]

const Nav = () => {

    // flag is a String, setFlag(String), !!用来代表点击NavItem的状态信息!!
    const [flag, setFlag] = useState('/home')     // active is a variable, setActive is a function

    return (
        <nav className={styles.container}>

            {/* 减少copy, passte, 和下面的代码等效, 写法比较高级 map(), destruct, HTML标签的props传递综合在一起 */}
            {ITEMS.map(({href, value}) => (
                <Item 
                    href={href} 
                    active={flag=== href} 
                    onClick={() => setFlag(href)} // !!! *****改动在这里, 代表一个函数变量, 将会把一段代码（操作）传入到Item函数里****** !!!
                >
                    {value}
                </Item>
            ))}

            {/* refactor: use function */}
            {/* 注意这里html标签里的property的赋值, 等号右边是花括号括起来的 */}
            {/* 注意html标签的props.active为boolean, */}
            {/* <Item href="/home" active={flag === 'HOME'} setActive={() => setFlag('HOME')}>Home</Item>
            <Item href="/resume" active={flag === 'RESUME'} setActive={() => setFlag('RESUME')}>Resume</Item>
            <Item href="/blog" active={flag === 'BLOG'} setActive={() => setFlag('BLOG')}>Blog</Item>
            <Item href="/services" active={flag === 'SERVICES'} setActive={() => setFlag('SERVICES')}>Services</Item>
            <Item href="/contacts" active={flag=== 'CONTACTS'} setActive={() => setFlag('CONTACTS')}>Contacts</Item> */}
        </nav>
    )
}

export default Nav;