import { useDispatch, useSelector } from 'react-redux';

import classes from '../../resources/css/features/promptGenerator/promptGenerator.module.css';

import FetchWord from './FetchWord';
import Word from './Word';

import { inputValueChange, addWord, addFetchWord } from '../promptGenerator/sentenceSlice';

const MY_KEY= config.MY_KEY;

function PromptGenerator () {
    const { inputValue, sentence } = useSelector(state => state.sentence);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        dispatch(inputValueChange(event.target.value));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(addWord(document.getElementById('input').value));
    };

    const handleClickWordType = (event) => {
        event.preventDefault();
        dispatch(addFetchWord(event.target.value));
    };

    return (
        <div className={classes.promptGenerator}>
            <h1>Prompt Generator </h1>
            <div>
                <div>
                    <form
                    onSubmit={handleSubmit}>
                        <input type='text'
                        value={inputValue}
                        onChange={handleChange}
                        id='input'/>
                        <button type='submit'>
                            Add word
                        </button>
                    </form>
                    <div>
                        <button value='Noun'
                        onClick={handleClickWordType}>
                            Noun
                        </button>
                        <button value='Verb'
                        onClick={handleClickWordType}>
                            Verb
                        </button>
                        <button value='Adjective'
                        onClick={handleClickWordType}>
                            Adjective
                        </button>
                        <button value='Adverb'
                        onClick={handleClickWordType}>
                            Adverb
                        </button>
                    </div>
                </div>
                <div>
                    <button>
                        Go
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
                            index={wordObj.keyId}>
                                {wordObj.wordType}
                            </FetchWord>
                        )
                    }
                })}
            </div>
        </div>
    );
};

export default PromptGenerator;