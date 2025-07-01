// order.js
// Assumes menu.js is loaded or menu data is duplicated here for simplicity
document.addEventListener('DOMContentLoaded', function() {
  // Test log
  console.log("order.js loaded and DOM ready!");

  const menuItems = [
    { name: 'Croissant', price: 2.5 },
    { name: 'Chocolate Éclair', price: 3.0 },
    { name: 'Macaron', price: 2.0 },
    { name: 'Apple Pie', price: 4.0 },
    { name: 'Cheesecake', price: 3.5 },
    { name: 'Tiramisu', price: 4.5 },
    { name: 'Brownie', price: 2.5 },
    { name: 'Carrot Cake', price: 3.0 },
    { name: 'Lemon Tart', price: 3.2 },
    { name: 'Cinnamon Roll', price: 2.8 },
    { name: 'Profiterole', price: 3.2 },
    { name: 'Cupcake', price: 2.2 },
    { name: 'Scone', price: 2.0 },
    { name: 'Baklava', price: 3.5 },
    { name: 'Danish Pastry', price: 3.0 }
  ];

  const productSelect = document.getElementById('product');
  const quantityInput = document.getElementById('quantity');
  const cartSection = document.getElementById('cart-section');
  const cartItemsDiv = document.getElementById('cart-items');
  const cartTotalSpan = document.getElementById('cart-total');
  const orderForm = document.getElementById('order-form');
  const orderSuccess = document.getElementById('order-success');
  let cart = [];

  // Populate product dropdown with prices
  productSelect.innerHTML = '<option value="">Choose a pastry...</option>';
  menuItems.forEach(item => {
    const option = document.createElement('option');
    option.value = item.name;
    option.textContent = `${item.name} (£${item.price.toFixed(2)})`;
    productSelect.appendChild(option);
  });

  // Add item to cart
  function addToCart(productName, quantity) {
    const item = menuItems.find(i => i.name === productName);
    if (!item) return;
    const existing = cart.find(i => i.name === productName);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ name: item.name, price: item.price, quantity });
    }
    updateCartDisplay();
  }

  // Update cart display
  function updateCartDisplay() {
    cartItemsDiv.innerHTML = '';
    if (cart.length === 0) {
      cartSection.style.display = 'none';
      return;
    }
    cartSection.style.display = 'block';
    cart.forEach((item, idx) => {
      const div = document.createElement('div');
      div.className = 'd-flex justify-content-between align-items-center mb-2';
      div.innerHTML = `
        <span>${item.name} x ${item.quantity}</span>
        <span>£${(item.price * item.quantity).toFixed(2)}</span>
        <button class="btn btn-sm btn-danger ms-2" data-idx="${idx}">Remove</button>
      `;
      cartItemsDiv.appendChild(div);
    });
    // Remove item event
    cartItemsDiv.querySelectorAll('button').forEach(btn => {
      btn.onclick = function() {
        cart.splice(+btn.dataset.idx, 1);
        updateCartDisplay();
      };
    });
    // Update total
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    cartTotalSpan.textContent = `£${total.toFixed(2)}`;
  }

  // Handle form submit
  orderForm.onsubmit = function(e) {
    e.preventDefault();
    const product = productSelect.value;
    const quantity = parseInt(quantityInput.value, 10);
    if (!product || !quantity || quantity < 1) return;
    addToCart(product, quantity);
    orderForm.reset();
    orderSuccess.classList.add('d-none');
  };

  // Checkout button
  const checkoutBtn = document.getElementById('checkout-btn');
  checkoutBtn.onclick = function() {
    if (cart.length === 0) return;
    cart = [];
    updateCartDisplay();
    orderSuccess.textContent = 'Thank you for your order! We will contact you soon to confirm.';
    orderSuccess.classList.remove('d-none');
  };

  // Initial cart display
  updateCartDisplay();
}); 