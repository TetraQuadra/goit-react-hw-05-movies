import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css'

const Searchbar = ({ submitQuery, initQuery }) => {
    const [searchBar, setSearchBar] = useState("");



    const handleInputChange = (e) => {
        setSearchBar(e.target.value);
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        submitQuery(searchBar);
    };

    useEffect(() => {
        setSearchBar(initQuery);
    }, [initQuery])


    return (
        <div className={styles.Searchbar}>
            <form onSubmit={handleFormSubmit} className={styles.SearchForm}>
                <button type="submit" className={styles.SearchFormButton}>Search</button>
                <input
                    className={styles.SearchFormInput}
                    type="text"
                    value={searchBar}
                    onChange={handleInputChange}
                />
            </form>
        </div>
    );
}

Searchbar.propTypes = {
    submitQuery: PropTypes.func.isRequired
}

export default Searchbar;
