/* eslint-disable no-console, no-process-exit */
const adresse = require('./sources/dedicatedbrand');
const fs = require('fs');

async function sandbox (site = 'https://www.dedicatedbrand.com/en/men/news') {
  try {
    console.log(`🕵️‍♀️  browsing ${site} source`);

    const products = await adresse.scrape(site);

    console.log(products);
    console.log('done');
    console.log("Number of products : ",products.length)
    const json_content = JSON.stringify(products);
    fs.writeFileSync("dedicated.json", json_content);
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
