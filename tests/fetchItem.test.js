require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  it('Teste se fetchItem e uma funcao', () => {
    expect(typeof fetchItem).toBe('function');
  });
  it('Ao passar o argumento "MLB1615760527" teste se fetchItem foi chamada', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled();
  });
  it('Ao passar o argumento "MLB1615760527" teste se a fetch retorna o endpoint correto', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalled('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('Ao passar o argumento "MLB1615760527", teste se a funcao fetchItem returna uma estrutura de dados igual ao objeto item;', async() => {
    expect(await fetchProducts('MLB1615760527')).toEqual(item);
  });
  it('Ao chamar a funcao fetchItem sem argumento, retorne um erro com a mensagem: "You must provide an url"', async() => {
    expect(await fetchItem()).toEqual(new Error('You must provide an url'));
  });
});
