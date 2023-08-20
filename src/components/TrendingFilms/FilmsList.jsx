import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import Loader from 'components/Loader/Loader';
import styles from './FilmsList.module.css';

FilmsList.propTypes = {
    cast: PropTypes.arrayOf(
        PropTypes.object
    ).isRequired,
    title: PropTypes.string.isRequired,
}

function FilmsList({ movies, title }) {

    const [isLoading, setIsLoading] = useState(true);
    const defaultImg = 'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';
    const location = useLocation()

    useEffect(() => {
        const imageElements = document.querySelectorAll("img");
        let imagesLoaded = 0;
        const handleImageLoad = () => {
            imagesLoaded++;
            if (imagesLoaded === imageElements.length) {
                setIsLoading(false);
            }
        };

        imageElements.forEach((img) => {
            if (img.complete) {
                handleImageLoad();
            } else {
                img.addEventListener("load", handleImageLoad);
            }
        });
    }, []);


    return (
        <>
            {isLoading && <Loader />}
            <div className={isLoading ? styles.isLoading : styles.homeContainer}>
                <h2 className={styles.sectionTitle}>{title}</h2>
                <div className={styles.moviesList}>
                    {movies.map(movie => (
                        <NavLink state={{ from: location.pathname }} key={movie.id} to={`/movies/${movie.id}`}>
                            <div className={styles.movieCard} >
                                <img
                                    className={styles.moviePoster}
                                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w200/${movie.poster_path}` : defaultImg}
                                    alt={movie.title}
                                />
                                <div className={styles.movieInfo}>
                                    <h3 className={styles.movieTitle}>{movie.title}</h3>
                                    <p className={styles.movieOverview}>{movie.overview}</p>
                                    <p className={styles.releaseDate}>Release Date: {movie.release_date}</p>
                                    <p className={styles.voteAverage}>Vote Average: {movie.vote_average}</p>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </>

    );
}

export default FilmsList;
