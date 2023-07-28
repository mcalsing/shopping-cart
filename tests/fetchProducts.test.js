require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  it('Teste se fetchProducts e uma funcao', () => {
    expect(typeof fetchProducts()).toBe('function');
  });
  it('Ao passar o argumento "computador", teste se fetch foi chamada', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalled();
  });
  it('Ao passar o argumento "computador", teste se fetch retorna o endpoint correto', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });
  it('Ao passar o argumento "computador", teste se a funcao fetch retorna um estrutura de dados igual ao objeto computadorSearch', async () => {
    expect(await fetchProducts('computador')).toEqual(computadorSearch);
  });
  it('Ao chamar a funcao fetchProducts sem argumento, retorne um erro com a mensagem: "You must provide an url"', async() => {
    expect(await fetchProducts()).toEqual(new Error('You must provide an url'));
  });
});
