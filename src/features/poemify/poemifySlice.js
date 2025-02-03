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
        textLength: 'short',
        book: {
            wholeText: '',
            text: '',
            startIndex: null,
            author: '',
            title: '',
        },
        poem: {},
        isLoading: false,
        hasError: false,
    },
    reducers: {
        setTextLength: (state) => {
            const wholeText = state.book.wholeText;
            const length = state.textLength;
            const startIndex = state.book.startIndex;
            const { text, newStartIndex } = changeTextLength(wholeText, length, startIndex);
            state.book.text = text;
            state.book.startIndex = newStartIndex;
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

export const { setTextLength } = poemifySlice.actions;
export default poemifySlice.reducer;