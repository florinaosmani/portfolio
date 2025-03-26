import { createSlice } from "@reduxjs/toolkit";

const touchSlice = createSlice({
    name: 'touch',
    initialState: {
        isTouch: false,
    },
    reducers: {
        checkIfTouch: (state, action) => {
            state.isTouch = action.payload;
        },
    }
});

export default touchSlice.reducer;
export const { checkIfTouch } = touchSlice.actions;
