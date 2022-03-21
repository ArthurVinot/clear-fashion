const { query } = require('express');
const express = require('express');
const {MongoClient} = require('mongodb');
const { request, response } = require('../api');

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

router.get('/search/:id',async (request, response) => {
    let collection = await DB_Connection();
    const result = await collection.findOne({_id: request.params.id});
    console.log(result);
    response.send(result);
  });

router.get('/search', async (request, response) => {
    let collection = await DB_Connection();
    const collection_result = collection.find({brand: request.query.brand, price: {$lt: parseInt(request.query.price)}}).limit(parseInt(request.query.limit));
    const res = await collection_result.toArray();
    console.log(res);
    response.send(res);
});




module.exports = router;