const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const PORT = 8092;

const app = express();


module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());


const referrerPolicy = require('referrer-policy');
app.use(referrerPolicy({policy: 'strict-origin-when-cross-origin'}));



app.options('*', cors());

app.get('/', (request, response) => {
    response.set("Content-Security-Policy", "default-src 'self' https://server-arthurvinot.vercel.app/");
    response.sendFile(__dirname + '/index.html')
  });

app.get('/portfolio.js', (request, response) => {
  response.set("Content-Security-Policy", "default-src 'self' https://server-arthurvinot.vercel.app/");
  response.sendFile(__dirname + '/portfolio.js');

});  

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
