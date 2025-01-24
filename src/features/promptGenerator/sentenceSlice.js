import { createSlice } from '@reduxjs/toolkit';

const sentenceSlice = createSlice({
    name: 'sentence',
    initialState: {
        inputValue: '',
        sentence: [],
    },
    reducers: {
        inputValueChange: (state, action) => {
            state.inputValue = action.payload;
        },
        addWord: (state, action) => {
            let keyId = state.sentence.length;
            
            if (action.payload != '') {
                state.sentence.push({
                    type: 'word',
                    content: action.payload,
                    keyId: keyId,
                    isEditable: false,
                    isHidden: true,
                });
                state.inputValue = '';
            }
        },
        addFetchWord: (state, action) => {
            let keyId = state.sentence.length;
            
            state.sentence.push({
                type: 'fetchWord',
                wordType: action.payload,
                content: '',
                keyId: keyId,
                isLocked: false,
                isHidden: true,
            })
        },
        removeWord: (state, action) => {
            state.sentence = state.sentence.filter((word, index) => index !== action.payload);
            state.sentence = state.sentence.map((word, index) => {
                return {
                    ...word,
                    keyId: index,
                };
            })
        },
        lockToggle: (state, action) => {
            state.sentence[action.payload].isLocked = !state.sentence[action.payload].isLocked;
        },
        makeEditable: (state, action) => {
            state.sentence[action.payload].isEditable = true;
        },
        makeNotEditable: (state, action) => {
            state.sentence[action.payload].isEditable = false;
        },
        showButtons: (state, action) => {
            state.sentence[action.payload].isHidden = false;
        },
        hideButtons: (state, action) => {
            state.sentence[action.payload].isHidden = true;
        },
    },
});

export const { inputValueChange, addWord, addFetchWord, removeWord, lockToggle, makeEditable, makeNotEditable, showButtons, hideButtons } = sentenceSlice.actions;
export default sentenceSlice.reducer;
