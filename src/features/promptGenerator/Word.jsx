import { useSelector, useDispatch } from 'react-redux';

import classes from '../../resources/css/features/promptGenerator/word.module.css';

import { makeEditable, makeNotEditable, showButtons, hideButtons, removeWord } from './sentenceSlice';

function Word ({ children, index }) {
    const { isEditable, isHidden } = useSelector(state => state.sentence.sentence[index]);
    const dispatch = useDispatch();

    const handleEditClick = () => {
        if (!isEditable) {
            dispatch(makeEditable(index));
        } else {
            dispatch(makeNotEditable(index));
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            dispatch(makeNotEditable(index));
        }
    };

    const handleMouseEnter = () => {
        dispatch(showButtons(index));
    };

    const handleMouseLeave = () => {
        dispatch(hideButtons(index));
    };

    const handleRemove = () => {
        dispatch(removeWord(index));
    }

    return (
        <div className={classes.word}
        onMouseLeave={handleMouseLeave}>  
            <button
            onClick={handleEditClick}
            className={isHidden? classes.hidden : classes.notHidden}
            style={isEditable ? {fontWeight: '600'}: {fontWeight: '400'}}>
                Edit
            </button>
            <span contentEditable={isEditable}
            onKeyDown={handleKeyDown}
            onMouseEnter={handleMouseEnter}>
                {children}
            </span>
            <button
            className={isHidden? classes.hidden : classes.notHidden}
            onClick={handleRemove}>
                Remove
            </button>
        </div>
    );
}

export default Word;