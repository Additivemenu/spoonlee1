import NewsCard from "./components/NewsCard";

import styles from './TrendingNews.module.css'

const TrendingNews = () =>{

    return (
        <div className={styles.container}>
            <NewsCard/>
            <NewsCard/>
            <NewsCard/>
        </div>
        
    )
}


export default TrendingNews;