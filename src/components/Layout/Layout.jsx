// Layout.jsx

import { NavLink, Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import styles from './Layout.module.css';
import Loader from 'components/Loader/Loader';

function Layout() {
    return (
        <div>
            <header>
                <nav className={styles.nav}>
                    <ul className={styles.ul}>
                        <li>
                            <NavLink
                                to="/"
                                style={({ isActive }) => ({
                                    borderBottom: isActive ? '1px solid red' : '',
                                    opacity: isActive ? 1 : ''
                                })}
                                className={styles.link}
                            >Home</NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/movies"
                                style={({ isActive }) => ({
                                    borderBottom: isActive ? '1px solid red' : '',
                                    opacity: isActive ? 1 : ''
                                })}
                                className={styles.link}
                            >Movies</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
            <main>
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </main>
        </div >
    );
}

export default Layout;
