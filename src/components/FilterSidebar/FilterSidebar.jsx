import { useState } from 'react';
import styles from './FilterSidebar.module.css';

const FilterSidebar = ({ onFilter }) => {
    const [location, setLocation] = useState('');
    const [filters, setFilters] = useState({
        AC: false,
        kitchen: false,
        bathroom: false,
    });

    const handleLocationChange = (e) => setLocation(e.target.value);
    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.checked });
    };

    const handleSearch = () => {
        onFilter({ location, filters });
    };

    return (
        <div className={styles.filterSidebar}>
            <h3>Location</h3>
            <input
                type="text"
                value={location}
                onChange={handleLocationChange}
                placeholder="Enter location"
                className={styles.inputField}
            />

            <h3>Vehicle equipment</h3>
            <label>
                <input
                    type="checkbox"
                    name="AC"
                    checked={filters.AC}
                    onChange={handleFilterChange}
                /> AC
            </label>
            <label>
                <input
                    type="checkbox"
                    name="kitchen"
                    checked={filters.kitchen}
                    onChange={handleFilterChange}
                /> Kitchen
            </label>
            <label>
                <input
                    type="checkbox"
                    name="bathroom"
                    checked={filters.bathroom}
                    onChange={handleFilterChange}
                /> Bathroom
            </label>

            <button className={styles.searchButton} onClick={handleSearch}>Search</button>
        </div>
    );
};

export default FilterSidebar;
