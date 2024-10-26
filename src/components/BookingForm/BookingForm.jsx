import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './BookingForm.module.css';

const BookingForm = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className={styles.bookingForm}>
            <h3>Book your campervan now</h3>
            <p>Stay connected! We are always ready to help you.</p>
            <form>
                <input type="text" placeholder="Name*" required />
                <input type="email" placeholder="Email*" required />
                <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    placeholderText="Booking date*"
                    className={styles.datePicker}
                />
                <textarea placeholder="Comment" />
                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default BookingForm;
