import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';


export const fetchWord = createAsyncThunk(
    'sentence/fetchWord',
    async ({ index, type }, thunkAPI) => {
        try {
            const response = await fetch(`/.netlify/functions/fetchWord?type=${type}`);
            if (response.ok) {
                const data = await response.json();
                return {
                    index: index,
                    content: data.data.word};
            } else {
                return thunkAPI.rejectWithValue(index);
            }
        } catch (error) {
            return thunkAPI.rejectWithValue(index);
        }
    }
);

const sentenceSlice = createSlice({
    name: 'sentence',
    initialState: {
        inputValue: '',
        sentence: [],
        hasError: false,
        isLoading: false,
        fetchWords: [],
        hasSpace: false,
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
                isEditable: false,
            });

            state.fetchWords.push({
                index: keyId,
                content: '',
            });
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
        removeAll: (state) => {
            state.sentence = [];
            state.fetchWords = [];
        },
        updateAll: (state) => {
            state.fetchWords.map(word => {
                state.sentence[word.index].content = word.content;
            });
            state.isLoading = false;
        },
        toggleHasSpace: (state) => {
            state.hasSpace = !state.hasSpace;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWord.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchWord.fulfilled, (state, action) => {
                state.hasError = false;
                state.fetchWords.push({
                    index: action.payload.index,
                    content: action.payload.content,
                });
            })
            .addCase(fetchWord.rejected, (state, action) => {
                state.hasError = true;
                state.fetchWords[action.payload].content = ':(';
            })
    },
});

export const { toggleHasSpace, inputValueChange, addWord, addFetchWord, removeWord, lockToggle, makeEditable, makeNotEditable, showButtons, hideButtons, removeAll, updateAll } = sentenceSlice.actions;
export default sentenceSlice.reducer;
