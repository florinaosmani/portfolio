import { createSlice } from '@reduxjs/toolkit';

const headerSlice = createSlice({
    name: 'header',
    initialState: {
        isOpen: true,
    },
    reducers: {
        closeHeader: (state) => {
            state.isOpen = false;
        },
        openHeader: (state) => {
            state.isOpen = true;
        },
    }
});

export const { closeHeader, openHeader } = headerSlice.actions;
export default headerSlice.reducer;
