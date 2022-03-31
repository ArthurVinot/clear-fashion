const express = require('express');
const {MongoClient} = require('mongodb');

const router = express.Router();

async function DB_Connection() {
    const MONGODB_DB_NAME = 'clear-fashion';
    const MONGODB_COLLECTION = 'products';
    const client = new MongoClient(process.env.MONGO_DB_CREDS);  
  
    console.log("Trying to connet to db");
    await client.connect();
  
    const collection = client.db(MONGODB_DB_NAME).collection(MONGODB_COLLECTION);
    
    return collection;
  }

  router.get('/', async (request, response) => {
    let collection = await DB_Connection();
    let page = parseInt(request.query.page);
    let size = parseInt(request.query.size);

    const collection_result = collection.find().sort().skip(page > 0 ? ( ( page - 1 ) * size) : 0).limit(size);
    const res = await collection_result.toArray();
    console.log("La query retourne ça: " + request.query.test);
    response.send(res);
});




module.exports = router;