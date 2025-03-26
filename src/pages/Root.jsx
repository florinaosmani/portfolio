import { Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

import classes from '../resources/css/pages/root.module.css';

function Root() {

    return (
        <>
            <header className={classes.header}>
                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink 
                                to='/' 
                                className={({ isActive }) => `${classes.navLink} ${isActive ? classes.active : ''}`}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='documentation' className={({ isActive }) => `${classes.navLink} ${isActive ? classes.active : ''}`}>
                                Documentation
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        <main className={classes.main}>
                <Outlet />
            </main>
        </>
    )
}

export default Root;