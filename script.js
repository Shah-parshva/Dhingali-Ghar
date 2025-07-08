document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE MENU (HAMBURGER) ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- SHOPPING CART LOGIC ---
    let cart = [];

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeButton = document.querySelector('.close-button');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCountSpan = document.getElementById('cart-count');
    const cartTotalSpan = document.getElementById('cart-total');

    // Add item to cart
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const card = event.target.closest('.product-card');
            const id = card.dataset.id;
            const name = card.dataset.name;
            const price = parseFloat(card.dataset.price);

            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }
            
            updateCart();
        });
    });

    // Update cart UI
    function updateCart() {
        cartItemsContainer.innerHTML = ''; // Clear previous items
        let total = 0;
        let totalItems = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.classList.add('cart-item');
                itemElement.innerHTML = `
                    <span>${item.name} (x${item.quantity})</span>
                    <span>$${(item.price * item.quantity).toFixed(2)}</span>
                `;
                cartItemsContainer.appendChild(itemElement);
                total += item.price * item.quantity;
                totalItems += item.quantity;
            });
        }

        cartTotalSpan.textContent = total.toFixed(2);
        cartCountSpan.textContent = totalItems;
    }

    // Show/Hide Cart Modal
    cartButton.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    closeButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Initial cart update on page load
    updateCart();
});