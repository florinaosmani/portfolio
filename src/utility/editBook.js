/* import { readFileSync } from 'fs';

const file = readFileSync('/Users/flori/Projects/florinaosmani/src/resources/data/bookEx_1.txt', 'utf8'); */

function editBook (book) {
    const regex = /<p>[\s\S]*?<\/p>/g;
    const bracketRegex = /<p\b[^>]*>\s*\[[\s\S]*?\]\s*<\/p>/gs;
    const pTags = book.match(regex);
    const aTagRegex = /<a\b[^>]*>[\s\S]*?<\/a>/gs;
    const emptyTagRegex = /<p>\s*<\/p>/;
    
    const text = pTags.filter(paragraph => {
        if (!paragraph.includes('<strong>')
            && !paragraph.includes('<i>')
            && !paragraph.includes('<br>')
            && !paragraph.includes ('<span')
            && !paragraph.includes ('<small>')
            && !paragraph.includes('This text is a combination of etexts,')
            && !paragraph.match(bracketRegex)
            && !paragraph.match(aTagRegex)
            && !paragraph.match(emptyTagRegex)) {
                return paragraph;
        }
    }).map(paragraph => {
        const noPTags = paragraph.slice(3,-4);
        const noPTagsTrim = noPTags.trim();
        return noPTagsTrim;
    })
    
    return text.join(' ');
    
};

export default editBook;