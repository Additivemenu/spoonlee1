import ReviewCard from "./components/ReviewCard"

import styles from './PopularReviews.module.css';


const PopularReviews = () =>{
    return (
        <div className={styles.container}>
            <ReviewCard/>
            <ReviewCard/>
            <ReviewCard/>
        </div>
    )
        
}

export default PopularReviews;