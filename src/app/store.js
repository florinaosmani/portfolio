import { configureStore } from "@reduxjs/toolkit";

import headerReducer from '../features/header/headerSlice.js';
import sentenceReducer from '../features/promptGenerator/sentenceSlice.js';
import poemifyReducer from '../features/poemify/poemifySlice.js';

const store = configureStore({
    reducer: {
        header: headerReducer,
        sentence: sentenceReducer,
        poemify: poemifyReducer,
    }
});

export default store;