/* eslint-disable no-console, no-process-exit */
const adresse = require('./sources/adresse');
const fs = require('fs');

async function sandbox (site = 'https://adresse.paris/630-toute-la-collection?id_category=630&n=116') {
  try {
    console.log(`🕵️‍♀️  browsing ${site} source`);

    const products = await adresse.scrape(site);

    console.log(products);
    console.log('done');
    console.log("Number of products : ",products.length)
    const json_content = JSON.stringify(products);
    //fs.writeFileSync("adresse.json", json_content);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
