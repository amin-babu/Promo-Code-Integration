
function toggleCart() {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.style.display = cartContainer.style.display === "block" ? "none" : "block";
}


document.getElementById("close-cart").addEventListener("click", () => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.style.display = "none";
});


document.getElementById("checkout").addEventListener("click", () => {
  if (cart.length === 0) {
      alert("Your cart is empty!");
  } else {
      alert("Proceeding to checkout!");
  }
});

document.getElementById("apply-promo-btn").addEventListener("click", applyPromoCode);
