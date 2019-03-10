const PublicList = require('../models/PublicList');

function createPublicList() {
  PublicList.create({ name: 'Default Public List' })
    .then(result => console.log(result))
    .catch(err => console.log(err));
}

require('../config/database').connect(createPublicList); 