// import styles from './Page.module.css'  // ! why Page.module.css not working? !
import "./Page.css"      // ! 只用classNames(), 不用css module的写法 !

import classNames from 'classnames'     // for conditional class name

// const cx = classNames.bind(styles)

// Page is like a mold, it is used to instantiate a page instance: home, service, contact....
// ! 注意这里的props.active的值是boolean
const Page = (
    {children,
    active}
) => {

    return (
        <div 
            // className={ cx('container', {'active': active}) }           // !conditional className this works well !

            className={classNames("container", {"active": active})} // ! 只用classNames(), 不用css module的写法 !
        >
            {children}
        </div>
     
    )
}

export default Page