const fetch = require('node-fetch');
const cheerio = require('cheerio');
const pretty = require("pretty");

/**
 * Parse webpage e-shop
 * @param  {String} data - html response
 * @return {Array} products
 */
const parse = data => {
  const $ = cheerio.load(data);
  return $('ul.product_list.grid.row li')
    .map((i, element) => {
      const name = $(element)
        .find('.right-block .product-name')
        .text()
        .trim()
        .replace(/\s/g, ' ')
        .replace(/.+?(?=\s{2,})/, '')
        .trim();
      const price = parseInt(
        $(element)
          .find('.price.product-price')
          .text()
      );

      if (name === '') {
        return null
      }
      else
        return {brand:'adresse',name, price};

    })
    .get();
};

/**
 * Scrape all the products for a given url page
 * @param  {[type]}  url
 * @return {Array|null}
 */
module.exports.scrape = async url => {
  try {
    const response = await fetch(url);

    if (response.ok) {
      const body = await response.text();

      return parse(body);
    }

    console.error(response);

    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};
