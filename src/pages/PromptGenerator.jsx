import { useDispatch, useSelector } from 'react-redux';

import classes from '../resources/css/pages/promptGenerator.module.css';

import FetchWord from '../features/promptGenerator/FetchWord';
import Word from '../features/promptGenerator/Word';

import { inputValueChange, addWord, addFetchWord, fetchWord, removeAll, updateAll } from '../features/promptGenerator/sentenceSlice';

function PromptGenerator () {
    const { inputValue, sentence, hasError, isLoading} = useSelector(state => state.sentence);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(inputValueChange(event.target.value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        //todo: make the alert fancier like add another element or smth
        if (document.getElementById('input').value.includes(' ')) {
            alert('Try adding one word at a time :)!');
        } else {
            dispatch(addWord(document.getElementById('input').value));
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
        Promise.all(fetchWords).then(()=>dispatch(updateAll()));
    };

    if (!hasError) {
        return (
            <div className={classes.promptGenerator}>
                <h1>Prompt Generator</h1>
                <div>
                    <div>
                        <form
                        onSubmit={handleSubmit}
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
                            Remove all
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
    }

    return (
        <div className={classes.promptGenerator}>
            
            
            <div>
                <p>
                    Something went wrong :(! Try reloading the page!
                </p>
            </div>
        </div>
    );
};

export default PromptGenerator;