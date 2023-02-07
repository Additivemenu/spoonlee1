import styles from './Logo.module.css'

const Logo = () =>{
    return(
        <div className={styles.container}>
            <span className={styles.highlight}>Tifa</span>
            Lockhart
        </div>
    )
}

export default Logo;