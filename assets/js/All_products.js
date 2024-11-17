// // Global variables
// let products = [];
// let filteredProducts = [];
// let currentpage = 1;
// const numbre_elements_page = 16;
// let totalpages = 1;
// let genderFilter = "";
// let searchQuery = "";
// let categoryFilter = "";
// let currentSort = "";

// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
// }

// function displayProducts(page) {
//   const startindex = (page - 1) * numbre_elements_page;
//   const endindex = startindex + numbre_elements_page;
//   const currentProducts = filteredProducts.slice(startindex, endindex);

//   const product_container = document.getElementById("product_container");
//   product_container.innerHTML = "";

//   currentProducts.forEach(product => {
//     const productdiv = document.createElement("div");
//     productdiv.classList.add("product");
    
//     const detailPageUrl = new URL('Descri_page.html', window.location.href);
//     detailPageUrl.searchParams.set('id', product.id);
    
//     productdiv.innerHTML = `
//       <a href="${detailPageUrl.toString()}"><img src="${product.images[0]}" alt="${product.name}" class="w-full h-[80%] object-cover"></a>
//       <div class="mx-2">${product.name}</div>
//       <div class="ml-2 text-darkGolden text-xl">${product.price} $</div>
//     `;
//     product_container.appendChild(productdiv);
//   });

//   updatePagination(page);
// }

// function updatePagination(page) {
//   const paginationNumbers = document.getElementById("paginationNumbers");
//   paginationNumbers.innerHTML = "";

//   for (let i = 1; i <= totalpages; i++) {
//     const pageButton = document.createElement("span");
//     pageButton.classList.add("px-3", "cursor-pointer", "mx-2", "text-xl", "rounded-full");
//     pageButton.textContent = i;

//     if (i === page) {
//       pageButton.classList.add("bg-yellow-500");
//     }

//     pageButton.addEventListener("click", () => {
//       currentpage = i;
//       displayProducts(currentpage);
//     });

//     paginationNumbers.appendChild(pageButton);

//     if (i < totalpages) {
//       const dot = document.createElement("span");
//       dot.textContent = "•";
//       dot.classList.add("mx-1", "text-gray-400");
//       paginationNumbers.appendChild(dot);
//     }
//   }
// }


// function setupNavigation() {
//   document.getElementById("prevPage")?.addEventListener("click", () => {
//     if (currentpage > 1) {
//       currentpage--;
//       displayProducts(currentpage);
//     }
//   });

//   document.getElementById("nextPage")?.addEventListener("click", () => {
//     if (currentpage < totalpages) {
//       currentpage++;
//       displayProducts(currentpage);
//     }
//   });
// }

// function loadProducts() {
//   fetch('../Data/products.json')
//     .then(response => {
//       if (!response.ok) throw new Error('Network response was not ok');
//       return response.json();
//     })
//     .then(data => {
//       products = data.products;
//       shuffleArray(products);
//       filteredProducts = [...products];
//       totalpages = Math.ceil(filteredProducts.length / numbre_elements_page);
//       displayProducts(currentpage);
//       setupNavigation();
//     })
//     .catch(error => {
//       console.error("Error loading products:", error);
//       const product_container = document.getElementById("product_container");
//       if (product_container) {
//         product_container.innerHTML = '<div class="error-message">Failed to load products. Please try again later.</div>';
//       }
//     });
// }

// function applyFilters() {
//   filteredProducts = products.filter(item => {
//     const matchesGender = genderFilter ? item.gender?.toLowerCase() === genderFilter : true;
//     const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = categoryFilter ? item.category.toLowerCase() === categoryFilter : true;
//     return matchesGender && matchesSearch && matchesCategory;
//   });

//   if (currentSort === "price") {
//     filteredProducts.sort((a, b) => a.price - b.price);
//   } else if (currentSort === "title") {
//     filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
//   }

//   currentpage = 1;
//   totalpages = Math.ceil(filteredProducts.length / numbre_elements_page);
//   displayProducts(currentpage);
// }

// function resetFilters() {
//   const filters = document.querySelectorAll("#filtermen, #filterwomen, #filterprice, #filtertitle, #filtercategory");
//   filters.forEach(filter => filter.classList.remove("text-goldenrod"));
  
//   const categoryDropdown = document.querySelector("#filtercategory .category-dropdown");
//   if (categoryDropdown) {
//     categoryDropdown.remove();
//   }
// }

