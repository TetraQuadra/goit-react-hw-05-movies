import React, { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import DataFetcher from 'services/DataFetcher';
import Searchbar from 'components/Searchbar/Searchbar';
import FilmsList from 'components/TrendingFilms/FilmsList';

function Movies() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("query") || '');
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoaded, setLoaded] = useState(false);

    const submitQuery = useCallback((text) => {
        if (text === '') {
            alert('Your request is empty');
            return;
        }

        if (text === searchQuery) {
            alert(`Request "${text}" already loaded`);
        }
        if (text !== searchQuery) {
            setMovies([]);
            setSearchQuery(text);
            setPage(1);
            setSearchParams({ query: text });
        }
    }, [searchQuery, setSearchQuery, setMovies, setSearchParams]);

    useEffect(() => {
        const searchMovies = async () => {
            try {
                if (!searchQuery) {
                    return;
                }
                setLoaded(false);
                const dataFetcher = new DataFetcher();
                const response = await dataFetcher.searchMovie(searchQuery, page);
                setMovies(response.results);
            } catch (error) {
                console.log('Error fetching movies:', error);
            }
        };
        searchMovies();
    }, [searchQuery, page]);

    return (
        <>
            <Searchbar initQuery={searchQuery} submitQuery={submitQuery} />
            <FilmsList title={'Search for movies'} movies={movies} setLoaded={setLoaded} isLoaded={isLoaded} />
        </>
    );
}

export default Movies;
