import '../../resources/css/features/header.css';

import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { closeHeader, openHeader } from './headerSlice';



function Header () {
    const isOpen = useSelector(state => state.header.isOpen);
    const dispatch = useDispatch();

    useEffect(()=>{
        const handleScroll = () => {
            setTimeout(() => {
                dispatch(closeHeader());
            },100);
            //remove timeout when figure out animation???
        };

        if (isOpen) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };

    },[isOpen]);

    const handleClick = () => {
        dispatch(openHeader());
    };


    if (isOpen) {
        return (
            <header>
                <nav>
                    <ul>
                        <li>
                            <NavLink 
                                to='/' 
                                className={({ isActive }) => isActive ? 'nav active' : 'nav'}>
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='projects' className='nav'>
                                Projects
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to='contact' className='nav'>
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        )
    } else {
        return (
            <header>
                <nav>
                    <div className='pullout-tab' onClick={handleClick}>
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