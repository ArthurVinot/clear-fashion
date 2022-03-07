/* eslint-disable no-console, no-process-exit */
const montlimart = require('./sources/montlimart');

async function sandbox (site = 'https://www.montlimart.com/polos-t-shirts') {
  try {
    console.log(`🕵️‍♀️  browsing ${site} source`);

    const products = await montlimart.scrape(site);

    console.log(products);
    console.log('done');
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

const [,, eshop] = process.argv;

sandbox(eshop);
