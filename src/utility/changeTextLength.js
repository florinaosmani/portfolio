/* import { readFileSync } from 'fs';

const file = readFileSync('/Users/flori/Projects/florinaosmani/src/resources/data/bookEx_1.txt', 'utf8');

import editBook from './editBook.js'; */

function changeTextLength (text, len, prevStartIndex) {
    let textLength;
    let startIndex;

    switch (len) {
        case 'short':
            textLength = 500;
            break;
        case 'medium' :
            textLength = 700;
            break;
        case 'long':
            textLength = 900;
            break;
        }
    
    if (!prevStartIndex) {
        startIndex = Math.floor(Math.random() * text.length);
    } else {
        startIndex = prevStartIndex;
    }

    const subText = text.substring(startIndex, (startIndex + textLength));
    const lastSpaceIndex = subText.lastIndexOf(' ');
    const firstSpaceIndex = subText.indexOf(' ');
    const subTextWholeWords = subText.substring(firstSpaceIndex, lastSpaceIndex).trim();
    
    return {
        text: subTextWholeWords,
        newStartIndex: startIndex
    };
};

/* console.log(changeTextLength(editBook(file), 'short', 0)); */


export default changeTextLength;