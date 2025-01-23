import classes from '../../resources/css/features/header.module.css';

import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { closeHeader, openHeader } from './headerSlice';



function Header () {
    const isOpen = useSelector(state => state.header.isOpen);
    const dispatch = useDispatch();

    useEffect(()=>{
        const handleScroll = () => {
                dispatch(closeHeader());

        };

        if (isOpen) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            if(isOpen) {
                window.removeEventListener('scroll', handleScroll);
            }
        };

    },[isOpen]);

    const handleClick = () => {
        dispatch(openHeader());
    };


    if (isOpen) {
        return (
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
                        <li>
                            <NavLink to='contact' className={({ isActive }) => `${classes.navLink} ${isActive ? classes.active : ''}`}>
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    } else {
        return (
            <header className={classes.header}>
                <nav className={classes.nav}>
                    <div className={classes.pulloutTab} onClick={handleClick}>
                        <button>
                            Navigation
                        </button>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header;