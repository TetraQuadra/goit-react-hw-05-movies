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
    const [movie, setMovie] = useState('')
    const [cast, setCast] = useState('')
    const [reviews, setReviews] = useState('')
    const [isLoaded, setLoaded] = useState(false)
    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {

        const fetchDataAsync = async () => {

            try {
                const dataFetcher = new DataFetcher();

                const moviePromise = dataFetcher.getMovieById(id);
                //those fetches are about 1-10kb so i decided to load them together to speed up further interactions 
                const castPromise = dataFetcher.getMovieCredits(id);
                const reviewsPromise = dataFetcher.getMovieReviews(id);

                const [movieResult, castResult, reviewsResult] = await Promise.allSettled([moviePromise, castPromise, reviewsPromise]);

                if (movieResult.status === 'fulfilled') {
                    setMovie(movieResult.value);
                } else {
                    throw new Error('Error fetching movie:', castResult.reason)
                }

                if (castResult.status === 'fulfilled') {
                    setCast(castResult.value.cast);
                } else {
                    console.error('Error fetching cast:', castResult.reason);
                }

                if (reviewsResult.status === 'fulfilled') {
                    setReviews(reviewsResult.value.results);
                } else {
                    console.error('Error fetching reviews:', reviewsResult.reason);
                }
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