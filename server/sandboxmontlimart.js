/* eslint-disable no-console, no-process-exit */
const montlimart = require('./sources/montlimart');
const fs = require('fs');

async function sandbox (site = 'https://www.montlimart.com/toute-la-collection.html') {
  try {
    console.log(`🕵️‍♀️  browsing ${site} source`);

    const products = await montlimart.scrape(site);

    console.log(products);
    console.log('done');

    const jsonObj = JSON.stringify(products);
    fs.writeFileSync('test.json', jsonObj, 'utf8', function (err) {
      if (err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
