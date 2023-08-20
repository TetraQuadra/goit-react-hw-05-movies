import GoBackButton from 'components/GoBackButton/GoBackButton';
import LinkBlock from 'components/LinkBlock/LinkBlock';
import Loader from 'components/Loader/Loader';
import MovieInfo from 'components/MovieInfo/MovieInfo';
import React, { Suspense } from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import DataFetcher from 'services/DataFetcher';



function MovieDetails() {
    const [movie, setMovie] = useState({})
    const [isLoaded, setLoaded] = useState(false)
    const { id } = useParams();
    useEffect(() => {

        const fetchDataAsync = async () => {
            setLoaded(false)
            try {
                const dataFetcher = new DataFetcher();
                const moviePromise = await dataFetcher.getMovieById(id);
                setMovie(moviePromise)
            } catch (error) {
                alert("there is no movie with such id")
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
            <GoBackButton />
            <MovieInfo movie={movie} />
            <LinkBlock />
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </>
    )
}

export default MovieDetails