import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CamperCard from '../../components/CamperCard/CamperCard';
import FilterSidebar from '../../components/FilterSidebar/FilterSidebar';
import { fetchCampers, loadMore } from '../../store/camperSlice';
import styles from './CatalogPage.module.css';

const CatalogPage = () => {
    const dispatch = useDispatch();
    const { campers, status, error, page } = useSelector((state) => state.campers);

    useEffect(() => {
        dispatch(fetchCampers(page));
    }, [dispatch, page]);

    const handleLoadMore = () => {
        dispatch(loadMore());
        dispatch(fetchCampers(page + 1)); // Завантажуємо нову сторінку
    };

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>; // Відображаємо помилку

    return (
        <div className={styles.catalogPage}>
            <FilterSidebar onFilter={() => {}} />
            <div className={styles.camperList}>
                {campers.map((camper) => (
                    <CamperCard key={camper.id} camper={camper} />
                ))}
            </div>
            <button className={styles.loadMoreButton} onClick={handleLoadMore}>
                Load More
            </button>
        </div>
    );
};

export default CatalogPage;
