const express = require('express');

const PORT = 8092;

const app = express();


module.exports = app;


app.get('/', (request, response) => {
    response.sendFile(__dirname + "/index.html");
  });

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);