// document.getElementById("filtermen")?.addEventListener("click", () => {
//   genderFilter = genderFilter === "men" ? "" : "men";
//   resetFilters();
//   if (genderFilter) document.getElementById("filtermen").classList.add("text-goldenrod");
//   applyFilters();
// });

// document.getElementById("filterwomen")?.addEventListener("click", () => {
//   genderFilter = genderFilter === "women" ? "" : "women";
//   resetFilters();
//   if (genderFilter) document.getElementById("filterwomen").classList.add("text-goldenrod");
//   applyFilters();
// });

// document.getElementById("filterprice")?.addEventListener("click", function() {
//   if (currentSort === "price") {
//     currentSort = "";
//     resetFilters();
//   } else {
//     currentSort = "price";
//     resetFilters();
//     this.classList.add("text-goldenrod");
//   }
//   applyFilters();
// });

// document.getElementById("filtertitle")?.addEventListener("click", function() {
//   if (currentSort === "title") {
//     currentSort = "";
//     resetFilters();
//   } else {
//     currentSort = "title";
//     resetFilters();
//     this.classList.add("text-goldenrod");
//   }
//   applyFilters();
// });

// document.getElementById("filtercategory")?.addEventListener("click", function(event) {
//   event.stopPropagation();
  
//   const existingDropdown = document.querySelector(".category-dropdown");
//   if (existingDropdown) {
//     existingDropdown.remove();
//     return;
//   }

//   const categories = ["Watches", "Rings", "Necklaces", "Bracelets"];
  
//   const categoryList = document.createElement("div");
//   categoryList.classList.add(
//     "category-dropdown",
//     "absolute",
//     "top-16",
//     "bg-white",
//     "shadow-lg",
//     "rounded-md",
//     "w-30",
//     "mt-20",
//     "font-normal",
//     "text-sm",
//     "z-50"
//   );
  
//   categories.forEach(category => {
//     const categoryItem = document.createElement("div");
//     categoryItem.classList.add(
//       "cursor-pointer",
//       "px-4",
//       "py-2",
//       "hover:bg-yellow-500"
//     );
//     categoryItem.textContent = category;
    
//     // Highlight the currently selected category
//     if (categoryFilter === category.toLowerCase()) {
//       categoryItem.classList.add("text-goldenrod");
//     }

//     categoryItem.addEventListener("click", (e) => {
//       e.stopPropagation();
//       if (categoryFilter === category.toLowerCase()) {
//         categoryFilter = "";
//       } else {
//         categoryFilter = category.toLowerCase();
//       }
//       resetFilters();
//       applyFilters();
//       categoryList.remove();
//     });

//     categoryList.appendChild(categoryItem);
//   });

//   this.appendChild(categoryList);
// });

// document.addEventListener("click", (event) => {
//   const categoryDropdown = document.querySelector(".category-dropdown");
//   const filtercategory = document.getElementById("filtercategory");
  
//   if (categoryDropdown && !filtercategory?.contains(event.target)) {
//     categoryDropdown.remove();
//   }
// });

// document.getElementById("search")?.addEventListener("input", function() {
//   searchQuery = this.value.toLowerCase();
//   applyFilters();
// });

// if (document.getElementById("product_container")) {
//   loadProducts();
// }



// Global state
let productsDatas = null;
let filteredProducts = [];
let currentPage = 1;
const ITEMS_PER_PAGE = 16;
let totalPages = 1;
let genderFilter = "";
let searchQuery = "";
let categoryFilter = "";
let currentSort = "";
let activeCategory = null;

