let products = [];
let filteredProducts = []; 
let currentpage = 1;
const numbre_elements_page = 16;
let totalpages = 1;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function displayProducts(page) {
  const startindex = (page - 1) * numbre_elements_page;
  const endindex = startindex + numbre_elements_page;
  const currentProducts = filteredProducts.slice(startindex, endindex);

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

  updatePagination(page);
}

function updatePagination(page) {
  const paginationNumbers = document.getElementById("paginationNumbers");
  paginationNumbers.innerHTML = "";

  for (let i = 1; i <= totalpages; i++) {
    const pageButton = document.createElement("span");
    pageButton.classList.add("px-3", "cursor-pointer", "mx-2", "text-xl", "rounded-full");
    pageButton.textContent = i;

    if (i === page) {
      pageButton.classList.add("bg-yellow-500");
    }

    pageButton.addEventListener("click", () => {
      currentpage = i;
      displayProducts(currentpage);
    });

    paginationNumbers.appendChild(pageButton);
  }
}

function setupNavigation() {
  document.getElementById("prevPage").addEventListener("click", () => {
    if (currentpage > 1) {
      currentpage--;
      displayProducts(currentpage);
    }
  });

  document.getElementById("nextPage").addEventListener("click", () => {
    if (currentpage < totalpages) {
      currentpage++;
      displayProducts(currentpage);
    }
  });
}

function loadProducts() {
  fetch('../Data/products.json')
    .then(response => response.json())
    .then(data => {
      products = data.products;
      shuffleArray(products);

      filteredProducts = products; 
      totalpages = Math.ceil(filteredProducts.length / numbre_elements_page);

      displayProducts(currentpage);
      setupNavigation();
    })
    .catch(error => console.error("Erreur de chargement des produits:", error));
}

document.getElementById("search").addEventListener("input", function () {
  const search_item = this.value.toLowerCase();

  filteredProducts = products.filter(item =>
    item.name.toLowerCase().includes(search_item)
  );
  currentpage = 1;

  displayProducts(currentpage);
});

loadProducts();
