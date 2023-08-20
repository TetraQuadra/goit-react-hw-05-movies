import React from 'react';
import PropTypes from 'prop-types';
import styles from './MovieInfo.module.css';

const MovieInfo = ({ movie }) => {
    const defaultImg = 'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

    return (
        <div className={styles.movieContainer}>
            <div className={styles.moviePoster}>
                <img src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : defaultImg} alt={movie.title} />
            </div>
            <div className={styles.movieDetails}>
                <h2 className={styles.movieTitle}>{movie.title}</h2>
                <p className={styles.movieOverview}>{movie.overview}</p>
                <p className={styles.movieInfo}>Release Date: {movie.release_date}</p>
                <p className={styles.movieInfo}>Runtime: {movie.runtime} minutes</p>
                <p className={styles.movieInfo}>Rating: {movie.vote_average}</p>
            </div>
        </div>
    );
};

MovieInfo.propTypes = {
    movie: PropTypes.object.isRequired,
};

export default MovieInfo;
