const axios = require('axios');
const ISO6391 = require('iso-639-1');
const apiKey = process.env.G_BOOKS_KEY;

function processResponse(response) {
  const results = response.data;
  if (results.totalItems < 1) return { number: 0 }
  const processedResults = { number: results.totalItems, items: [] };
  results.items.forEach(item => {
    const { volumeInfo, accessInfo } = item;
    const { imageLinks, industryIdentifiers } = volumeInfo;
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
    processedResults.items.push({
      title: volumeInfo.title,
      publisher: volumeInfo.publisher,
      description: volumeInfo.description,
      image: imageLinks.thumbnail || imageLinks.smallThumbnail || imageLinks.medium || imageLinks.large || imageLinks.small,
      authors: volumeInfo.authors,
      language: volumeInfo.language ? ISO6391.getName(volumeInfo.language) : undefined,
      isMature: volumeInfo.maturityRating === 'MATURE',
      pageCount: volumeInfo.pageCount,
      isbn,
      viewability: {
        formats: availableFormats,
        level: accessInfo && accessInfo.viewability ?
          accessInfo.viewability === "ALL_PAGES" ? 'Full View' : 'Limited Preview' :
          'No Preview'
      }
    });
  });
  return processedResults;  
}

module.exports = {
  search: query => axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`)
    .then(processResponse)
}