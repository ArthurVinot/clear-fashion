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

    site_products.push(products);

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;


sites.reduce(async (memo, site) => {
  await memo;
  await sandbox(site);
  console.log("done page: " + site);
  if (site === sites[sites.length-1]) {
    let json_content = site_products.flat();
    fs.writeFileSync("montlimart.json", JSON.stringify(json_content));
  }
}, undefined);

