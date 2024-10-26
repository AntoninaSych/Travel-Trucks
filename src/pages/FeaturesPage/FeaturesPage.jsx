import React from 'react';
import { useSelector } from 'react-redux';
import styles from './FeaturesPage.module.css';

const FeaturesPage = () => {
    const { selectedCamper } = useSelector((state) => state.campers);

    if (!selectedCamper) {
        return <div>No features available for this camper.</div>;
    }

    // Define icon mapping for equipment
    const equipmentIcons = {
        AC: 'icon-ac',
        Automatic: 'icon-automatic',
        Kitchen: 'icon-kitchen',
        Petrol: 'icon-petrol',
        Radio: 'icon-radio',
    };

    const renderEquipmentIcons = () => {
        return Object.keys(equipmentIcons)
            .filter((key) => selectedCamper.features.includes(key))
            .map((key, index) => (
                <div key={index} className={styles.featureItem}>
                    <svg className={styles.icon}>
                        <use href={`../../public/images/icons.svg#${equipmentIcons[key]}`}></use>
                    </svg>
                    {key}
                </div>
            ));
    };

    return (
        <div className={styles.featuresContainer}>
            <div className={styles.equipment}>{renderEquipmentIcons()}</div>

            <div className={styles.details}>
                <h3>Vehicle details</h3>
                <div className={styles.detailRow}>
                    <p>Form:</p>
                    <p>{selectedCamper.form}</p>
                </div>
                <div className={styles.detailRow}>
                    <p>Length:</p>
                    <p>{selectedCamper.length} m</p>
                </div>
                <div className={styles.detailRow}>
                    <p>Width:</p>
                    <p>{selectedCamper.width} m</p>
                </div>
                <div className={styles.detailRow}>
                    <p>Height:</p>
                    <p>{selectedCamper.height} m</p>
                </div>
                <div className={styles.detailRow}>
                    <p>Tank:</p>
                    <p>{selectedCamper.tank} l</p>
                </div>
                <div className={styles.detailRow}>
                    <p>Consumption:</p>
                    <p>{selectedCamper.consumption} l/100km</p>
                </div>
            </div>
        </div>
    );
};

export default FeaturesPage;
