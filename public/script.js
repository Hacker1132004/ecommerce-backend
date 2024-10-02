const products = [
    { name: 'Product 1', price: 'RS. 200' },
    { name: 'Product 2', price: 'RS. 350' },
    { name: 'Product 3', price: 'RS. 450' },
];

const productContainer = document.querySelector('.product-list');

products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
        <h3>${product.name}</h3>
        <p>Price: ${product.price}</p>
        <button>Add to Cart</button>
    `;
    productContainer.appendChild(productCard);
});
