// Global variables
let products = [];
let filteredProducts = [];
let currentpage = 1;
const numbre_elements_page = 16;
let totalpages = 1;
let genderFilter = "";
let searchQuery = "";
let categoryFilter = "";
let currentSort = "";

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
    
    const detailPageUrl = new URL('Descri_page.html', window.location.href);
    detailPageUrl.searchParams.set('id', product.id);
    
    productdiv.innerHTML = `
      <a href="${detailPageUrl.toString()}"><img src="${product.images[0]}" alt="${product.name}" class="w-full h-[80%] object-cover"></a>
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

    if (i < totalpages) {
      const dot = document.createElement("span");
      dot.textContent = "•";
      dot.classList.add("mx-1", "text-gray-400");
      paginationNumbers.appendChild(dot);
    }
  }
}


function setupNavigation() {
  document.getElementById("prevPage")?.addEventListener("click", () => {
    if (currentpage > 1) {
      currentpage--;
      displayProducts(currentpage);
    }
  });

  document.getElementById("nextPage")?.addEventListener("click", () => {
    if (currentpage < totalpages) {
      currentpage++;
      displayProducts(currentpage);
    }
  });
}

function loadProducts() {
  fetch('../Data/products.json')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(data => {
      products = data.products;
      shuffleArray(products);
      filteredProducts = [...products];
      totalpages = Math.ceil(filteredProducts.length / numbre_elements_page);
      displayProducts(currentpage);
      setupNavigation();
    })
    .catch(error => {
      console.error("Error loading products:", error);
      const product_container = document.getElementById("product_container");
      if (product_container) {
        product_container.innerHTML = '<div class="error-message">Failed to load products. Please try again later.</div>';
      }
    });
}

function applyFilters() {
  filteredProducts = products.filter(item => {
    const matchesGender = genderFilter ? item.gender?.toLowerCase() === genderFilter : true;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter ? item.category.toLowerCase() === categoryFilter : true;
    return matchesGender && matchesSearch && matchesCategory;
  });

  if (currentSort === "price") {
    filteredProducts.sort((a, b) => a.price - b.price);
  } else if (currentSort === "title") {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
  }

  currentpage = 1;
  totalpages = Math.ceil(filteredProducts.length / numbre_elements_page);
  displayProducts(currentpage);
}

function resetFilters() {
  const filters = document.querySelectorAll("#filtermen, #filterwomen, #filterprice, #filtertitle, #filtercategory");
  filters.forEach(filter => filter.classList.remove("text-goldenrod"));
  
  const categoryDropdown = document.querySelector("#filtercategory .category-dropdown");
  if (categoryDropdown) {
    categoryDropdown.remove();
  }
}

document.getElementById("filtermen")?.addEventListener("click", () => {
  genderFilter = genderFilter === "men" ? "" : "men";
  resetFilters();
  if (genderFilter) document.getElementById("filtermen").classList.add("text-goldenrod");
  applyFilters();
});

document.getElementById("filterwomen")?.addEventListener("click", () => {
  genderFilter = genderFilter === "women" ? "" : "women";
  resetFilters();
  if (genderFilter) document.getElementById("filterwomen").classList.add("text-goldenrod");
  applyFilters();
});

document.getElementById("filterprice")?.addEventListener("click", function() {
  if (currentSort === "price") {
    currentSort = "";
    resetFilters();
  } else {
    currentSort = "price";
    resetFilters();
    this.classList.add("text-goldenrod");
  }
  applyFilters();
});

document.getElementById("filtertitle")?.addEventListener("click", function() {
  if (currentSort === "title") {
    currentSort = "";
    resetFilters();
  } else {
    currentSort = "title";
    resetFilters();
    this.classList.add("text-goldenrod");
  }
  applyFilters();
});

document.getElementById("filtercategory")?.addEventListener("click", function(event) {
  event.stopPropagation();
  
  const existingDropdown = document.querySelector(".category-dropdown");
  if (existingDropdown) {
    existingDropdown.remove();
    return;
  }

  const categories = ["Watches", "Rings", "Necklaces", "Bracelets"];
  
  const categoryList = document.createElement("div");
  categoryList.classList.add(
    "category-dropdown",
    "absolute",
    "top-16",
    "bg-white",
    "shadow-lg",
    "rounded-md",
    "w-30",
    "mt-20",
    "font-normal",
    "text-sm",
    "z-50"
  );
  
  categories.forEach(category => {
    const categoryItem = document.createElement("div");
    categoryItem.classList.add(
      "cursor-pointer",
      "px-4",
      "py-2",
      "hover:bg-yellow-500"
    );
    categoryItem.textContent = category;
    
    // Highlight the currently selected category
    if (categoryFilter === category.toLowerCase()) {
      categoryItem.classList.add("text-goldenrod");
    }

    categoryItem.addEventListener("click", (e) => {
      e.stopPropagation();
      if (categoryFilter === category.toLowerCase()) {
        categoryFilter = "";
      } else {
        categoryFilter = category.toLowerCase();
      }
      resetFilters();
      applyFilters();
      categoryList.remove();
    });

    categoryList.appendChild(categoryItem);
  });

  this.appendChild(categoryList);
});

document.addEventListener("click", (event) => {
  const categoryDropdown = document.querySelector(".category-dropdown");
  const filtercategory = document.getElementById("filtercategory");
  
  if (categoryDropdown && !filtercategory?.contains(event.target)) {
    categoryDropdown.remove();
  }
});

document.getElementById("search")?.addEventListener("input", function() {
  searchQuery = this.value.toLowerCase();
  applyFilters();
});

if (document.getElementById("product_container")) {
  loadProducts();
}