let products = [];  
let currentpage = 1;
const numbre_elements_page = 16; 

function displayProducts(page) {
  const startindex = (page - 1) * numbre_elements_page;
  const endindex = startindex + numbre_elements_page;
  const currentProducts = products.slice(startindex, endindex);

  const product_container = document.getElementById("product_container");
  product_container.innerHTML = ""; 

  currentProducts.forEach(product => {
    const productdiv = document.createElement("div");
    productdiv.classList.add("product");
    productdiv.innerHTML = `
      <img src="${product.images[0]}" alt="${product.name}" class="w-full h-[80%] object-cover">
      <div class="mx-2">${product.name}</div>
      <div class="ml-2 text-darkGolden text-xl">${product.price} $</div>
    `;
    
    product_container.appendChild(productdiv);
  });
}

function loadProducts() {
  fetch('../Data/products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log("Fetched products:", data);  
      products = data.products;

      displayProducts(currentpage);
    })
    .catch(error => {
      console.error("Error loading products:", error);
    });
}

loadProducts();
