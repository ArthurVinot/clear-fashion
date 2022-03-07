/* eslint-disable no-console, no-process-exit */
const adresse = require('./sources/adresse');

async function sandbox (site = 'https://adresse.paris/608-pulls-et-sweatshirts') {
  try {
    console.log(`🕵️‍♀️  browsing ${site} source`);

    const products = await adresse.scrape(site);

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
