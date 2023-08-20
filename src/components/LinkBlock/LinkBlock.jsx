import React from 'react'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'
import styles from './LinkBlock.module.css'

LinkBlock.propTypes = {
    reviews: PropTypes.arrayOf(
        PropTypes.object
    ),
    cast: PropTypes.arrayOf(
        PropTypes.object
    ),
};

function LinkBlock({ reviews, cast }) {
    return (
        <ul>
            {cast?.length > 0 ? <li><NavLink
                to="./cast"
                style={({ isActive }) => ({
                    borderBottom: isActive ? '1px solid red' : '',
                    opacity: isActive ? 1 : ''
                })}>Cast</NavLink></li> :
                <p className={styles.notAvaibleText}>No avaible info about cast</p>}
            {
                reviews?.length > 0 ? <li><NavLink
                    to="./reviews"
                    style={({ isActive }) => ({
                        borderBottom: isActive ? '1px solid red' : '',
                        opacity: isActive ? 1 : ''
                    })}>Reviews</NavLink></li> : <p className={styles.notAvaibleText}>There is no reviews</p>
            }
        </ul >
    )
}

export default LinkBlock