import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
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

    // State for managing favorites
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const favoriteCampers = JSON.parse(localStorage.getItem('favoriteCampers')) || [];
        setIsFavorite(favoriteCampers.includes(camper.id));
    }, [camper.id]);

    const handleFavoriteToggle = () => {
        const favoriteCampers = JSON.parse(localStorage.getItem('favoriteCampers')) || [];
        if (isFavorite) {
            const updatedFavorites = favoriteCampers.filter(id => id !== camper.id);
            localStorage.setItem('favoriteCampers', JSON.stringify(updatedFavorites));
            setIsFavorite(false);
        } else {
            favoriteCampers.push(camper.id);
            localStorage.setItem('favoriteCampers', JSON.stringify(favoriteCampers));
            setIsFavorite(true);
        }
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

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    return (
        <div className={styles.camperCard}>
            <div className={styles.topRight}>
                <p className={styles.camperPrice}>€{camper.price.toLocaleString()}</p>
                <button onClick={handleFavoriteToggle} className={styles.favoriteButton}>
                    <svg className={isFavorite ? styles.heartFilled : styles.heartOutline}>
                        <use href={`../../public/images/icons.svg#icon-heart`}></use>
                    </svg>
                </button>
            </div>
            <img src={camper.gallery[0].thumb} alt={camper.name} className={styles.camperImage} />
            <div className={styles.camperInfo}>
                <h2 className={styles.camperName}>{camper.name}</h2>
                <div className={styles.camperReview}>
                    <span className={styles.starRating}>
                        <svg className={styles.icon}>
                            <use href={`../../public/images/icons.svg#icon-star`}></use>
                        </svg>
                        <span className={styles.textRating}>
                            {camper.rating} ({camper.review} Reviews)
                        </span>
                        <span className={styles.camperLocation}>
                            <svg className={styles.iconMap}>
                                <use href="../../public/images/icons.svg#icon-map"></use>
                            </svg>
                            {camper.location}</span>
                    </span>
                </div>


                <div className={styles.camperEquipment}>
                {renderEquipmentIcons()}
                </div>
                <p className={styles.camperDescription}>{truncateText(camper.description, 50)}</p>
                <Link to={`/catalog/${camper.id}`}>
                    <button className={styles.showMoreButton}>Show more</button>
                </Link>
            </div>
        </div>
    );
};

export default CamperCard;