// Utility Functions
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Initialize styling
function initializeStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .elementOfNavbar {
      height: 0;
      overflow: hidden;
      transition: height .3s ease-out;
    }
    .elementOfNavbar.expanded {
      height: auto;
      margin-bottom: 2rem;
    }
    .product-section {
      display: none;
      opacity: 0;
      transform: translateY(0px);
      transition: opacity 0.3s ease-out, transform 0.3s ease-out;
    }
    .product-section.active {
      display: block;
      opacity: 1;
      transform: translateY(0);
    }
    main, footer {
      transition: transform 0.5s ease-in;
    }
    main.shifted, footer.shifted {
      transform: translateY(var(--shift-amount, 0px));
    }
  `;
  document.head.appendChild(style);
}

// Data Fetching
async function fetchProducts() {
  if (productsDatas) return productsDatas;
  
  try {
    const response = await fetch('../Data/products.json');
    if (!response.ok) throw new Error('Loading products failed');
    productsDatas = await response.json();
    return productsDatas;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}

// Navigation Functions
function initializeNavbarLinks() {
  const navbarLinks = document.querySelectorAll('.navbar-link');
  const mainContent = document.querySelector('main');
  const footer = document.querySelector('footer');
  const navbarContainer = document.querySelector('.elementOfNavbar');
  
  // Initially hide all product sections
  const productSections = document.querySelectorAll('.product-section');
  productSections.forEach(section => {
    section.style.display = 'none';
    section.classList.remove('active');
  });

  navbarLinks.forEach(link => {
    link.addEventListener('click', async (e) => {
      e.preventDefault();
      const category = link.textContent.toLowerCase();
      
      // Toggle same category
      if (activeCategory === category) {
        const activeSection = document.getElementById(`${category}-container`);
        activeSection.classList.remove('active');
        navbarContainer.classList.remove('expanded');
        
        mainContent.style.setProperty('--shift-amount', '0px');
        footer.style.setProperty('--shift-amount', '0px');
        mainContent.classList.remove('shifted');
        footer.classList.remove('shifted');
        
        setTimeout(() => {
          activeSection.style.display = 'none';
        }, 300);
        
        activeCategory = null;
        return;
      }

      // Hide previous category
      if (activeCategory) {
        const previousSection = document.getElementById(`${activeCategory}-container`);
        previousSection.classList.remove('active');
        setTimeout(() => {
          previousSection.style.display = 'none';
        }, 300);
      }

      // Show new category
      const targetSection = document.getElementById(`${category}-container`);
      if (targetSection) {
        targetSection.style.display = 'block';
        navbarContainer.classList.add('expanded');
        
        targetSection.offsetHeight; // Force reflow
        targetSection.classList.add('active');
        
        setTimeout(() => {
          const sectionHeight = targetSection.offsetHeight;
          mainContent.style.setProperty('--shift-amount', `${sectionHeight}px`);
          footer.style.setProperty('--shift-amount', `${sectionHeight}px`);
          mainContent.classList.add('shifted');
          footer.classList.add('shifted');
        }, 50);
        
        activeCategory = category;
      }
    });
  });
}

// Product Display Functions
function createProductCard(product, isInRoot = false) {
  const productCard = document.createElement('div');
  productCard.classList.add(
    'bg-white', 'p-4', 'rounded', 'flex', 'flex-col', 'items-center', 'shadow-md'
  );

  const productImageContainer = document.createElement('div');
  productImageContainer.classList.add('w-full', 'aspect-square', 'overflow-hidden', 'relative', 'rounded');

  const productImage = document.createElement('img');
  productImage.src = product.images[0];
  productImage.alt = product.name;
  productImage.classList.add('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'object-cover');

  const productTitle = document.createElement('h3');
  productTitle.classList.add('font-inria', 'lg:text-lg', 'text-center', 'mt-4', 'text-gray-800');
  productTitle.textContent = product.name;

  const productLink = document.createElement('a');
  productLink.href = isInRoot 
    ? `assets/html/Descri_page.html?id=${product.id}`
    : `Descri_page.html?id=${product.id}`;
  productLink.classList.add('w-full');

  productImageContainer.appendChild(productImage);
  productCard.appendChild(productImageContainer);
  productCard.appendChild(productTitle);
  productLink.appendChild(productCard);

  return productLink;
}

async function loadCategoryProducts() {
  try {
    const data = await fetchProducts();
    if (!data) return;
    
    const productsArray = Object.values(data).flat();
    const isInRoot = !window.location.pathname.includes('/assets/html/');
    
    const categories = ['bracelets', 'necklaces', 'rings', 'watches'];
    
    categories.forEach(category => {
      const categoryProducts = productsArray
        .filter(product => product.category && product.category.toLowerCase() === category)
        .slice(0, 4);

      const container = document.querySelector(`#${category}-container .product-list`);
      if (!container) return;
      
      container.innerHTML = '';

      categoryProducts.forEach(product => {
        if (product.images && Array.isArray(product.images)) {
          product.images = product.images.slice(0, 1).map(imagePath => {
            imagePath = imagePath.replace(/^\.{2}\//, '');
            return isInRoot ? `assets/${imagePath}` : `../${imagePath}`;
          });
        }

        container.appendChild(createProductCard(product, isInRoot));
      });
    });
  } catch (error) {
    console.error('Error loading category products:', error);
  }
}

