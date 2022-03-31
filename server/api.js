const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
require('dotenv/config');

const testRoute = require('./routes/products');
const pageRequest = require('./routes/client');


const PORT = 8092;

const app = express();


module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.use('/products', testRoute)

app.use('/', pageRequest);

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
