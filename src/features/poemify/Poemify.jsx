import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import classes from '../../resources/css/features/poemify.module.css';

import { fetchBook, setInitSection, setTextSection, setTextLength } from './poemifySlice';

function Poemify () {
    const { book, textLength, isLoading } = useSelector(state => state.poemify);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            const response = await dispatch(fetchBook()).unwrap();
            dispatch(setInitSection());
        };
        fetch();
    },[]);

    const handleTextLengthChange = (event) => {
        dispatch(setTextLength(event.target.value))
        dispatch(setTextSection());
    };

    const handleSetSection = () => {
        dispatch(setTextSection('new'));
    };

    const handleNewBook = () => {
        const fetch = async () => {
            const response = await dispatch(fetchBook()).unwrap();
            dispatch(setInitSection());
        };
        fetch();
    };

    return (
        <div className={classes.poemify}>
            <h1>Poemify</h1>
            <div className={classes.columnsContainer}>
                <div className={classes.bookContainer}>
                    <div className={classes.bookSettingContainer}>
                        <button
                        onClick={handleNewBook}>
                            New Book
                        </button>
                        <button
                        onClick={handleSetSection}>
                            New Section
                        </button>
                        <button
                        value='short'
                        onClick={handleTextLengthChange}
                        className={textLength.short ? classes.buttonPressed : ''}>
                            Short
                        </button>
                        <button
                        value='medium'
                        onClick={handleTextLengthChange}
                        className={textLength.medium ? classes.buttonPressed : ''}>
                            Medium
                        </button>
                        <button
                        value='long'
                        onClick={handleTextLengthChange}
                        className={textLength.long ? classes.buttonPressed : ''}>
                            Long
                        </button>
                    </div>
                    <div className={classes.bookDataContainer}>
                        <div className={classes.titleAuthorContainer}>
                            <h2>{isLoading ? 'Loading' : book.title}</h2>
                            <h3>{isLoading ? 'Please wait' : book.author}</h3>
                        </div>
                        <div className={classes.bookTextContainer}>
                            {isLoading ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.' : book.text}
                        </div>
                    </div>
                </div>
                <div className={classes.poemContainer}>
                    <div className={classes.poemTextContainer}>
                        
                    </div>
                    <button>
                        Reset Poem
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Poemify;