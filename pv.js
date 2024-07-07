// product-view.js

// Dummy product data
const products = [
    {
        id: 1,
        name: 'Jacobs',
        image: 'container.jpeg',
        description: 'Full description of Product 1 with more details.',
        price: '$XX.XX'
    },
    {
        id: 2,
        name: 'Product 2 Name',
        image: 'product2.jpg',
        description: 'Full description of Product 2 with more details.',
        price: '$XX.XX'
    }
    // Add more product objects as needed
];

// Function to get query parameter by name
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get product ID from query parameter
const productId = parseInt(getQueryParam('id'), 10);

// Find the product by ID
const product = products.find(p => p.id === productId);

// Update the page content with product details
if (product) {
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-image').alt = product.name;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-price').textContent = `Price: ${product.price}`;
} else {
    document.querySelector('.product-view .container').innerHTML = '<p>Product not found.</p>';
}