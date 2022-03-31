const fs = require('fs');
const { MongoClient} = require('mongodb');
require('dotenv').config()


function Doc(){
    const adresse = fs.readFileSync(__dirname + '/adresse.json');
    const montlimart = fs.readFileSync(__dirname + '/montlimart.json');

    const adresseObj = JSON.parse(adresse);
    const montlimartObj = JSON.parse(montlimart);
    
    return [adresseObj,montlimartObj];
}

const username = encodeURIComponent("AVinot");
const password = encodeURIComponent("SNz2qEPpP1CACrbd");
const uri = `mongodb+srv://${username}:${password}@clear-fashion.vsgiu.mongodb.net/db?retryWrites=true&w=majority`;
const client = new MongoClient(uri);
const dbname = 'clear-fashion';


async function sandbox (site = 'https://adresse.paris/630-toute-la-collection?id_category=630&n=116') {
  try {
    const doc = Doc();
    const doc1 = doc[0];
    const doc2 = doc[1];
    
    await client.connect();
    console.log('Connected correctly to server');
    const db =  client.db(dbname);

    const collection = db.collection('products');
    var result = await collection.insertMany(doc1);
    result = await collection.insertMany(doc2);
    //const dele = await collection.remove()

    console.log(result);

    console.log(doc1);
    console.log(doc2);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1)
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);