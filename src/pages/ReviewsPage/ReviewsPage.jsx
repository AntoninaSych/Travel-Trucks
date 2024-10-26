import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ReviewsPage.module.css';

const ReviewsPage = () => {
    const { selectedCamper } = useSelector((state) => state.campers);
    const reviews = selectedCamper?.reviews || []; // Fallback to empty array if reviews is undefined

    return (
        <div className={styles.reviewsContainer}>
            <h2>Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className={styles.review}>
                        <div className={styles.reviewerInfo}>
                            <span className={styles.reviewerName}>{review.name}</span>
                            <span className={styles.reviewerRating}>
                                {Array(review.rating).fill('⭐')}
                            </span>
                        </div>
                        <p className={styles.reviewText}>{review.comment}</p>
                    </div>
                ))
            ) : (
                <p>No reviews available for this camper.</p>
            )}
        </div>
    );
};

export default ReviewsPage;
