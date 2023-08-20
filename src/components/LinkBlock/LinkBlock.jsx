import React from 'react'
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom'

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
            <li><NavLink
                to="./cast"
                style={({ isActive }) => ({
                    borderBottom: isActive ? '1px solid red' : '',
                    opacity: isActive ? 1 : ''
                })}>Cast</NavLink></li>
            <li><NavLink
                to="./reviews"
                style={({ isActive }) => ({
                    borderBottom: isActive ? '1px solid red' : '',
                    opacity: isActive ? 1 : ''
                })}>Reviews</NavLink></li>
        </ul >
    )
}

export default LinkBlock