import data from '../resources/data/bookData.js';

const bookData = data.map(({ id, title, authors, formats }) => {
    return {
        id: id,
        title: title,
        author: authors[0].name,
        src: formats['text/html'],
    };
});

export default bookData;