// Pagination Functions
function updatePagination(page) {
  const paginationNumbers = document.getElementById("paginationNumbers");
  if (!paginationNumbers) return;

  paginationNumbers.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement("span");
    pageButton.classList.add("px-3", "cursor-pointer", "mx-2", "text-xl", "rounded-full");
    pageButton.textContent = i;

    if (i === page) {
      pageButton.classList.add("bg-yellow-500");
    }

    pageButton.addEventListener("click", () => {
      currentPage = i;
      displayFilteredProducts(currentPage);
    });

    paginationNumbers.appendChild(pageButton);

    if (i < totalPages) {
      const dot = document.createElement("span");
      dot.textContent = "•";
      dot.classList.add("mx-1", "text-gray-400");
      paginationNumbers.appendChild(dot);
    }
  }
}

function setupPagination() {
  document.getElementById("prevPage")?.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      displayFilteredProducts(currentPage);
    }
  });

  document.getElementById("nextPage")?.addEventListener("click", () => {
    if (currentPage < totalPages) {
      currentPage++;
      displayFilteredProducts(currentPage);
    }
  });
}

// Filter Functions
function displayFilteredProducts(page) {
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const productContainer = document.getElementById("product_container");
  if (!productContainer) return;

  productContainer.innerHTML = "";

  currentProducts.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product");
    
    const detailPageUrl = new URL('Descri_page.html', window.location.href);
    detailPageUrl.searchParams.set('id', product.id);
    
    productDiv.innerHTML = `
      <a href="${detailPageUrl.toString()}"><img src="${product.images[0]}" alt="${product.name}" class="w-full h-[80%] object-cover"></a>
      <div class="mx-2">${product.name}</div>
      <div class="ml-2 text-darkGolden text-xl">${product.price} $</div>
    `;
    productContainer.appendChild(productDiv);
  });

  updatePagination(page);
}

function applyFilters() {
  filteredProducts = productsDatas.products.filter(item => {
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

  currentPage = 1;
  totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  displayFilteredProducts(currentPage);
}

function resetFilters() {
  const filters = document.querySelectorAll("#filtermen, #filterwomen, #filterprice, #filtertitle, #filtercategory");
  filters.forEach(filter => filter.classList.remove("text-goldenrod"));
  
  const categoryDropdown = document.querySelector("#filtercategory .category-dropdown");
  if (categoryDropdown) {
    categoryDropdown.remove();
  }
}

// Setup Filter Event Listeners
function setupFilterListeners() {
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
    currentSort = currentSort === "price" ? "" : "price";
    resetFilters();
    if (currentSort === "price") this.classList.add("text-goldenrod");
    applyFilters();
  });

  document.getElementById("filtertitle")?.addEventListener("click", function() {
    currentSort = currentSort === "title" ? "" : "title";
    resetFilters();
    if (currentSort === "title") this.classList.add("text-goldenrod");
    applyFilters();
  });

  setupCategoryFilter();
  
  document.getElementById("search")?.addEventListener("input", function() {
    searchQuery = this.value.toLowerCase();
    applyFilters();
  });
}

function setupCategoryFilter() {
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
      
      if (categoryFilter === category.toLowerCase()) {
        categoryItem.classList.add("text-goldenrod");
      }

      categoryItem.addEventListener("click", (e) => {
        e.stopPropagation();
        categoryFilter = categoryFilter === category.toLowerCase() ? "" : category.toLowerCase();
        resetFilters();
        applyFilters();
        categoryList.remove();
      });

      categoryList.appendChild(categoryItem);
    });

    this.appendChild(categoryList);
  });

  // Close category dropdown when clicking outside
  document.addEventListener("click", (event) => {
    const categoryDropdown = document.querySelector(".category-dropdown");
    const filterCategory = document.getElementById("filtercategory");
    
    if (categoryDropdown && !filterCategory?.contains(event.target)) {
      categoryDropdown.remove();
    }
  });
}

// Initialize everything
async function initialize() {
  initializeStyles();
  
  // Load products based on page type
  if (document.getElementById("product_container")) {
    // Product listing page
    const data = await fetchProducts();
    if (data) {
      productsDatas = data;
      filteredProducts = [...data.products];
      shuffleArray(filteredProducts);
      totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
      displayFilteredProducts(currentPage);
      setupPagination();
      setupFilterListeners();
    }
  } else {
    // Category preview page
    await loadCategoryProducts();
    initializeNavbarLinks();
  }
}

// Start when DOM is loaded
document.addEventListener('DOMContentLoaded', initialize);