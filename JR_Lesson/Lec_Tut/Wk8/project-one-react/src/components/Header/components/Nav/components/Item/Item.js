import './Item.css'
import classNames from 'classnames'



// we just destruct property object in function argument
// onClick作为函数argument传递进入Item这个函数
const Item = ({href, children, active, onClick}) =>{

    //const [active, setActive] = useState(false);

    const handleClick = (event) => {
        // SPA, 我们不需要页面跳转
        event.preventDefault();
        onClick();              // !!! ******改动在这里!! 执行onClick()里的代码****** !!!
        // console.log('HERE');
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