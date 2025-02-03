import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import classes from '../../resources/css/features/poemify.module.css';

import { fetchBook, setTextLength } from './poemifySlice';

function Poemify () {
    const { book } = useSelector(state => state.poemify);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetch = async () => {
            const response = await dispatch(fetchBook()).unwrap();
            dispatch(setTextLength());
        };
        fetch();
    },[]);

    return (
        <div className={classes.poemify}>
            <h1>Poemify</h1>
            <div className={classes.columnsContainer}>
                <div className={`${classes.bookContainer} ${classes.stuffContainer}`}>
                    <div className={classes.bookSettingContainer}>
                        <button>
                            New Book
                        </button>
                        <button>
                            New Section
                        </button>
                        <button>
                            Short
                        </button>
                        <button>
                            Medium
                        </button>
                        <button>
                            Long
                        </button>
                    </div>
                    <div className={classes.bookDataContainer}>
                        <div className={classes.titleAuthorContainer}>

                        </div>
                        <div className={classes.textContainer}>
                            {book.text}
                        </div>
                    </div>
                </div>
                <div className={`${classes.poemContainer} ${classes.stuffContainer}`}> {/*please im runnning out of ways to name containers :(((((*/}
                    <div className={classes.poemReset}>
                        <button>
                            Reset Poem
                        </button>
                    </div>
                    <div className={classes.poemTextContainer}>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Poemify;