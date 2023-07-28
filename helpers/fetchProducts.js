const fetchProducts = async (search) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${search}`;
    const promiseFetch = await fetch(url);
    const result = await promiseFetch.json();
    return result;
    // console.log(result);
  } catch (error) {
    throw new Error('You must provide an url.');
  }
};

// fetchProducts('computador');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
