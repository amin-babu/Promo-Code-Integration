// Save cart to localStorage
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Initialize cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
console.log("Cart on load:", cart);  // Debugging: Check if cart is loaded properly

// Update Cart UI
function updateCartUI() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const cartCount = document.getElementById("cart-count");
  const subtotalPriceElement = document.getElementById("subtotal-price");
  const discountElement = document.getElementById("discount-amount");
  const finalTotalElement = document.getElementById("final-total");

  // Reset the cart items container and totals
  cartItemsContainer.innerHTML = "";
  let subtotal = 0;

  // Ensure cart has valid data and loop through each item
  cart.forEach(item => {
    subtotal += item.price * item.quantity; // Calculate subtotal based on quantity and price
    const cartItem = document.createElement("div");
    cartItem.innerHTML = `            
      <div id="main">
        <img src="${item.image}" width="50">
        <p>${item.title} - $${item.price} x ${item.quantity}</p>
        <button id="extra" onclick="removeFromCart(${item.id})">Remove</button>
        <div class="quantity-controls">
          <button onclick="decreaseQuantity(${item.id})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQuantity(${item.id})">+</button>
        </div>  
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });

  // Check the cart content here for debugging
  console.log("Updated Cart:", cart);
  
  // Update cart count
  cartCount.textContent = cart.length; 

  // Calculate discount and final total
  const discount = subtotal * discountAmount;
  const finalTotal = subtotal - discount;

  // Debugging the calculated values
  console.log("Subtotal:", subtotal);
  console.log("Discount:", discount);
  console.log("Final Total:", finalTotal);

  // Display Subtotal, Discount, and Final Total
  subtotalPriceElement.textContent = subtotal.toFixed(2);
  totalPriceElement.textContent = subtotal.toFixed(2);  // Display subtotal in navbar
  discountElement.textContent = `Discount: $${discount.toFixed(2)}`;
  finalTotalElement.textContent = `$${finalTotal.toFixed(2)}`;
}

// Add item to cart
function addToCart(id, title, price, image) {
  const existingItem = cart.find(item => item.id === id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id, title, price, image, quantity: 1 });
  }
  saveCart();
  updateCartUI();
}

// Remove item from cart
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  saveCart();
  updateCartUI();
}

// Increase item quantity
function increaseQuantity(id) {
  const item = cart.find(item => item.id === id);
  if (item) {
    item.quantity += 1;
    saveCart();
    updateCartUI();
  }
}

// Decrease item quantity
function decreaseQuantity(id) {
  const item = cart.find(item => item.id === id);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    saveCart();
    updateCartUI();
  }
}

// Clear cart
document.getElementById("clear-cart").addEventListener("click", () => {
  cart = [];
  saveCart();
  updateCartUI();
});

// Promo code logic
let promoCodeUsed = false;
const validPromoCodes = {
  "ostad10": 0.10,  // 10% discount
  "ostad5": 0.05    // 5% discount
};

let discountAmount = 0;

// Apply promo code
function applyPromoCode() {
  const promoCode = document.getElementById("promo-code").value.trim().toLowerCase();
  const promoMessage = document.getElementById("promo-message");

  if (promoCodeUsed) {
    promoMessage.textContent = "Promo code has already been applied!";
    promoMessage.style.color = "red";
    return;
  }

  if (validPromoCodes[promoCode]) {
    discountAmount = validPromoCodes[promoCode];
    promoCodeUsed = true;
    promoMessage.textContent = `Promo code applied! You get ${validPromoCodes[promoCode] * 100}% off.`;
    promoMessage.style.color = "green";
    updateCartUI();
  } else {
    promoMessage.textContent = "Invalid promo code.";
    promoMessage.style.color = "red";
  }
}

// Add event listener for applying promo code
document.getElementById('apply-promo-btn').addEventListener('click', applyPromoCode);
