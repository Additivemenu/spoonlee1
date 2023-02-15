
import Cover from './components/Cover';
import Footer from './components/Footer';
import Title from './components/Title';
import styles from './ReviewCard.module.css'

const ReviewCard = () =>{

    return (
        <div className={styles.container}>
            <Cover/>
            <Title/>
            <Footer/>

        
        </div>
    );

};


export default ReviewCard;