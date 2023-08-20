import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './GoBackButton.module.css'; // Импортируйте стили

function GoBackButton() {
    const location = useLocation();
    return (
        <NavLink
            to={location.state?.from ? location.state?.from : '/'}
            className={styles.backButton} // Примените стили через класс
        >← Go back
        </NavLink>
    );
}

export default GoBackButton;
