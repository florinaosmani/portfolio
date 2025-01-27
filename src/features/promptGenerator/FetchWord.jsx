import { useSelector, useDispatch } from 'react-redux';

import classes from '../../resources/css/features/promptGenerator/fetchWord.module.css';

import { lockToggle , showButtons, hideButtons, removeWord, makeEditable, makeNotEditable } from './sentenceSlice';

function FetchWord ({ index, children}) {
    const { isLocked, isHidden, content, isEditable } = useSelector(state => state.sentence.sentence[index]);
    const dispatch = useDispatch();

    const handleLockClick = () => {
        dispatch(lockToggle(index));
    };

    const handleMouseEnter = () => {
        dispatch(showButtons(index));
    };

    const handleMouseLeave = () => {
        dispatch(hideButtons(index));
    };

    const handleRemove = () => {
        dispatch(removeWord(index));
    };

    const handleEditClick = () => {
            dispatch(makeEditable(index));
        };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            dispatch(makeNotEditable(index));
        }
    };

    return (
        <div
        className={classes.word}
        onMouseLeave={handleMouseLeave}>
            <button
            onClick={handleLockClick}
            className={isHidden? classes.hidden : classes.notHidden}>
                {isLocked ? 'Unlock' : 'Lock'}
            </button>
            <span
            contentEditable={isEditable}
            onKeyDown={handleKeyDown}
            onMouseEnter={handleMouseEnter}>
                {content === ''? children : content}
            </span>
            <button
                onClick={handleEditClick}
                className={isHidden? classes.hidden : classes.notHidden}>
                    Edit
            </button>
            <button
            className={isHidden? classes.hidden : classes.notHidden}
            onClick={handleRemove}>
                Remove
            </button>
        </div>
    );
}

export default FetchWord;