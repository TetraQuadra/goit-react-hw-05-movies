import React from 'react';
import styles from './Reviews.module.css';
import PropTypes from 'prop-types';

Reviews.propTypes = {
    cast: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
};

function Reviews({ reviews }) {
    const defaultAvatar = 'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

    return (
        <div className={styles.reviewsContainer}>
            <h2 className={styles.sectionTitle}>Reviews</h2>
            <div className={styles.reviewsList}>
                {reviews.map(review => (
                    <div className={styles.reviewCard} key={review.id}>
                        <div className={styles.reviewHeader}>
                            {review.author_details.avatar_path ? (
                                <img
                                    className={styles.authorAvatar}
                                    src={`https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`}
                                    alt={`Avatar of ${review.author}`}
                                />
                            ) : (
                                <img
                                    className={styles.defaultAvatar}
                                    src={defaultAvatar}
                                    alt="Default Avatar"
                                />
                            )}
                            <p className={styles.authorName}>{review.author}</p>
                        </div>
                        <div className={styles.reviewContent}>
                            <p className={styles.reviewText}>{review.content}</p>
                            <p className={styles.reviewDate}>Posted on: {review.created_at}</p>
                            <a className={styles.reviewLink} href={review.url} target="_blank" rel="noopener noreferrer">
                                Read more
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Reviews;
