import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import bookData from '../../utility/cleanBookData.js';

import editBook from '../../utility/editBook.js';
import changeTextLength from '../../utility/changeTextLength.js';

export const fetchBook = createAsyncThunk(
    'poemify/fetchBook',
    async (arg, thunkAPI) => {
        const randIndex = Math.floor(Math.random() * bookData.length);
        const id = bookData[randIndex].id;

        try {
            const response = await fetch(`/.netlify/functions/fetchBook?id=${id}`);
            if (response.ok) {
                const text = await response.text();
                const editedText = editBook(text);

                return {
                    text: editedText,
                    title: bookData[randIndex].title,
                    author: bookData[randIndex].author
                };
            }
            throw new Error('Something went wrong');
        } catch (e) {
            console.log(e);
        }
    }
);

const poemifySlice = createSlice({
    name: 'poemify',
    initialState: {
        textLength: {
            short: true,
            medium: false,
            long: false,
        },
        book: {
            wholeText: '',
            text: '',
            startIndex: 0,
            author: '',
            title: '',
            selections: [],
        },
        poem: {},
        isLoading: false,
        hasError: false,
    },
    reducers: {
        setTextSection: (state, action) => {
            if (action.payload === 'new') {
                state.book.startIndex = null;
            }
            let length;
            for (let key in state.textLength) {
                if (state.textLength[key]) {
                    length = key;
                }
            };
            const wholeText = state.book.wholeText;
            const oldStartIndex = state.book.startIndex;
            const { text, newStartIndex } = changeTextLength(wholeText, length, oldStartIndex);
            state.book.text = text;
            state.book.startIndex = newStartIndex;
        },
        setTextLength: (state, action) => {
            switch(action.payload) {
                case 'short':
                    state.textLength.short = true;
                    state.textLength.medium = false;
                    state.textLength.long = false;
                    break;
                case 'medium':
                    state.textLength.short = false;
                    state.textLength.medium = true;
                    state.textLength.long = false;
                    break;
                case 'long':
                    state.textLength.short = false;
                    state.textLength.medium = false;
                    state.textLength.long = true;
                    break;
                default:
                    break;
            }
        }, 
        setSelection: (state, action) => {
            state.book.selections.push({
                content: action.payload.content,
                startIndex: action.payload.startIndex,
                endIndex: action.payload.endIndex,
            });
        },
        removeSelection: (state) => {
            state.book.selections = [];
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBook.pending, (state) => {
                state.isLoading = true;
                state.hasError = false;
            })
            .addCase(fetchBook.fulfilled, (state, action) => {
                state.isLoading = false;
                state.hasError = false;
                state.book.wholeText = action.payload.text;
                state.book.author = action.payload.author;
                state.book.title = action.payload.title;
            })
            .addCase(fetchBook.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    }
});

export const { setTextSection, setTextLength, setSelection, removeSelection } = poemifySlice.actions;
export default poemifySlice.reducer;