const express = require('express');
const bodyParser = require('body-parser');

const router = require('./server/routes/router');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', router);

const port = 3000;
app.listen(port, () => { console.log(`Listening on port ${port}`); });