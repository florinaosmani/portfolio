import { useSelector, useDispatch } from 'react-redux';

import classes from '../../resources/css/features/promptGenerator/word.module.css';

import { makeEditable, makeNotEditable, showButtons, hideButtons } from './wordSlice';

function Word () {
    const { isEditable, isHidden } = useSelector(state => state.word);
    const dispatch = useDispatch();

    const handleEditClick = () => {
        dispatch(makeEditable());
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            dispatch(makeNotEditable());
        }
    };

    const handleMouseEnter = () => {
        dispatch(showButtons());
    };

    const handleMouseLeave = () => {
        dispatch(hideButtons());
    };

    return (
        <div className={classes.word}
        onMouseLeave={handleMouseLeave}>  
            <button
            onClick={handleEditClick}
            className={isHidden? classes.hidden : classes.notHidden}>
                Edit
            </button>
            <span contentEditable={isEditable}
            onKeyDown={handleKeyDown}
            onMouseEnter={handleMouseEnter}>
                Word
            </span>
            <button
            className={isHidden? classes.hidden : classes.notHidden}>
                Remove
            </button>
        </div>
    );
}

export default Word;