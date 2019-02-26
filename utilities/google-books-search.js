const axios = require('axios');
const ISO6391 = require('iso-639-1');
const apiKey = process.env.G_BOOKS_KEY;

function processResponse(response) {
  const results = response.data;
  if (results.totalItems < 1) return { number: 0 }
  const processedResults = { number: results.totalItems, items: [] };
  results.items.forEach(item => {
    const { volumeInfo, accessInfo } = item;
    if (!volumeInfo) return false;
    const { imageLinks, industryIdentifiers, authors } = volumeInfo;
    const isbn = {};
    industryIdentifiers.forEach(_isbn => _isbn.type === 'ISBN_13' ?
      isbn.isbn13 = _isbn.identifier :
      isbn.isbn10 = _isbn.identifier
    );
    const availableFormats = accessInfo ?
      {
        epub: accessInfo.epub && accessInfo.epub.isAvailable,
        pdf: accessInfo.pdf && accessInfo.pdf.isAvailable
      } :
      false
    const author = undefined;
    if (authors) authors.forEach((author, index) => {
      
    });
    processedResults.items.push({
      title: volumeInfo.title,
      subtitle: volumeInfo.subtitle,
      publisher: volumeInfo.publisher,
      description: volumeInfo.description,
      image: imageLinks.thumbnail || imageLinks.smallThumbnail || imageLinks.medium || imageLinks.large || imageLinks.small,
      authors: volumeInfo.authors,
      language: volumeInfo.language ? ISO6391.getName(volumeInfo.language) : undefined,
      isMature: volumeInfo.maturityRating === 'MATURE',
      pageCount: volumeInfo.pageCount,
      links: {
        preview: volumeInfo.previewLink,
        webReader: accessInfo && accessInfo.webReaderLink,
        info: volumeInfo.infoLink
      },
      isbn,
      viewability: {
        formats: availableFormats,
        level: accessInfo && accessInfo.viewability ?
          accessInfo.viewability === "ALL_PAGES" ? 'Full View' : 'Limited Preview' :
          'No Preview'
      },
      gId: item.id
    });
  });
  return processedResults;  
}

module.exports = {
  search: query => axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`)
    .then(processResponse)
}