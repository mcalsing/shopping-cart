const fetchItem = async (idProduct) => {
  try {
    const url = `https://api.mercadolibre.com/items/${idProduct}`;
    const promiseFetch = await fetch(url);
    const result = await promiseFetch.json();
    return result;
    // console.log(result);
  } catch (error) {
    return error;
  }
};

// fetchItem('MLB1983288877');

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
