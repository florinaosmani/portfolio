import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchWord = createAsyncThunk(
    'sentence/fetchWord',
    async (arg, { rejectWithValue }) => {
        try {
            const response = await fetch('/.netlify/functions/fetchWord');
            if (response.ok) {
                const data = await response.json();
                return data.data.word;
            }
            return rejectWithValue("Couldn't fetch a word.");
        } catch (error) {
            return rejectWithValue('Something went wrong :(');
        }
    }
);

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
                isLoading: false,
                hasError: false,
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
    extraReducers: (builder) => {
        builder
            .addCase(fetchWord.pending, (state, action) => {
                state.sentence[action.meta.arg].isLoading = true;
                state.sentence[action.meta.arg].hasError = false;
            })
            .addCase(fetchWord.fulfilled, (state, action) => {
                state.sentence[action.meta.arg].isLoading = false;
                state.sentence[action.meta.arg].hasError = false;
                state.sentence[action.meta.arg].content = action.payload;
            })
            .addCase(fetchWord.rejected, (state, action) => {
                state.sentence[action.meta.arg].isLoading = false;
                state.sentence[action.meta.arg].hasError = false;
            })
    },
});

export const { inputValueChange, addWord, addFetchWord, removeWord, lockToggle, makeEditable, makeNotEditable, showButtons, hideButtons } = sentenceSlice.actions;
export default sentenceSlice.reducer;
