import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import classes from '../../resources/css/features/poemify.module.css';

import { fetchBook } from './poemifySlice';

function Poemify () {
    const { book } = useSelector(state => state.poemify);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBook());
    },[]);

    return (
        <div className={classes.poemify}>
            <h1>Poemify</h1>
            <p>
                {book.wholeText.map(p => {
                    return <p>{p}</p>;
                })}
            </p>
            <div className={classes.columnContainer}>
                <div className={classes.bookSettingContainer}>
                    <div className={classes.settingContainer}>
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
                    <div className={classes.bookSettingContainer}>

                    </div>
                </div>
                <div className={classes.poemContainer}>
                    <div className={classes.poemReset}>
                        <button>
                            Reset Poem
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Poemify;