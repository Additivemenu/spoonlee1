import './Item.css'
import classNames from 'classnames'
import { useState } from 'react';


// we just destruct property object in function argument
const Item = ({href, children, active, setActive}) =>{

    //const [active, setActive] = useState(false);

    const handleClick = (event) => {
        // SPA, 我们不需要页面跳转
        event.preventDefault();
        setActive(!active);
        console.log('HERE');
    }

    return (
        <a 
        href = {href} 
        onClick = {handleClick}             // declarative: do something when this tag is onClick
        className={classNames('nav__item', {
            'nav__item--active': active})}> 
            {children}
        </a>
    )

}

export default Item