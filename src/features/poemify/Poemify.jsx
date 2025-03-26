import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import classes from '../../resources/css/features/poemify.module.css';

import { fetchBook, setTextSection, setTextLength, setSelection, removeSelection, addWord, removeWord, resetPoem, removeSingleSelection} from './poemifySlice';

function Poemify () {
    const { textLength, isLoading, poem } = useSelector(state => state.poemify);
    const { text, author, title, selections, bookId } = useSelector(state => state.poemify.book);
    const { isTouch } = useSelector(state => state.touch);
    const dispatch = useDispatch();

    useEffect(()=>{
        window.scrollTo(0, 0);
      },[]);

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

    const handleNewSection = () => {
        dispatch(resetPoem());
        dispatch(removeSelection());
        const fetch = async () => {
            const response = await dispatch(fetchBook(bookId)).unwrap();
            dispatch(setTextSection());
        };
        fetch();
    };

    const handleNewBook = () => {
        dispatch(resetPoem());
        dispatch(removeSelection());
        const fetch = async () => {
            const response = await dispatch(fetchBook()).unwrap();
            dispatch(setTextSection());
        };
        fetch();
    };

    const handleSelection = (event) => {
        /* on mobile for some reason it will also select within the titleAuthorContainer,
        so I quickly added a yes and no class to check whether the selection is within the right element */
        if (event.target.className === 'yes') {
            const selection = document.getSelection();
            if (!selection.isCollapsed && selection.toString() !== ' ') {
                dispatch(setSelection({
                    content: selection.toString(),
                    startIndex: selection.getRangeAt(0).startOffset,
                    endIndex: selection.getRangeAt(0).endOffset,
                }));
            }
            selection.empty();
        } else {
            return;
        }
    };

    const handleRemoveSelection = () => {
        dispatch(removeSelection());
    };

    const handleDragStart = (event) => {
        const rect = event.target.getBoundingClientRect();
        const offSetX = event.clientX - rect.left; //event.clientX is the mouse position
        const offSetY = event.clientY - rect.top; // rect.y is the elements position

        event.dataTransfer.setData('text/plain', event.target.id);
        event.dataTransfer.setData('offSetX', offSetX);
        event.dataTransfer.setData('offSetY', offSetY)
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
    };

    const handleDrop = (event) => {
        if (event.target.className.includes('poemTextContainer') || event.target.id.includes('wordId')) {
            const id = event.dataTransfer.getData('text/plain');  
            const offSetX = Number(event.dataTransfer.getData('offSetX'));
            const offSetY = Number(event.dataTransfer.getData('offSetY'));
            const div = document.getElementById('poem').getBoundingClientRect();
            const xPosition = event.clientX - offSetX - div.left;
            const yPosition = event.clientY - offSetY - div.top;
            dispatch(addWord({
                id: id,
                xPosition: xPosition,
                yPosition: yPosition
            }));
        }
        event.preventDefault();
    };

    const handleDropOutside = (event) => {
        const id = event.dataTransfer.getData('text/plain');
        if(!event.target.className.includes('poemTextContainer') 
            && id.includes('wordId')
            && !event.target.id.includes('wordId')) {
            dispatch(removeWord(id.split('_')[1]));
        }
    };

    const handleResetPoem = () => {
        dispatch(resetPoem());
    };

    const handleDoubleClick = (event) => {
        const id = event.target.id.split('_')[1];
        dispatch(removeSingleSelection(id));
    };

    const loremIpsum = `Lorem ipsum dolor sit amet,consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
                        nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                        culpa qui officia deserunt mollit anim id est laborum.`;
    const mobileInstructions = `Create your own poem by first selecting words or phrases you like.
                            Double tap to remove a single selection.
                            Then long tap to drag your selected words from the top box to the bottom one in
                            in the order you would like.
                            If you're not happy with a selection within your poem, simply drag it out of the box
                            to remove it.`;
    const instructions = `Create your own poem by first selecting words or phrases you like.
                            Double click to remove a single selection.
                            Then drag your selected words from the left box to the right one in the
                            order you would like.
                            If you're not happy with a selection within your poem, simply drag it out
                            of the box to remove it.` 
    
    return (
        <div className={classes.poemify}
        onDrop={handleDropOutside}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}>
            <div className={classes.header}>
                <div className={classes.instructions}>
                    <div className={classes.icon}>
                        <span>?</span>
                    </div>
                    <div className={classes.instructionsText}>
                        <p> {isTouch ? mobileInstructions : instructions }
                        </p>
                    </div>
                </div>
                <h1>Poemify</h1>
            </div>
            <div className={classes.bookContainer}>
                <div className={classes.bookDataContainer}>
                    <div className={classes.titleAuthorContainer}>
                        <h2 className='no'>{isLoading ? 'Loading' : title}</h2>
                        <h3 className='no'>{isLoading ? 'Please wait' : author}</h3>
                    </div>
                    <div className={classes.bookTextContainer}>
                        <p
                        className='yes'
                        onMouseUp={handleSelection}
                        onTouchEnd={isTouch ? handleSelection : undefined}>
                            {isLoading ? loremIpsum : text}
                        </p>
                    </div>
                </div>
                <div className={classes.bookSettingContainer}>
                    <button
                    onClick={handleNewBook}>
                        New Book
                    </button>
                    <button
                    onClick={handleNewSection}>
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
            <div className={classes.wordsAndPoemContainer}>
                <div className={classes.wordsContainer}>
                    <button
                    onClick={handleRemoveSelection}>
                        Reset Selections
                    </button>
                    <div className={classes.wordsTextContainer}>
                        {selections.map((selection, index) => {
                            return (
                                <span
                                key={`id_${index}`}
                                id={`id_${index}`}
                                draggable='true'
                                onDragStart={handleDragStart}
                                onDoubleClick={handleDoubleClick}>
                                    {selection.content}
                                </span>
                            );
                        })}
                    </div>
                </div> 
                <div className={classes.poemContainer}>
                    <button
                    onClick={handleResetPoem}>
                        Reset Poem
                    </button>
                    <div className={classes.poemTextContainer}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDrop={handleDrop}
                    id='poem'
                    >
                        {poem.map((wordObj, index) => {
                            return (
                                <span
                                key={`wordId_${index}`}
                                id={`wordId_${index}`}
                                draggable='true'
                                onDragStart={handleDragStart}
                                style={{top: wordObj.yPosition, left: wordObj.xPosition}}>
                                    {wordObj.content}
                                </span>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Poemify;