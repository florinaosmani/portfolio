function editBook (book) {
    const regex = /<p>[\s\S]*?<\/p>/g;
    const bracketRegex = /<p\b[^>]*>\s*\[[\s\S]*?\]\s*<\/p>/gs;
    const pTags = book.match(regex);
    const aTagRegex = /<a\b[^>]*>[\s\S]*?<\/a>/gs;
    const emptyTagRegex = /<p>\s*<\/p>/;
    
    const paragraphs = pTags.filter(paragraph => {
        if (!paragraph.includes('<strong>')
            && !paragraph.includes('<i>')
            && !paragraph.includes('<br>')
            && !paragraph.includes('This text is a combination of etexts,')
            && !paragraph.match(bracketRegex)
            && !paragraph.match(aTagRegex)
            && !paragraph.match(emptyTagRegex)) {
                return paragraph;
        }
    })
    return paragraphs;
};


export default editBook;