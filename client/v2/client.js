const express = require('express');

const PORT = 8092;

const app = express();


module.exports = app;


app.get('/', (request, response) => {
    response.send('Hello Word');
  });

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);