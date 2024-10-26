import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampers } from '../../store/camperSlice';
import styles from './FilterSidebar.module.css';

const FilterSidebar = ({ onFilter }) => {
    const dispatch = useDispatch();

    const { savedFilters } = useSelector((state) => state.campers);

    const [location, setLocation] = useState(savedFilters?.location || '');
    const [filters, setFilters] = useState({
        AC: savedFilters?.filters?.AC || false,
        Automatic: savedFilters?.filters?.Automatic || false,
        Kitchen: savedFilters?.filters?.Kitchen || false,
        TV: savedFilters?.filters?.TV || false,
        Bathroom: savedFilters?.filters?.Bathroom || false,
        Refrigerator: savedFilters?.filters?.Refrigerator || false,
    });
    const [vehicleType, setVehicleType] = useState({
        Van: savedFilters?.vehicleType?.Van || false,
        FullyIntegrated: savedFilters?.vehicleType?.FullyIntegrated || false,
        Alcove: savedFilters?.vehicleType?.Alcove || false,
    });

    const handleLocationChange = (e) => setLocation(e.target.value);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.checked });
    };

    const handleVehicleTypeChange = (e) => {
        setVehicleType({ ...vehicleType, [e.target.name]: e.target.checked });
    };

    const handleSearch = () => {
        const filterData = { location, filters, vehicleType };
        dispatch(fetchCampers({ page: 1, filters: filterData }));
        if (onFilter) onFilter(filterData);
    };

    const filterIcons = {
        AC: 'icon-ac',
        Automatic: 'icon-automatic',
        Kitchen: 'icon-kitchen',
        TV: 'icon-tv',
        Bathroom: 'icon-bathroom',
        Refrigerator: 'icon-solar_fridge-outline',
    };

    const vehicleTypeIcons = {
        Van: 'icon-van',
        FullyIntegrated: 'icon-integrated',
        Alcove: 'icon-alcove',
    };

    return (
        <div className={styles.filterSidebar}>
            <h3>Location</h3>
            <div className={styles.locationWrapper}>
                <svg className={styles.icon}>
                    <use href="/images/icons.svg#icon-map"></use>
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
            <hr className={styles.line}/>
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
                        <svg className={styles.icon}>
                            <use href={`/images/icons.svg#${filterIcons[filter]}`}></use>
                        </svg>
                        {filter}
                    </label>
                ))}
            </div>

            <h3>Vehicle type</h3>
            <hr className={styles.line}/>
            <div className={styles.filterGrid}>
                {Object.keys(vehicleType).map((type) => (
                    <label
                        key={type}
                        data-name={type} // New attribute added
                        className={`${styles.filterItem} ${vehicleType[type] ? styles.selected : ''}`}
                    >
                        <input
                            type="checkbox"
                            name={type}
                            checked={vehicleType[type]}
                            onChange={handleVehicleTypeChange}
                            className={styles.checkbox}
                        />
                        <svg className={styles.icon}>
                            <use href={`/images/icons.svg#${vehicleTypeIcons[type]}`}></use>
                        </svg>
                        <span>{type === 'FullyIntegrated' ? 'Fully Integrated' : type}</span> {/* Updated for line break */}
                    </label>
                ))}
            </div>

            <button className={styles.searchButton} onClick={handleSearch}>Search</button>
        </div>
    );
};

export default FilterSidebar;
