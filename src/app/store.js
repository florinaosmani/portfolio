import { configureStore } from "@reduxjs/toolkit";
import headerReducer from '../features/header/headerSlice.js';
import wordReducer from '../features/promptGenerator/wordSlice.js';

const store = configureStore({
    reducer: {
        header: headerReducer,
        word: wordReducer,
        
    }
});

export default store;