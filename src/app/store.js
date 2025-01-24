import { configureStore } from "@reduxjs/toolkit";

import headerReducer from '../features/header/headerSlice.js';
import sentenceReducer from '../features/promptGenerator/sentenceSlice.js';

const store = configureStore({
    reducer: {
        header: headerReducer,
        sentence: sentenceReducer,
        
    }
});

export default store;