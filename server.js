require('dotenv').config();

// Require server that has been configured w/ middleware
const app = require('./config/server').app;

const PORT = process.env.PORT || 3001;

// Connect to database
require('./config/database').connect();
require('./models');

// Routes
const routes = require('./routes');
const router = require('express').Router();
router.use(routes);

app.use(router);

app.listen(PORT, () => console.log('Server listening on PORT ' + PORT));