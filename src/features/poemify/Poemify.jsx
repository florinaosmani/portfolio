import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import classes from '../../resources/css/features/poemify.module.css';

import { fetchBook,
    setTextSection,
    setTextLength,
    setSelection,
    removeSelection,
    addWord,
    removeWord,
    resetPoem,
    removeSingleSelection,
    showSelectionBox,
    hideSelectionBox,
    updateScroll,
    setDraggingElement,
    setDblClick} from './poemifySlice';

import throttle from '../../utility/throttle';

function Poemify () {
    const { textLength, isLoading, poem, selectionBox, draggedElement, dblClick } = useSelector(state => state.poemify);
    const { text, author, title, selections, bookId } = useSelector(state => state.poemify.book);
    const { isTouch } = useSelector(state => state.touch);
    const dispatch = useDispatch();

    //when coming from homepage react router doesn't automatically go to the top of the site
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

    const handleSelection = () => {
        const selection = document.getSelection();
        //checks if selection exists and if it's not just a single space
        if (!selection.isCollapsed && selection.toString() !== ' ') {
            dispatch(setSelection({
                content: selection.toString(),
                startIndex: selection.getRangeAt(0).startOffset,
                endIndex: selection.getRangeAt(0).endOffset,
            }));
            if (isTouch) {
                dispatch(hideSelectionBox());
            }
        }
        selection.empty(); //empties the selection automatically
    };

    /* since selection with mobile wasn't very pretty.
    touchCancel would cancel immediatly once selection happened, the user wasn't able to select
    more than one word
    touchEnd wouldnt fire everytime i actually ended a touch, but only once you clicked out of the selection */
    useEffect(() => {
        const handleShowSelectionBox = () => {
            const selection = document.getSelection();
            const paragraphText = document.getElementById('paragraphText');
            
            /* added because the box would stay since again touchEnd while selecting something
            seems to work in mysterious ways
            this way the box will actually go away even if a touchEnd isn't registered
            and since the eventlistener is selectionChange it will actually update*/
            if (selection.isCollapsed) {
                dispatch(hideSelectionBox());
            }

            /* quadruple check whether the selection is in the right text!
            the third and fourth condition might not be needed now that i added css
            user-select: none for every other element */
            if (!selection.isCollapsed
                && selection.toString() !== ' '
                && selection.anchorNode.parentElement === paragraphText
                && selection.focusNode.parentElement === paragraphText) {
                    const rect = selection.getRangeAt(0).getBoundingClientRect();
                    const leftPosition = rect.right;
                    const topPosition = rect.top - 16; //16px as the line height so it always stays on top of the selection

                    dispatch(showSelectionBox({
                        leftPosition: leftPosition,
                        topPosition: topPosition,
                        topScroll: topPosition,
                        initialScroll: window.scrollY,
                    }));
            }
        };

        if( isTouch ) {
            document.addEventListener("selectionchange", handleShowSelectionBox);
        }
    
        return () => {
            document.removeEventListener("selectionchange", handleShowSelectionBox);
        };
    }, [isTouch]); /* useEffect will add the listener with the initial isTouch value which is false
                    so you gotta make it dependent on it, that it will actually show true once it is true */
    
    useEffect (()=> {
        const handleScroll = () => {
            /* only dispatch if the box exists at the moment */
                if (selectionBox.display === 'flex') {
                    dispatch(updateScroll(selectionBox.top + (selectionBox.initialScroll - window.scrollY)));
                }
        };

        /* throttle function so it doesnt fire a million times, its in a different file */
        const throttleHandleScroll = throttle(handleScroll, 200);

        if ( isTouch ) {
            document.addEventListener('scroll', throttleHandleScroll);
        }   

        return () => {
            document.removeEventListener('scroll', throttleHandleScroll);
        };

    }, [selectionBox, isTouch]); /* dependent on selectionBox so everytime the topScroll value change
                                    , because it worked this way and didn't work without it */

    const handleRemoveSelection = () => {
        dispatch(removeSelection());
    };

    /* DRAG AND DROP FOR COMPUTER */

    const handleDragStart = (event) => {
        const rect = event.target.getBoundingClientRect();
        /* get offSet so the element will then drop exactly where the mouse is */
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

    /* Drag and Drop for mobile  */

    let timer;
    let doubleTap = false;

    const handleTouchStart = (event) => {

        if(!doubleTap) {
            doubleTap = true;
            setTimeout(()=>{doubleTap = false;}, 300);
        } else {
            const id = event.target.id.split('_')[1];
            dispatch(removeSingleSelection(id));
        }

        const handleLongTouch = () => {
            const rect = event.target.getBoundingClientRect();
            const offSetX = event.touches[0].clientX - rect.left;
            const offSetY = event.touches[0].clientY - rect.top;
            
            event.target.style.backgroundColor = 'var(--button-color)';

            dispatch(setDraggingElement({
                id: event.target.id,
                offSetX: offSetX,
                offSetY: offSetY,
            }));
        }
        
        timer = setTimeout(handleLongTouch, 500);
    };

    const handleTouchMove = (event) => {
        if (event.target.id === draggedElement.id) {
            const topPosition = event.changedTouches[0].clientY - draggedElement.offSetY;
            const leftPosition = event.changedTouches[0].clientX - draggedElement.offSetX;
            
            event.target.style.position = 'fixed';
            event.target.style.top = `${topPosition}px`;
            event.target.style.left = `${leftPosition}px`;
            event.target.style.zIndex = '100';
            event.target.style.cursor = 'grabbing';
            console.log('i just changed the style' + event.target.id)
        }
    };

    const handleTouchEnd = (event) => {
        event.preventDefault();
        if (timer) {
            clearTimeout(timer);
            dispatch(setDraggingElement({
                id: '',
                offSetX: '',
                offSetY: '',
            }));
        }

        const span = event.target.getBoundingClientRect();
        const divRect = document.getElementById('poem').getBoundingClientRect();
        const xPosition = event.changedTouches[0].clientX - draggedElement.offSetX - divRect.left;
        const yPosition = event.changedTouches[0].clientY - draggedElement.offSetY - divRect.top;
        
        if (divRect.left < span.left &&
            divRect.right > span.right &&
            divRect.top < span.top &&
            divRect.bottom > span.bottom) {
                
                /* no idea why i have to reset these before adding the word,
                but if i don't and it isn't the only word within the selection array
                once i move that element, the following element will suddenly have the
                same values as the moved element? resetting these helped for some reason */
                if (event.target.id.includes('wordId')) {
                    event.target.style.position = 'absolute';
                } else {
                    event.target.style.position = 'static';
                }
                event.target.style.top = ``;
                event.target.style.left = ``;
                event.target.style.zIndex = '';
                event.target.style.cursor = 'grab';
                event.target.style.backgroundColor = 'var(--off-white-color)';

                dispatch(addWord({
                    id: draggedElement.id,
                    xPosition: xPosition,
                    yPosition: yPosition,
                }));

                dispatch(setDraggingElement({
                    id: '',
                    offSetX: '',
                    offSetY: ''
                }));

        } else if (event.target.id.includes('wordId')) {
            dispatch(removeWord(event.target.id.split('_')[1]));
        } else {
            event.target.style.position = 'static';
            event.target.style.backgroundColor = 'var(--off-white-color)';
            dispatch(setDraggingElement({
                id: '',
                offSetX: '',
                offSetY: ''
            }))
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
        onDrop={isTouch ? undefined : handleDropOutside}
        onDragOver={isTouch ? undefined : handleDragOver}
        onDragEnter={isTouch ? undefined : handleDragEnter}>
            <div className={classes.header}>
                <div className={classes.instructions}>
                    <div className={classes.icon}>
                        <span>?</span>
                    </div>
                    <div className={classes.instructionsText}>
                        <p> {isTouch ? mobileInstructions : instructions } </p>
                    </div>
                </div>
                <h1>Poemify</h1>
            </div>
            <div className={classes.bookContainer}>
                <div className={classes.bookDataContainer}>
                    <div className={classes.titleAuthorContainer}>
                        <h2>{isLoading ? 'Loading' : title}</h2>
                        <h3>{isLoading ? 'Please wait' : author}</h3>
                    </div>
                    <div className={classes.bookTextContainer}>
                        <p
                        id='paragraphText'
                        onMouseUp={isTouch ? undefined : handleSelection}>
                            {isLoading ? loremIpsum : text}
                        </p>
                        <button className={classes.addWord}
                        onTouchStart={handleSelection}
                        style={{
                            display: selectionBox.display,
                            left: selectionBox.left,
                            top: selectionBox.topScroll
                            }}>+</button>
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
                                onDragStart={isTouch ? undefined : handleDragStart}
                                onDoubleClick={handleDoubleClick}
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}>
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
                    onDragOver={isTouch ? undefined : handleDragOver}
                    onDragEnter={isTouch ? undefined : handleDragEnter}
                    onDrop={isTouch ? undefined : handleDrop}
                    id='poem'
                    >
                        {poem.map((wordObj, index) => {
                            return (
                                <span
                                key={`wordId_${index}`}
                                id={`wordId_${index}`}
                                draggable='true'
                                onDragStart={isTouch ? undefined : handleDragStart} 
                               
                                onTouchStart={handleTouchStart}
                                onTouchMove={handleTouchMove}
                                onTouchEnd={handleTouchEnd}
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