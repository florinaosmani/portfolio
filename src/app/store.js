import { configureStore } from "@reduxjs/toolkit";

import sentenceReducer from '../features/promptGenerator/sentenceSlice.js';
import poemifyReducer from '../features/poemify/poemifySlice.js';
import touchReducer from '../features/touchSlice.js';

const store = configureStore({
    reducer: {
        touch: touchReducer,
        sentence: sentenceReducer,
        poemify: poemifyReducer,
    },
});


export default store;