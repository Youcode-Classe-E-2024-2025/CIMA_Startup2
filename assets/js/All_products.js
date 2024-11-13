let products = [];
let filteredProducts = [];
let currentpage = 1;
const numbre_elements_page = 16;
let totalpages = 1;
let genderFilter = ""; 
let searchQuery = ""; 

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

function applyFilters() {
  filteredProducts = products.filter(item => {
    const matchesGender = genderFilter ? item.gender && item.gender.toLowerCase() === genderFilter : true;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery);

    return matchesGender && matchesSearch;
  });

  currentpage = 1;
  totalpages = Math.ceil(filteredProducts.length / numbre_elements_page);
  displayProducts(currentpage);
}

document.getElementById("filtermen").addEventListener("click", () => {
  genderFilter = "men"; 
  applyFilters();
  
  document.getElementById("filtermen").classList.add("text-goldenrod");
  document.getElementById("filterwomen").classList.remove("text-goldenrod"); 
});

document.getElementById("filterwomen").addEventListener("click", () => {
  genderFilter = "women";
  applyFilters();
  
  document.getElementById("filterwomen").classList.add("text-goldenrod");
  document.getElementById("filtermen").classList.remove("text-goldenrod"); 
});

document.getElementById("search").addEventListener("input", function () {
  searchQuery = this.value.toLowerCase(); 
  applyFilters();
});

loadProducts();

function filterprice() {
    const sortedProducts = products.sort((a, b) => a.price - b.price);
    currentpage = 1;
    totalpages = Math.ceil(filteredProducts.length / numbre_elements_page);

    displayProducts(currentpage);
}

document.getElementById("filterprice").addEventListener("click", function() {
    filterprice();
    document.getElementById("filterprice").classList.add("text-goldenrod");
});

function filtertitle() {
    filteredProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
    
    currentpage = 1;
    totalpages = Math.ceil(filteredProducts.length / numbre_elements_page);

    displayProducts(currentpage);
}

document.getElementById("filtertitle").addEventListener("click", function() {
    filtertitle();
    document.getElementById("filtertitle").classList.add("text-goldenrod");
});
