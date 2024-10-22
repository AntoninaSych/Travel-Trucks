import { Link } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
    return (
        <div>
            <div className={styles.banner}>
                <div className={styles.overlay}></div>
                <div className={styles.bannerContent}>
                    <h1>Campers of your dreams</h1>
                    <h2>You can find everything you want in our catalog</h2>
                    <Link to="/catalog">
                        <button className={styles.viewButton}>View Now</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
