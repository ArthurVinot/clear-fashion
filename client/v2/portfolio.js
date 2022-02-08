// Invoking strict mode https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode#invoking_strict_mode
'use strict';

// current products on the page
let currentProducts = [];
let currentPagination = {};

// instantiate the selectors
const selectShow = document.querySelector('#show-select');
const selectPage = document.querySelector('#page-select');
const selectBrand = document.querySelector('#brand-select');
const selectDate = document.querySelector('#recently');
const selectPrice = document.querySelector('#price');
const selectSort = document.querySelector('#sort');
const sectionProducts = document.querySelector('#products');
const spanNbProducts = document.querySelector('#nbProducts');


/**
 * Set global value
 * @param {Array} result - products to display
 * @param {Object} meta - pagination meta info
 */
const setCurrentProducts = ({result, meta}) => {
  currentProducts = result;
  currentPagination = meta;
};


/**
 * Fetch products from api
 * @param  {Number}  [page=1] - current page to fetch
 * @param  {Number}  [size=12] - size of the page
 * @return {Object}
 */


/**
 * Render list of products
 * @param  {Array} products
 */
const renderProducts = products => {
  const fragment = document.createDocumentFragment();
  const div = document.createElement('div');
  const template = products
    .map(product => {
      return `
      <div class="product" id=${product.uuid}>
        <span>${product.brand}</span>
        <a href="${product.link}">${product.name}</a>
        <span>${product.price}</span>
      </div>
    `;
    })
    .join('');

  div.innerHTML = template;
  fragment.appendChild(div);
  sectionProducts.innerHTML = '<h2>Products</h2>';
  sectionProducts.appendChild(fragment);
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
  const renderPagination = pagination => {  
  const {currentPage, pageCount} = pagination;
  const options = Array.from(
    {'length': pageCount},
    (value, index) => `<option value="${index + 1}">${index + 1}</option>`
  ).join('');

  selectPage.innerHTML = options;
  selectPage.selectedIndex = currentPage - 1;
};

/**
 * Render page selector
 * @param  {Object} pagination
 */
const renderIndicators = pagination => {
  const {count} = pagination;

  spanNbProducts.innerHTML = count;
};

const render = (products, pagination) => {
  renderProducts(products);
  renderPagination(pagination);
  renderIndicators(pagination);
};

// Request of all API products
const request_products = async () => {
  try {
    var response = await fetch(
      `https://clear-fashion-api.vercel.app?page=1&size=139`
    );
    const body = await response.json();

    if (body.success !== true) {
      console.error(body);
      return {currentProducts, currentPagination};
    }

    return body.data;
  } catch (error) {
    console.error(error);
    return {currentProducts, currentPagination};
  }
}

/**
 * Declaration of all Listeners
 */

/**
 * Select the number of products to display
 */
selectShow.addEventListener('change', async (event) => {
  currentPagination.pageCount = Math.floor(currentPagination.count / event.target.value) + 1;
  currentPagination.pageSize = parseInt(event.target.value);
  render(currentProducts.slice(0, event.target.value), currentPagination);
  selectPage.value = "1";
});

selectPage.addEventListener('change', async (event) => {
  currentPagination.currentPage = parseInt(event.target.value);
  let pageSize = currentPagination.pageSize;
  let currentPage = currentPagination.currentPage;
  let display_product = currentProducts.slice((currentPage-1) * pageSize, currentPage * pageSize);

  render(display_product, currentPagination);
});

selectBrand.addEventListener('change', async (event) => {
  let products = await request_products();
  setCurrentProducts(products);
  if (event.target.value !== "")
    currentProducts = currentProducts.filter(elt => elt.brand === event.target.value);
  currentPagination.count = currentProducts.length;
  currentPagination.pageCount = Math.floor(currentPagination.count / 12) + 1;
  currentPagination.pageSize = 12;
  selectPage.value = "1";
  selectShow.value = "12";
  render(currentProducts.slice(0,12), currentPagination);
});

selectDate.addEventListener('change', async (event) => {
  let min_date = Date.now() - 12096e5*2;
  if (selectDate.checked === true)
    currentProducts = currentProducts.filter(elt => Date.parse(elt.released) > min_date);
  else  {
    let products = await request_products();
    setCurrentProducts(products);
  }

  currentPagination.count = currentProducts.length;
  currentPagination.pageCount = Math.floor(currentPagination.count / 12) + 1;
  currentPagination.pageSize = 12;
  selectPage.value = "1";
  selectShow.value = "12";
  render(currentProducts.slice(0,12), currentPagination);
});

selectPrice.addEventListener('change', async (event) => {
  if (selectPrice.checked === true)
    currentProducts = currentProducts.filter(elt => elt.price < 50);
  else  {
    let products = await request_products();
    setCurrentProducts(products);
  }
  currentPagination.count = currentProducts.length;
  currentPagination.pageCount = Math.floor(currentPagination.count / 12) + 1;
  currentPagination.pageSize = 12;
  selectPage.value = "1";
  selectShow.value = "12";
  render(currentProducts.slice(0,12), currentPagination);
});

selectSort.addEventListener('change', async (event) => {
  switch (event.target.value) {
    case 'price-asc':
      currentProducts = currentProducts.sort((a,b) => a.price - b.price);
      break;
    case 'price-desc':
      currentProducts = currentProducts.sort((a,b) => b.price - a.price);
      break;
    case 'date-asc':
      currentProducts = currentProducts.sort((a,b) => Date.parse(a.released) - Date.parse(b.released));
      break;
    case 'date-desc':
      currentProducts = currentProducts.sort((a,b) => Date.parse(b.released) - Date.parse(a.released));
      break;
  }
  currentPagination.count = currentProducts.length;
  currentPagination.pageCount = Math.floor(currentPagination.count / 12) + 1;
  currentPagination.pageSize = 12;
  selectPage.value = "1";
  selectShow.value = "12";
  render(currentProducts.slice(0,12), currentPagination);
});

document.addEventListener('DOMContentLoaded', async () => {
  let products = await request_products();
  setCurrentProducts(products);
  currentPagination.pageCount = Math.floor(currentPagination.count / 12) + 1;
  currentPagination.pageSize = 12;
  render(currentProducts.slice(0,12), currentPagination);
}); 
