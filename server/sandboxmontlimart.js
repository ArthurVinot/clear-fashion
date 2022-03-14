/* eslint-disable no-console, no-process-exit */
const montlimart = require('./sources/montlimart');
const fs = require('fs');

const site_pages = Array.from({length:8}, (_,i) => i + 1);
const sites = [];
site_pages.forEach(element => {
  sites.push(`https://www.montlimart.com/toute-la-collection.html?p=${element}`)
});
console.log(sites);

const site_products = []

async function sandbox (site) {
  try {
    console.log(`🕵️‍♀️  browsing ${site} source`);

    const products = await montlimart.scrape(site);

    console.log(products);
    console.log('done');

    const json_content = JSON.stringify(products);
    site_products.push(json_content);

    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sites.forEach(element => {
  wait sandbox(element)
  .then(console.log("done page: " + element))
  .then(console.log(site_products))
});


//fs.writeFileSync("montlimart.json", site_products.join());