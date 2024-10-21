import { useState } from 'react';
import styles from './BookingForm.module.css';

const BookingForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        bookingDate: '',
        comment: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Booking submitted:', formData);
        // Тут можно добавить обработку отправки данных на сервер
    };

    return (
        <form className={styles.bookingForm} onSubmit={handleSubmit}>
            <h3>Book your campervan now</h3>
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                required
            />
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="date"
                name="bookingDate"
                value={formData.bookingDate}
                onChange={handleChange}
                required
            />
            <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                placeholder="Comment"
            />
            <button type="submit" className={styles.bookingButton}>Send</button>
        </form>
    );
};

export default BookingForm;
