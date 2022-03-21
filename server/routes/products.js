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


router.get('/search/:id',async (request, response) => {
    let collection = await DB_Connection();
    const result = await collection.findOne({_id: request.params.id});
    console.log(result);
    response.send(result);
  });

router.get('/search', async (request, response) => {
    let collection = await DB_Connection();
    let brand = request.query.brand;
    if (request.query.brand === undefined) brand = '';

    const collection_result = collection.find({brand: request.query.brand, price: {$lt: parseInt(request.query.price)}}).sort({price : 1}).limit(parseInt(request.query.limit));
    const res = await collection_result.toArray();
    console.log("La query retourne ça: " + request.query.test);
    response.send(res);
});




module.exports = router;