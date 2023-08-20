import Loader from 'components/Loader/Loader';
import FilmsList from 'components/TrendingFilms/FilmsList';
import React, { useEffect } from 'react'
import { useState } from 'react';
import DataFetcher from 'services/DataFetcher';

function Home() {
    const [movies, setMovies] = useState('')
    const [isLoaded, setLoaded] = useState(false)
    useEffect(() => {

        const fetchTrendingMovies = async () => {
            try {
                const dataFetcher = new DataFetcher();
                const response = await dataFetcher.getTrending()
                setMovies(response.results)
                console.log(response)
            } catch (error) {
                console.log('Error fetching trending films')

            }
            finally {
                setLoaded(true)
            }
        }
        fetchTrendingMovies()


    }, [])
    if (!isLoaded) {
        return (<Loader />)
    }

    return (
        <FilmsList title={'Trending movies'} movies={movies} />
    )
}

export default Home