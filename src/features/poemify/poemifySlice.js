import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import bookData from '../../utility/cleanBookData.js';

import editBook from '../../utility/editBook.js';

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
            long: false
        },
        book: {
            wholeText: [],
            text: [],
            author: '',
            title: '',
        },
        poem: {},
        isLoading: false,
        hasError: false,
    },
    reducers: {

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

export const { } = poemifySlice.actions;
export default poemifySlice.reducer;