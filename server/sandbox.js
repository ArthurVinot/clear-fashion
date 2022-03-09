/* eslint-disable no-console, no-process-exit */
const dedicatedbrand = require('./sources/dedicatedbrand');
const { MongoClient, ServerApiVersion } = require('mongodb');

const username = encodeURIComponent("AVinot");
const password = encodeURIComponent("SNz2qEPpP1CACrbd");


async function sandbox (site = 'https://www.dedicatedbrand.com/en/men/all-men/') {
  try {
    console.log(`🕵️‍♀️  browsing ${site} source`);

    const products = await dedicatedbrand.scrape(site);
    
    const uri = `mongodb+srv://${username}:${password}@clear-fashion.vsgiu.mongodb.net/db?retryWrites=true&w=majority`;
    const client = await MongoClient.connect(uri, {'useNewUrlParser': true});
    const db =  client.db('db')

    const collection = db.collection('test');
    const result = collection.insertMany(products);
    collection.insertMany(products);

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
