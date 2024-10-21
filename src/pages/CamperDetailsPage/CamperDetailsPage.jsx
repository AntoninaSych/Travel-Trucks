import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCamperDetails } from '../../store/camperSlice';
import BookingForm from '../../components/BookingForm/BookingForm'; // Проверьте, что путь правильный
import styles from './CamperDetailsPage.module.css';

const CamperDetailsPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedCamper, status, error } = useSelector((state) => state.campers);

    useEffect(() => {
        dispatch(fetchCamperDetails(id));
    }, [dispatch, id]);

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>; // Відображаємо помилку

    if (!selectedCamper) return <div>Camper not found</div>;

    return (
        <div className={styles.detailsContainer}>
            <h1 className={styles.camperTitle}>{selectedCamper.name}</h1>
            <div className={styles.gallery}>
                {selectedCamper.gallery.map((img) => (
                    <img key={img.original} src={img.thumb} alt={selectedCamper.name} />
                ))}
            </div>
            <p className={styles.camperDescription}>{selectedCamper.description}</p>

            <BookingForm />
        </div>
    );
};

export default CamperDetailsPage;
