import classes from '../../resources/css/features/promptGenerator/promptGenerator.module.css';
import Word from './Word';

import WordButton from './WordButton';

function PromptGenerator () {
    return (
        <div className={classes.promptGenerator}>
            <h1>Prompt Generator</h1>
            <form>
                <input type='text' />
                <button>
                    Add word
                </button>
                <div>
                    <WordButton>
                        Noun
                    </WordButton>
                    <WordButton>
                        Verb
                    </WordButton>
                    <WordButton>
                        Adjective
                    </WordButton>
                    <WordButton>
                        Adverb
                    </WordButton>
                </div>
            </form>
            <div className={classes.sentence}>
                <Word />
            </div>
        </div>
    );
};

export default PromptGenerator;