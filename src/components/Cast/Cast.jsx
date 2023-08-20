import React, { useEffect, useState } from 'react';
import Loader from 'components/Loader/Loader';
import styles from './Cast.module.css';
import DataFetcher from 'services/DataFetcher';
import { useParams } from 'react-router-dom';


function Cast() {
  const [cast, setCast] = useState([])
  const [isLoaded, setLoaded] = useState(false)
  const { id } = useParams();
  const defaultImg = 'https://ireland.apollo.olxcdn.com/v1/files/0iq0gb9ppip8-UA/image;s=1000x700';
  useEffect(() => {

    const fetchDataAsync = async () => {

      try {
        const dataFetcher = new DataFetcher();
        const castPromise = await dataFetcher.getMovieCredits(id);
        if (castPromise.cast.length < 1) {
          throw new Error()
        }
        setCast(castPromise.cast)
      } catch (error) {
        setCast(null)
        console.log("there is no cast data")
      }
      finally {
        setLoaded(true)
      }
    };

    fetchDataAsync();
  }, [id]);

  if (!isLoaded) {
    return (
      <Loader />
    )
  }

  return (

    <>
      <div className={styles.castContainer}>


        {cast ?
          <>
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
          </> :
          <p>There is no cast info</p>
        }

      </div>
    </>
  );
}



export default Cast;
