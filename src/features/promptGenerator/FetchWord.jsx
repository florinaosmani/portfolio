import { useSelector, useDispatch } from 'react-redux';

import classes from '../../resources/css/features/promptGenerator/fetchWord.module.css';

import { lockToggle , showButtons, hideButtons, removeWord } from './sentenceSlice';

function FetchWord ({ index, children}) {
    const { isLocked, isHidden } = useSelector(state => state.sentence.sentence[index]);
    const dispatch = useDispatch();

    const handleEditClick = () => {
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
    }

    return (
        <div
        className={classes.word}
        onMouseLeave={handleMouseLeave}>  
            <button
            onClick={handleEditClick}
            className={isHidden? classes.hidden : classes.notHidden}>
                {isLocked ? 'Unlock' : 'Lock'}
            </button>
            <span
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

export default FetchWord;