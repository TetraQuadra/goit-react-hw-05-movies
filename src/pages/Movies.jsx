import React, { useEffect, useState } from 'react';
import DataFetcher from 'services/DataFetcher';
import Searchbar from 'components/Searchbar/Searchbar';
import FilmsList from 'components/TrendingFilms/FilmsList';

function Movies() {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoaded, setLoaded] = useState(false);

    const submitQuery = (text) => {
        //in case user sends empty request
        if (text === '') {
            alert('Your request is empty')
            return
        }

        if (text === query) {
            alert(`Request "${text}" already loaded`)
        }
        if (text !== query) {
            setMovies([]);
            setQuery(text);
            setPage(1);
        }

    };

    useEffect(() => {
        const searchMovies = async () => {

            try {
                if (!query) {
                    return
                }
                setLoaded(false)
                const dataFetcher = new DataFetcher();
                const response = await dataFetcher.searchMovie(query, page);
                setMovies(response.results);
            } catch (error) {
                console.log('Error fetching movies:', error);
            }
        };
        searchMovies();
    }, [query, page]);

    return (
        <>
            <Searchbar submitQuery={submitQuery} />
            <FilmsList title={'Search for movies'} movies={movies} setLoaded={setLoaded} isLoaded={isLoaded} />
        </>


    );
}

export default Movies;