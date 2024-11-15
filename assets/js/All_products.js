let products = [];
let filteredProducts = [];
let currentpage = 1;
const numbre_elements_page = 16;
let totalpages = 1;
let genderFilter = ""; 
let searchQuery = ""; 
let categoryFilter = ""; 

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
    const matchesCategory = categoryFilter ? item.category.toLowerCase() === categoryFilter : true;

    return matchesGender && matchesSearch && matchesCategory;
  });

  currentpage = 1;
  totalpages = Math.ceil(filteredProducts.length / numbre_elements_page);
  displayProducts(currentpage);
}

function resetFilters() {
  const filters = document.querySelectorAll("#filtermen, #filterwomen, #filterprice, #filtertitle, #filtercategory");
  filters.forEach(filter => filter.classList.remove("text-goldenrod"));
}

document.getElementById("filtermen").addEventListener("click", () => {
  if (genderFilter === "men") {
    genderFilter = "";
  } else {
    genderFilter = "men";
  }
  resetFilters();
  if (genderFilter) document.getElementById("filtermen").classList.add("text-goldenrod");
  applyFilters();
});

document.getElementById("filterwomen").addEventListener("click", () => {
  if (genderFilter === "women") {
    genderFilter = "";
  } else {
    genderFilter = "women";
  }
  resetFilters();
  if (genderFilter) document.getElementById("filterwomen").classList.add("text-goldenrod");
  applyFilters();
});

document.getElementById("filterprice").addEventListener("click", function() {
  if (this.classList.contains("text-goldenrod")) {
    resetFilters();
    filteredProducts = products;
  } else {
    resetFilters();
    filterprice();
    this.classList.add("text-goldenrod");
  }
  applyFilters();
});

document.getElementById("filtertitle").addEventListener("click", function() {
  if (this.classList.contains("text-goldenrod")) {
    resetFilters();
    filteredProducts = products;
  } else {
    resetFilters();
    filtertitle();
    this.classList.add("text-goldenrod");
  }
  applyFilters();
});

document.getElementById("filtercategory").addEventListener("click", function() {
  const categories = ["Watches", "Rings", "Necklaces", "Bracelets"];
  
  const categoryList = document.createElement("div");
  categoryList.classList.add("absolute", "top-16", "bg-white", "shadow-lg", "rounded-md", "w-30", "mt-20", "font-normal", "text-sm");
  
  const existingList = this.querySelector("div");
  if (existingList) {
    this.removeChild(existingList);
    return; 
  }

  categories.forEach(category => {
    const categoryItem = document.createElement("div");
    categoryItem.classList.add("cursor-pointer", "px-4", "py-2", "hover:bg-yellow-500");
    categoryItem.textContent = category;

    categoryItem.addEventListener("click", () => {
      if (categoryFilter === category.toLowerCase()) {
        categoryFilter = "";
      } else {
        categoryFilter = category.toLowerCase();
      }
      resetFilters();
      if (categoryFilter) document.getElementById("filtercategory").classList.add("text-goldenrod");
      applyFilters();

      if (this.contains(categoryList)) {
        this.removeChild(categoryList);
      }
    });

    categoryList.appendChild(categoryItem);
  });

  this.appendChild(categoryList);
});

document.getElementById("search").addEventListener("input", function () {
  searchQuery = this.value.toLowerCase(); 
  applyFilters();
});

function filterprice() {
  const sortedProducts = products.sort((a, b) => a.price - b.price);
  filteredProducts = sortedProducts; 
  currentpage = 1;
  totalpages = Math.ceil(filteredProducts.length / numbre_elements_page);

  displayProducts(currentpage);
}

function filtertitle() {
  filteredProducts = filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  currentpage = 1;
  totalpages = Math.ceil(filteredProducts.length / numbre_elements_page);

  displayProducts(currentpage);
}

loadProducts();
