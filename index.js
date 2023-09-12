const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
require('dotenv').config();
const fileUpload = require('express-fileupload');

const PORT = process.env.PORT || 3500;

// Middleware
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(cors());
app.use(fileUpload());

// Routes
const routes = [
  require('./src/routers/users')
];

for (const route of routes) {
  app.use(route);
}

// Default route
app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' });
});

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});