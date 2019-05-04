const axios = require('axios');
const ISO6391 = require('iso-639-1');
const apiKey = process.env.G_BOOKS_KEY;

function processResponse(response) {

  const results = response.data;
  if (results.totalItems < 1) return { number: 0, items: [] };
  return {
    number: results.totalItems,
    items: results.items.map(processResultItem)
  };
};

function processResultItem(item) {
  const { volumeInfo, accessInfo } = item;
  if (!volumeInfo) return {};
  const { imageLinks, industryIdentifiers } = volumeInfo;
  const isbn = {};
  if (industryIdentifiers) industryIdentifiers.forEach(_isbn =>
    _isbn.type === 'ISBN_13' ?
      isbn.isbn13 = _isbn.identifier :
      isbn.isbn10 = _isbn.identifier
  );
  let viewability;
  if (accessInfo) {
    viewability = {
      availableFormats: {
        epub: accessInfo.epub && accessInfo.epub.isAvailable,
        pdf: accessInfo.pdf && accessInfo.pdf.isAvailable
      }
    };
    switch (accessInfo.viewability) {
      case 'ALL_PAGES':
        viewability.level = 'Full View';
        break;
      case 'PARTIAL':
        viewability.level = 'Limited Preview';
        break;
      case 'NO_PAGES':
        viewability.level = 'No Preview';
        break;
    }
  }
  return {
    title: volumeInfo.title,
    subtitle: volumeInfo.subtitle,
    publisher: volumeInfo.publisher,
    description: volumeInfo.description,
    image: imageLinks ? imageLinks.thumbnail || imageLinks.smallThumbnail || imageLinks.medium || imageLinks.large || imageLinks.small : undefined,
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
    viewability,
    gId: item.id
  }
};

module.exports = {
  search: (query, newestFirst) => {
    const queryUrl = `https://www.googleapis.com/books/v1/volumes?q=${
      query}&key=${apiKey}${newestFirst ? '&orderBy=newest': ''}`
    console.log(queryUrl)
    return axios.get(queryUrl)
      .then(processResponse) 
  }
};