import { configureStore } from "@reduxjs/toolkit";
import headerReducer from '../features/header/headerSlice.js';

const store = configureStore({
    reducer: {
        header: headerReducer,

    }
});

export default store;