import { useEffect } from 'react';
import { useParams, NavLink, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperDetails } from '../../store/camperSlice';
import BookingForm from '../../components/BookingForm/BookingForm';
import styles from './CamperDetailsPage.module.css';

const CamperDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedCamper, status, error } = useSelector((state) => state.campers);

    useEffect(() => {
        dispatch(fetchCamperDetails(id));
    }, [dispatch, id]);

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;
    if (!selectedCamper) return <div>Camper not found</div>;

    return (
        <div className={styles.detailsContainer}>
            {/* Title, Rating, and Location */}
            <h1 className={styles.camperTitle}>{selectedCamper.name}</h1>
            <div className={styles.infoRow}>
                <div className={styles.ratingLocation}>
                    <span className={styles.rating}>{selectedCamper.rating} ({selectedCamper.reviewsCount} Reviews)</span>
                    <span className={styles.location}>{selectedCamper.location}</span>
                </div>
                <div className={styles.price}>€{selectedCamper.price}</div>
            </div>

            {/* Gallery */}
            <div className={styles.gallery}>
                {selectedCamper.gallery.map((img) => (
                    <img key={img.original} src={img.thumb} alt={selectedCamper.name} />
                ))}
            </div>
            <p className={styles.camperDescription}>{selectedCamper.description}</p>

            {/* Tab Links for Features and Reviews */}
            <div className={styles.tabs}>
                <NavLink to="features" className={({ isActive }) => isActive ? styles.activeTab : styles.tabLink}>
                    Features
                </NavLink>
                <NavLink to="reviews" className={({ isActive }) => isActive ? styles.activeTab : styles.tabLink}>
                    Reviews
                </NavLink>
            </div>

            {/* Nested Route Outlet */}
            <Outlet />

            {/* Booking Form */}
            <div className={styles.bookingSection}>
                <BookingForm />
            </div>
        </div>
    );
};

export default CamperDetailsPage;
