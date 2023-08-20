import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Loader from 'components/Loader/Loader';
import styles from './Cast.module.css';

Cast.propTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
};

function Cast({ cast }) {
  const [isLoading, setIsLoading] = useState(true);
  const defaultImg = 'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';

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
      {/* images will be hidden untill they will fully load */}
      <div className={isLoading ? styles.isLoading : styles.castContainer}>
        <h2 className={styles.sectionTitle}>Cast</h2>
        <div className={styles.castList}>
          {cast.map(actor => (
            <div className={styles.actorCard} key={actor.id}>
              <img
                className={styles.actorImage}
                src={actor.profile_path ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}` : defaultImg}
                alt={actor.name}
              />
              <div className={styles.actorInfo}>
                <p className={styles.actorName}>{actor.name}</p>
                <p className={styles.character}>Character: {actor.character}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}



export default Cast;
