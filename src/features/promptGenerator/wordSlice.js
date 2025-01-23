import { createSlice } from '@reduxjs/toolkit';

const wordSlice = createSlice({
    name: 'word',
    initialState: {
        isEditable: false,
        isHidden: true,
    },
    reducers: {
        makeEditable: (state) => {
            state.isEditable = true;
        },
        makeNotEditable: (state) => {
            state.isEditable = false;
        },
        showButtons: (state) => {
            state.isHidden = false;
        },
        hideButtons: (state) => {
            state.isHidden = true;
        }
    },
});

export const { makeEditable, makeNotEditable, showButtons, hideButtons } = wordSlice.actions;
export default wordSlice.reducer;