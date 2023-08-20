import GoBackButton from 'components/GoBackButton/GoBackButton';
import LinkBlock from 'components/LinkBlock/LinkBlock';
import Loader from 'components/Loader/Loader';
import MovieInfo from 'components/MovieInfo/MovieInfo';
import React, { lazy, Suspense } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import DataFetcher from 'services/DataFetcher';

const Reviews = lazy(() => import('components/Review/Reviews'));
const Cast = lazy(() => import('components/Cast/Cast'));

function MovieDetails() {
    const [movie, setMovie] = useState({})
    const [cast, setCast] = useState([])
    const [reviews, setReviews] = useState([])
    const [isLoaded, setLoaded] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate()


    useEffect(() => {

        const fetchDataAsync = async () => {

            try {
                const dataFetcher = new DataFetcher();
                const stateCallbacks = [(value) => setMovie(value), (value) => setCast(value.cast), (value) => setReviews(value.results)]
                const moviePromise = dataFetcher.getMovieById(id);
                //those fetches are about 1-10kb so i decided to load them together to speed up further interactions 
                const castPromise = dataFetcher.getMovieCredits(id);
                const reviewsPromise = dataFetcher.getMovieReviews(id);


                Promise.allSettled([moviePromise, castPromise, reviewsPromise]).then((data) => {
                    data.forEach((promise, index) => {
                        if (promise.status === 'fulfilled') {
                            stateCallbacks[index](promise.value)
                            return
                        }
                        throw new Error('Error fetching :', promise.reason)
                    });
                });
            } catch (error) {
                alert("there is no movie with such id")
                navigate('/')
            }
            finally {
                setLoaded(true)
            }
        };

        fetchDataAsync();
    }, [id, navigate]);

    if (!isLoaded) {
        return (
            <Loader />
        )
    }

    return (
        <>
            <GoBackButton />
            <MovieInfo movie={movie} />
            <LinkBlock reviews={reviews} cast={cast} />
            <Suspense fallback={<Loader />}>
                <Routes>
                    <Route path="cast" element={<Cast cast={cast} />} />
                    <Route path="reviews" element={<Reviews reviews={reviews} />} />
                </Routes>
            </Suspense>
        </>
    )
}

export default MovieDetails