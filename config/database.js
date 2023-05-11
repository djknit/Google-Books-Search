module.exports.connect = function (cb) {
  const mongoose = require('mongoose');

  const MONGODB_URI = getAtlasUri(process.env) || 'mongodb://localhost/googleBooksSearch';
  mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

  const db = mongoose.connection;
  db.on('error', () => console.error('Error connecting to MongoDB.'));
  db.once('open', () => {
    console.log('Database connection was successful');
    if (cb) cb();
  });
};

function getAtlasUri(dbAndUser) {
  const { DB_USER, DB_PASSWORD, DB_NAME, DB_CONNECTION_STRING } = dbAndUser;
  if (DB_CONNECTION_STRING) return DB_CONNECTION_STRING;
  if (!DB_USER) return;
  return (
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.6flzb.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  );
}