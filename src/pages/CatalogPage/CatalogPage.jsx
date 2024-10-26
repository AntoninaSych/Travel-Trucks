import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CamperCard from '../../components/CamperCard/CamperCard';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import { fetchCampers, loadMore } from '../../store/camperSlice';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
    const dispatch = useDispatch();
    const { campers, status, error, page } = useSelector((state) => state.campers);
    const [currentFilters, setCurrentFilters] = useState({});

    useEffect(() => {
        // Fetch campers on page load and whenever filters change
        dispatch(fetchCampers({ page: 1, filters: currentFilters }));
    }, [dispatch, currentFilters]);

    const handleFilter = (filterData) => {
        // Set current filters and fetch campers based on new filters
        setCurrentFilters(filterData);
        dispatch(fetchCampers({ page: 1, filters: filterData }));
    };

    const handleLoadMore = () => {
        dispatch(loadMore());
        dispatch(fetchCampers({ page: page + 1, filters: currentFilters }));
    };

    return (
        <div className={styles.catalogPage}>
            <FilterSidebar onFilter={handleFilter} />
            <div className={styles.camperContainer}>
                <div className={styles.camperList}>
                    {status === 'loading' && <p>Loading campers...</p>}
                    {status === 'failed' && (
                        <p className={styles.noResults}>No results match your search.</p>
                    )}
                    {status === 'succeeded' && campers.length === 0 && (
                        <p className={styles.noResults}>No campers found for the selected filters.</p>
                    )}
                    {status === 'succeeded' && campers.length > 0 && campers.map((camper) => (
                        <CamperCard key={camper.id} camper={camper} />
                    ))}
                </div>
                {status === 'succeeded' && campers.length > 0 && (
                    <button className={styles.loadMoreButton} onClick={handleLoadMore}>
                        Load More
                    </button>
                )}
            </div>
        </div>
    );
};

export default CatalogPage;
