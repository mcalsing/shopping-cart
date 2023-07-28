const itemToAddInCart = document.querySelector('.cart__items');
const listItems = document.querySelector('.items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

function removeMsgLoadingItems() {
  const removeMsg = document.querySelector('.loading');
  removeMsg.remove();
}

const showProducts = async () => {
  const data = await fetchProducts('computador');
  data.results.forEach(({ id, title, thumbnail }) => {
    const element = createProductItemElement({ sku: id, name: title, image: thumbnail });
    listItems.appendChild(element);
  });
  removeMsgLoadingItems();
}; 

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const itemToRemove = event.target;
  document.querySelector('.cart').firstElementChild.removeChild(itemToRemove);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

async function addProductToCart(event) {
  const itemId = getSkuFromProductItem(event.target.parentElement);
  const { id: sku, title: name, price: salePrice } = await fetchItem(itemId);
  const element = createCartItemElement({ sku, name, salePrice });
  itemToAddInCart.appendChild(element);
  // sumPrice(salePrice);
  // stringFromCart = getPrice(event.target);
  // console.log(stringFromCart);
}

function msgLoadingItems() {
  const loadingMsg = document.createElement('span');
  loadingMsg.className = 'loading';
  loadingMsg.textContent = 'carregando...';
  listItems.appendChild(loadingMsg);
}

window.onload = async () => { 
  msgLoadingItems();
  await showProducts();

  const addCartButtons = document.querySelectorAll('.item__add');
  addCartButtons.forEach((btn) => {
    btn.addEventListener('click', addProductToCart);
  });

  const btnCleanCart = document.querySelector('.empty-cart');
  btnCleanCart.addEventListener('click', () => {
    itemToAddInCart.innerHTML = '';
  });
};
