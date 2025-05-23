import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import bookData from '../../utility/cleanBookData.js';

import editBook from '../../utility/editBook.js';
import changeTextLength from '../../utility/changeTextLength.js';

/* todo: IMPORTANT!!!! its so slow bcos im saving the whole text!! instead go ahead
and only fetch the longest section possible which u can then edit or fetch a short section
but somehow save the index of the book and everything so once u change section the whole thign dont change
 */

export const fetchBook = createAsyncThunk(
    'poemify/fetchBook',
    async (arg, thunkAPI) => {
        let randIndex;
        if (!arg) {
            randIndex = Math.floor(Math.random() * bookData.length);
        } else {
            randIndex = arg;
        }
        const id = bookData[randIndex].id;

        try {
            const response = await fetch(`/.netlify/functions/fetchBook?id=${id}`);
            if (response.ok) {
                const wholeText = await response.text();
                const editedText = editBook(wholeText);

                let shortResult = changeTextLength(editedText, 'short', null);
                while (shortResult.text === '') {
                    shortResult = changeTextLength(editedText, 'short', null);
                }
                const { text, newStartIndex } = shortResult;
                const mediumResult = changeTextLength(editedText, 'medium', newStartIndex);
                const longResult = changeTextLength(editedText, 'long', newStartIndex)
                return {
                    shortText: text,
                    mediumText: mediumResult.text,
                    longText: longResult.text,
                    title: bookData[randIndex].title,
                    author: bookData[randIndex].author,
                    bookId: randIndex,
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
            text: '',
            shortText: '',
            mediumText: '',
            longText: '',
            author: '',
            title: '',
            bookId: null,
            selections: [],
        },
        poem: [],
        isLoading: false,
        hasError: false,
        selectionBox: {
            display: 'none',
            top: '',
            left: '',
            topScroll: '',
            initialScroll: '',
        },
        draggedElement: {
            id: '',
            offSetX: '',
            offSetY: '',
        },
        dblClick: false,
    },
    reducers: {
        setTextSection: (state) => {
            let length;
            for (let key in state.textLength) {
                if (state.textLength[key]) {
                    length = key;
                }
            };
            switch(length) {
                case 'short':
                    state.book.text = state.book.shortText;
                    break;
                case 'medium':
                    state.book.text = state.book.mediumText;
                    break;
                case 'long':
                    state.book.text = state.book.longText;
                    break;
                default:
                    break;
            }
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
            /* will first check if part of/the whole selection already exists and replace
             it with the new selection*/
            let bool = false;
            let poemBool = false;
            let removeIndex = [];
            let poemRemoveIndex = [];
            
            state.book.selections.forEach((selection, index) => {
                for(let i = selection.startIndex; i < selection.endIndex; i++) {
                    for(let j = action.payload.startIndex; j < action.payload.endIndex; j++) {
                        if(j === i) {
                            bool = true;
                            removeIndex.push(index);
                            break;
                        }
                    }
                    if(bool) {
                        break;
                    }
                }
            });

            state.poem.forEach((selection, index) => {
                for(let i = selection.startIndex; i < selection.endIndex; i++) {
                    for(let j = action.payload.startIndex; j < action.payload.endIndex; j++) {
                        if(j === i) {
                            poemBool = true;
                            poemRemoveIndex.push(index);
                            break;
                        }
                    }
                    if(poemBool) {
                        break;
                    }
                }
            });

            if (bool) {
                state.book.selections = state.book.selections.filter((selection, index) => {
                    return !removeIndex.some(i => i === index);
                });
                state.book.selections.push({
                    content: action.payload.content,
                    startIndex: action.payload.startIndex,
                    endIndex: action.payload.endIndex,
                    initPosLeft: action.payload.initPosLeft,
                    initPosRight: action.payload.initPosRight,
                    initPosTop: action.payload.initPosTop,
                    initPosBottom: action.payload.initPosBottom,
                });
            } else if (poemBool) {
                state.poem = state.poem.filter((selection, index) => {
                    return !poemRemoveIndex.some(i => i === index);
                });
                state.book.selections.push({
                    content: action.payload.content,
                    startIndex: action.payload.startIndex,
                    endIndex: action.payload.endIndex,
                    initPosLeft: action.payload.initPosLeft,
                    initPosRight: action.payload.initPosRight,
                    initPosTop: action.payload.initPosTop,
                    initPosBottom: action.payload.initPosBottom,
                });
            } else {
                state.book.selections.push({
                    content: action.payload.content,
                    startIndex: action.payload.startIndex,
                    endIndex: action.payload.endIndex,
                    initPosLeft: action.payload.initPosLeft,
                    initPosRight: action.payload.initPosRight,
                    initPosTop: action.payload.initPosTop,
                    initPosBottom: action.payload.initPosBottom,
                });
            }
        },
        removeSelection: (state) => {
            state.book.selections = [];
        },
        removeSingleSelection: (state, action) => {
            state.book.selections.splice(action.payload, 1);
        },
        addWord: (state, action) => {
            const [type, index] = action.payload.id.split('_');
            if(type === 'id') {
                const wordObj = state.book.selections[index];
                state.book.selections.splice(index, 1);
                state.poem.push({
                    ...wordObj,
                    xPosition: action.payload.xPosition,
                    yPosition: action.payload.yPosition,
                    initPosLeft: action.payload.initPosLeft,
                    initPosRight: action.payload.initPosRight,
                    initPosTop: action.payload.initPosTop,
                    initPosBottom: action.payload.initPosBottom,
                });
            } else {
                const poemObj = state.poem[index];
                state.poem.splice(index, 1);
                state.poem.push({
                    ...poemObj,
                    xPosition: action.payload.xPosition,
                    yPosition: action.payload.yPosition,
                    initPosLeft: action.payload.initPosLeft,
                    initPosRight: action.payload.initPosRight,
                    initPosTop: action.payload.initPosTop,
                    initPosBottom: action.payload.initPosBottom,
                });
            }
        },
        removeWord: (state, action) => {
            const { content, startIndex, endIndex, initPosLeft, initPosRight, initPosTop, initPosBottom } = state.poem[action.payload];
            state.poem.splice(action.payload, 1);
            state.book.selections.push({
                content: content,
                startIndex: startIndex,
                endIndex: endIndex,
                initPosLeft: initPosLeft,
                initPosRight: initPosRight,
                initPosTop: initPosTop,
                initPosBottom: initPosBottom,
            });
        },
        resetPoem : (state) => {
            state.poem.forEach(word => {
                state.book.selections.push({
                    content: word.content,
                    startIndex: word.startIndex,
                    endIndex: word.endIndex,
                    initPosLeft: word.initPosLeft,
                    initPosRight: word.initPosRight,
                    initPosTop: word.initPosTop,
                    initPosBottom: word.initPosBottom,
                })
            });
            state.poem = [];
        },
        showSelectionBox : (state, action) => {
            state.selectionBox.left = action.payload.leftPosition;
            state.selectionBox.top = action.payload.topPosition;
            state.selectionBox.topScroll = action.payload.topScroll;
            state.selectionBox.initialScroll = action.payload.initialScroll;
            state.selectionBox.display = 'flex';
        },
        hideSelectionBox : (state) => {
            state.selectionBox.display = 'none';
            state.selectionBox.left = '';
            state.selectionBox.top = '';
            state.selectionBox.topScroll = '';
            state.selectionBox.initialScroll = '';

        },
        updateScroll: (state, action) => {
            state.selectionBox.topScroll = action.payload;
        },
        setDraggingElement: (state, action) => {
            state.draggedElement.id = action.payload.id;
            state.draggedElement.offSetX = action.payload.offSetX;
            state.draggedElement.offSetY = action.payload.offSetY;
        },
        setDblClick: (state, action) => {
            state.dblClick = action.paylaod;
        }
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
                state.book.shortText = action.payload.shortText;
                state.book.mediumText = action.payload.mediumText;
                state.book.longText = action.payload.longText;
                state.book.author = action.payload.author;
                state.book.title = action.payload.title;
                state.book.bookId = action.payload.bookId;
            })
            .addCase(fetchBook.rejected, (state) => {
                state.isLoading = false;
                state.hasError = true;
            })
    }
});

export const { setDblClick, setDraggingElement, updateScroll, hideSelectionBox, showSelectionBox, setTextSection, setTextLength, setSelection, removeSelection, addWord, removeWord, resetPoem, removeSingleSelection } = poemifySlice.actions;
export default poemifySlice.reducer;