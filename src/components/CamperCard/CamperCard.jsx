import { Link } from 'react-router-dom';
import styles from './CamperCard.module.css';

const CamperCard = ({ camper }) => {
    const equipmentIcons = {
        AC: 'icon-ac',
        Automatic: 'icon-automatic',
        Kitchen: 'icon-kitchen',
        TV: 'icon-tv',
        Bathroom: 'icon-bathroom',
        Refrigerator: 'icon-solar-fridge',
        Microwave: 'icon-lucide-microwave',
        Gas: 'icon-gas-stove',
        Water: 'icon-water',
    };

    const renderEquipmentIcons = () => {
        return Object.keys(equipmentIcons)
            .filter((key) => camper[key.toLowerCase()])
            .map((key) => (
                <div key={key} className={styles.equipmentIcon}>
                    <svg className={styles.icon}>
                        <use href={`../../public/images/icons.svg#${equipmentIcons[key]}`}></use>
                    </svg>
                    {key}
                </div>
            ));
    };

    return (
        <div className={styles.camperCard}>
            <img src={camper.gallery[0].thumb} alt={camper.name} className={styles.camperImage} />
            <div className={styles.camperInfo}>
                <h2 className={styles.camperName}>{camper.name}</h2>
                <p className={styles.camperLocation}>{camper.location}</p>
                <div className={styles.camperEquipment}>
                    {renderEquipmentIcons()}
                </div>
                <p className={styles.camperPrice}>€{camper.price.toLocaleString()}</p>
                <Link to={`/catalog/${camper.id}`}>
                    <button className={styles.showMoreButton}>Show more</button>
                </Link>
            </div>
        </div>
    );
};

export default CamperCard;
