require('dotenv').config();
const path = require('path');

// Require server that has been configured w/ middleware
const app = require('./config/server').app;

const PORT = process.env.PORT || 3001;

// Connect to database and create public list document if it doesn't already exist
require('./config/database').connect(() => {
  const PublicList = require('./models').PublicList;
  PublicList.findOne({})
    .then(result => {
      if (!result) PublicList.create({ name: 'Default Public List' })
        .then(result_2 => console.log('Public List document created'));
    });
});

// Routes
const routes = require('./routes');
const router = require('express').Router();
router.use(routes);

router.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.use(router);

app.listen(PORT, () => console.log('Server listening on PORT ' + PORT));