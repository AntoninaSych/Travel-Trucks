// src/pages/CatalogPage/CatalogPage.jsx
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
        dispatch(fetchCampers({ page: 1, filters: currentFilters }));
    }, [dispatch, currentFilters]);

    const handleFilter = (filterData) => {
        setCurrentFilters(filterData);
        dispatch(fetchCampers({ page: 1, filters: filterData }));
    };

    const handleLoadMore = () => {
        dispatch(loadMore());
        dispatch(fetchCampers({ page: page + 1, filters: currentFilters }));
    };

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return (
        <div className={styles.catalogPage}>
            <FilterSidebar onFilter={handleFilter} />
            <div className={styles.camperList}>
                {campers.length > 0 ? (
                    campers.map((camper) => (
                        <CamperCard key={camper.id} camper={camper} />
                    ))
                ) : (
                    <p>No campers found for the selected filter.</p>
                )}
            </div>
            <button className={styles.loadMoreButton} onClick={handleLoadMore}>
                Load More
            </button>
        </div>
    );
};

export default CatalogPage;
