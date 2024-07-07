document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    displayCartItems();
});

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
];

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const productId = parseInt(getQueryParam('id'), 10);

const product = products.find(p => p.id === productId);

if (product) {
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-image').alt = product.name;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-price').textContent = `Price: ${product.price}`;
} else {
    document.querySelector('.product-view .container').innerHTML = '<p>Product not found.</p>';
}

function updateCartCount() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const cartCountElement = document.getElementById('cart-count');
    cartCountElement.textContent = cartItems.length;
}

function displayCartItems() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartTableBody = document.getElementById('cart-table').querySelector('tbody');
    let cartTotal = 0;

    cartTableBody.innerHTML = '';

    if (cartItems.length > 0) {
        cartItems.forEach(item => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td>${item.quantity}</td>
                <td>$${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</td>
                <td><button onclick="removeFromCart(${item.id})">Remove</button></td>
            `;
            cartTableBody.appendChild(row);
            cartTotal += parseFloat(item.price.replace('$', '')) * item.quantity;
        });
        document.getElementById('cart-total').textContent = `Total: $${cartTotal.toFixed(2)}`;
    } else {
        cartTableBody.innerHTML = '<tr><td colspan="5">Your cart is empty.</td></tr>';
        document.getElementById('cart-total').textContent = 'Total: $0.00';
    }
}

function removeFromCart(productId) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems = cartItems.filter(item => item.id !== productId);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    displayCartItems();
}

function addToCart() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const currentItem = {
        id: productId,
        name: product.name,
        price: product.price,
        quantity: 1
    };

    const existingItem = cartItems.find(item => item.id === currentItem.id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push(currentItem);
    }

    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    updateCartCount();
    showCartPopup();
}

function clearCart() {
    localStorage.removeItem('cartItems');
    updateCartCount();
    displayCartItems();
    closeCartPopup();
}

function proceedToViewCart() {
    window.location.href = 'view_cart.html';
}

function showCartPopup() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    let cartItemsList = document.getElementById('cart-items-list');

    if (cartItems.length > 0) {
        cartItemsList.innerHTML = '';
        cartItems.forEach(item => {
            let li = document.createElement('li');
            li.textContent = `${item.name} - ${item.price} (Quantity: ${item.quantity})`;
            cartItemsList.appendChild(li);
        });
    } else {
        cartItemsList.innerHTML = '<p>Your cart is empty.</p>';
    }

    document.getElementById('cart-modal').style.display = 'block';
}

function closeCartPopup() {
    document.getElementById('cart-modal').style.display = 'none';
}
