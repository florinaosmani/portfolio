import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import classes from '../../resources/css/features/poemify.module.css';

import { fetchBook, setTextSection, setTextLength, setSelection, removeSelection } from './poemifySlice';

function Poemify () {
    const { book, textLength, isLoading } = useSelector(state => state.poemify);
    const { text, author, title, selections, textWithSelections } = useSelector(state => state.poemify.book);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            const response = await dispatch(fetchBook()).unwrap();
            dispatch(setTextSection());
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

    const handleSelection = () => {
        const selection = document.getSelection();
        if (selection.toString() !== '') {
            dispatch(setSelection({
                content: selection.toString(),
                startIndex: selection.getRangeAt(0).startOffset,
                endIndex: selection.getRangeAt(0).endOffset,
            }));
        }
    };

    const handleRemoveSelection = () => {
        dispatch(removeSelection());
    };

    const loremIpsum = `Lorem ipsum dolor sit amet,consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.`;
    
    return (
        <div className={classes.poemify}>
            <h1>Poemify</h1>
            <div className={classes.instructions}>
                <i class="fa-solid fa-question"></i>
                <p>Create your own poem by first selecting words or phrases you like.
                    <br/>Then drag your selected words from the left box to the right one in the
                    order you would like!
                </p>
            </div>
            <div className={classes.bookFlexContainer}>
                <div className={classes.bookContainer}>
                    <div className={classes.bookDataContainer}>
                        <div className={classes.titleAuthorContainer}>
                            <h2>{isLoading ? 'Loading' : title}</h2>
                            <h3>{isLoading ? 'Please wait' : author}</h3>
                        </div>
                        <div className={classes.bookTextContainer}>
                            <p
                            onMouseUp={handleSelection}>
                                {/* {isLoading ? loremIpsum : text} */}
                                {text}
                            </p>
                        </div>
                    </div>
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
                </div>
            </div>
            <div className={classes.wordsAndPoemContainer}>
                <div className={classes.wordsContainer}>
                    <button
                    onClick={handleRemoveSelection}>
                        Reset Selection
                    </button>
                    <div className={classes.wordsTextContainer}>
                        {selections.map((selection, index) => {
                            return (
                                <span
                                key={index}
                                draggable='true'>
                                    {selection.content}
                                </span>
                            );
                        })}
                    </div>
                </div> 
                <div className={classes.poemContainer}>
                    <button>
                        Reset Poem
                    </button>
                    <div className={classes.poemTextContainer}>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Poemify;