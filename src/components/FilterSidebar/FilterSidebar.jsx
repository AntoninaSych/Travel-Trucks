import { useState } from 'react';
import styles from './FilterSidebar.module.css';


const FilterSidebar = ({ onFilter }) => {
    const [location, setLocation] = useState('');
    const [filters, setFilters] = useState({
        AC: false,
        Automatic: false,
        Kitchen: false,
        TV: false,
        Bathroom: false,
    });

    const [vehicleType, setVehicleType] = useState({
        Van: false,
        FullyIntegrated: false,
        Alcove: false,
    });

    const handleLocationChange = (e) => setLocation(e.target.value);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.checked });
    };

    const handleVehicleTypeChange = (e) => {
        setVehicleType({ ...vehicleType, [e.target.name]: e.target.checked });
    };

    const handleSearch = () => {
        onFilter({ location, filters, vehicleType });
    };

    return (
        <div className={styles.filterSidebar}>
            <h3>Location</h3>
            <div className={styles.locationWrapper}>
                <svg className={styles.icon}>
                    <use href="../../assets/images/icons.svg#icon-map"></use>
                </svg>
                <input
                    type="text"
                    value={location}
                    onChange={handleLocationChange}
                    placeholder="Kyiv, Ukraine"
                    className={styles.inputFieldWithIcon}
                />
            </div>

            <h3>Vehicle equipment</h3>
            <div className={styles.filterGrid}>
                {Object.keys(filters).map((filter) => (
                    <label key={filter} className={`${styles.filterItem} ${filters[filter] ? styles.selected : ''}`}>
                        <input
                            type="checkbox"
                            name={filter}
                            checked={filters[filter]}
                            onChange={handleFilterChange}
                            className={styles.checkbox}
                        />
                        {filter}
                    </label>
                ))}
            </div>

            <h3>Vehicle type</h3>
            <div className={styles.filterGrid}>
                {Object.keys(vehicleType).map((type) => (
                    <label key={type} className={`${styles.filterItem} ${vehicleType[type] ? styles.selected : ''}`}>
                        <input
                            type="checkbox"
                            name={type}
                            checked={vehicleType[type]}
                            onChange={handleVehicleTypeChange}
                            className={styles.checkbox}
                        />
                        {type}
                    </label>
                ))}
            </div>

            <button className={styles.searchButton} onClick={handleSearch}>Search</button>
        </div>
    );
};

export default FilterSidebar;
