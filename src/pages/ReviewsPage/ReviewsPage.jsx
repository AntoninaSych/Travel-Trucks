import React from 'react';
import { useSelector } from 'react-redux';
import styles from './ReviewsPage.module.css';

const ReviewsPage = () => {
    const { selectedCamper } = useSelector((state) => state.campers);
    const reviews = selectedCamper?.reviews || []; // Если отзывы отсутствуют, используем пустой массив

    return (
        <div className={styles.reviewsContainer}>
            <h2>Reviews</h2>
            {reviews.length > 0 ? (
                reviews.map((review, index) => (
                    <div key={index} className={styles.review}>
                        <div className={styles.header}>
                            <div className={styles.avatar}>
                                {review.reviewer_name ? review.reviewer_name.charAt(0) : "?"}
                            </div>
                            <div>
                                <span className={styles.author}>{review.reviewer_name || "Unknown"}</span>
                                <div className={styles.rating}>
                                    {Array.from({ length: review.reviewer_rating }).map((_, i) => (
                                        <svg key={i} className={styles.icon}>
                                            <use href={`/images/icons.svg#icon-star`}></use>
                                        </svg>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <p className={styles.text}>{review.comment}</p>
                    </div>
                ))
            ) : (
                <p>No reviews available for this camper.</p>
            )}
        </div>
    );
};

export default ReviewsPage;
