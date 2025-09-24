import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
/* SOMETHING GOES WRONG A LOT?? WHATS GOING ON??? */
import classes from '../resources/css/pages/promptGenerator.module.css';

import FetchWord from '../features/promptGenerator/FetchWord';
import Word from '../features/promptGenerator/Word';

import { toggleHasSpace, inputValueChange, addWord, addFetchWord, fetchWord, removeAll, updateAll } from '../features/promptGenerator/sentenceSlice';

function PromptGenerator () {

    useEffect(()=>{
        window.scrollTo(0, 0);
    },[]);


    const { inputValue, sentence, hasError, isLoading, hasSpace} = useSelector(state => state.sentence);
    const { isTouch } = useSelector(state => state.touch);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(inputValueChange(event.target.value));
        if(hasSpace) {
            dispatch(toggleHasSpace());
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //todo: make the alert fancier like add another element or smth
        if (document.getElementById('input').value.includes(' ')) {
            dispatch(toggleHasSpace());
        } else {
            dispatch(addWord(document.getElementById('input').value));
            if (hasSpace) {
                dispatch(toggleHasSpace());
            }
        }
    };

    const handleClickWordType = (event) => {
        dispatch(addFetchWord(event.target.value));
    };

    const handleRemoveAll = () => {
        dispatch(removeAll());
    };

    const handleFetchWord = async () => {
        const fetchWords = sentence.map(wordObj => {
            if (wordObj.type === 'fetchWord' && !wordObj.isLocked) {
                return dispatch(fetchWord({
                    index: wordObj.keyId,
                    type: wordObj.wordType.toLowerCase()
                }));
            }
        });
        Promise.allSettled(fetchWords).then(()=>dispatch(updateAll()));
    };

    return (
        <div className={classes.promptGenerator}>
            <h1>Prompt Generator</h1>
            <p>{hasSpace ? 'Try adding one word at a time :)!' : null}</p>
            <p>{hasError ? 'Something went wrong :(! Lock all the existing words and try again!' : ''}</p>
            <div>
                <div>
                    <form
                    onSubmit={handleSubmit}
                    onBlur={isTouch? handleSubmit : undefined}
                    id='wordInputForm'>
                        <input type='text'
                        value={inputValue}
                        onChange={handleChange}
                        id='input'
                        placeholder='type here...'/>
                        <button type='submit'
                        form='wordInputForm'
                        className={classes.button}>
                            Add word
                        </button>
                    </form>
                    <div>
                        <button value='Noun'
                        className={`${classes.noun} ${classes.wordType}`}
                        onClick={handleClickWordType}>
                            Noun
                        </button>
                        <button value='Verb'
                        className={`${classes.verb} ${classes.wordType}`}
                        onClick={handleClickWordType}>
                            Verb
                        </button>
                        <button value='Adjective'
                        className={`${classes.adjective} ${classes.wordType}`}
                        onClick={handleClickWordType}>
                            Adjective
                        </button>
                        <button value='Adverb'
                        className={`${classes.adverb} ${classes.wordType}`}
                        onClick={handleClickWordType}>
                            Adverb
                        </button>
                    </div>
                </div>
                <div>
                    <button
                    className={classes.button}
                    onClick={handleFetchWord}>
                        {isLoading ? 'Loading' : 'GO'}
                    </button>
                    <button
                    className={classes.button}
                    onClick={handleRemoveAll}>
                        Remove
                    </button>
                </div>
            </div>
            
            <div className={classes.sentence}>
                {sentence.map(wordObj => {
                    if (wordObj.type === 'word') {
                        return (
                            <Word
                            key={wordObj.keyId}
                            index={wordObj.keyId}>
                                {wordObj.content}
                            </Word>
                        )
                    } else if (wordObj.type === 'fetchWord') {
                        return (
                            <FetchWord
                            key={wordObj.keyId}
                            index={wordObj.keyId}
                            type={wordObj.wordType}/>
                        )
                    }
                })}
            </div>
        </div>
    );
};

export default PromptGenerator;