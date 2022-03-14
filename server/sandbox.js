/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/adresse');
const { MongoClient} = require('mongodb');

const username = encodeURIComponent("AVinot");
const password = encodeURIComponent("SNz2qEPpP1CACrbd");
const uri = `mongodb+srv://${username}:${password}@clear-fashion.vsgiu.mongodb.net/db?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const dbname = 'clear-fashion';


async function sandbox (site = 'https://adresse.paris/630-toute-la-collection?id_category=630&n=123') {
  try {
    console.log(`🕵️‍♀️  browsing ${site} source`);

    const products = await dedicatedbrand.scrape(site);
    
    await client.connect();
    console.log('Connected correctly to server');
    const db =  client.db(dbname);

    const collection = db.collection('products');
    const result = await collection.insertMany(products);

    console.log(result);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1)
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
