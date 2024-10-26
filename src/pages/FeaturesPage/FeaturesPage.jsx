import React from 'react';
import { useSelector } from 'react-redux';
import styles from './FeaturesPage.module.css';

// Define icon mapping for equipment
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

// Function to render equipment icons based on selected camper's features
const renderEquipmentIcons = (camper) => {
    if (!camper) {
        console.log("No camper data available to render icons.");
        return <p>No equipment available.</p>;
    }

    console.log("Rendering equipment icons for camper:", camper);

    return Object.keys(equipmentIcons)
        .filter((key) => camper[key.toLowerCase()]) // Проверка свойств в объекте camper
        .map((key) => {
            const iconPath = `/images/icons.svg#${equipmentIcons[key]}`;
            console.log(`Rendering icon: ${key}, path: ${iconPath}`);

            return (
                <div key={key} className={styles.featureItem}>
                    <svg className={styles.icon}>
                        <use href={iconPath}></use>
                    </svg>
                    {key}
                </div>
            );
        });
};

const FeaturesPage = () => {
    const { selectedCamper } = useSelector((state) => state.campers);

    // Проверка данных selectedCamper
    console.log("Selected Camper:", selectedCamper);

    if (!selectedCamper) {
        return <div>No features available for this camper.</div>;
    }

    return (
        <div className={styles.featuresContainer}>
            {/* Render equipment icons */}
            <div className={styles.equipment}>
                {renderEquipmentIcons(selectedCamper)}
            </div>

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
