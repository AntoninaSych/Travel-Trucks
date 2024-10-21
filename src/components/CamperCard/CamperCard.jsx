import { Link } from 'react-router-dom';
import styles from './CamperCard.module.css';

const CamperCard = ({ camper }) => {
    return (
        <div className={styles.camperCard}>
            <img src={camper.gallery[0].thumb} alt={camper.name} className={styles.camperImage} />
            <div className={styles.camperInfo}>
                <h2 className={styles.camperName}>{camper.name}</h2>
                <p>{camper.location}</p>
                <p className={styles.camperPrice}>€{camper.price.toLocaleString()}</p>
                <Link to={`/catalog/${camper.id}`}>
                    <button className={styles.showMoreButton}>Show more</button>
                </Link>
            </div>
        </div>
    );
};

export default CamperCard;
