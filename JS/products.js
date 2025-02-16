document.addEventListener("DOMContentLoaded", () => {
  fetchProducts();
});

async function fetchProducts() {
  try {
      const response = await fetch("https://fakestoreapi.com/products");
      const products = await response.json();
      displayProducts(products);
  } catch (error) {
      console.error("Error fetching products:", error);
  }
}

function displayProducts(products) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  products.forEach(product => {
      const productElement = document.createElement("div");
      productElement.classList.add("product");
      productElement.innerHTML = `
          <img src="${product.image}" alt="${product.title}">
          <h3>${product.title}</h3>
          <p class="p-des">${product.description.slice(0, 50)}...</p>
          <p class="p-price"><strong>$${product.price}</strong></p>
          <button onclick="addToCart(${product.id}, '${product.title}', ${product.price}, '${product.image}')">Add to Cart</button>
      `;
      container.appendChild(productElement);
  });
}