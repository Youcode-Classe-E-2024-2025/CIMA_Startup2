const testimonials = document.querySelectorAll('.testimonial');
const quotes = document.querySelectorAll('.quote');

const mainImage = document.querySelector('article img');
const quantityInput = document.querySelector('input[type="text"]');
const minusButton = document.querySelector('button img[src*="minus"]').parentElement;
const plusButton = document.querySelector('button img[src*="plus"]').parentElement;
const sizeSelect = document.querySelector('select');
const addToCartButton = document.querySelector('.add-to-cart-btn');
const outOfStockTag = document.querySelector('.text-gray_used_in_small_text');
const categoryName = document.getElementById('category-name');

let currentIndex = 0;
let interval;
let isPaused = false;

let currentProduct;
let allProducts = [];

// Testimonials animation start
function showTestimonial(index) {
    testimonials.forEach(t => t.classList.remove('active'));
    quotes.forEach(q => q.classList.remove('active'));

    testimonials[index].classList.add('active');
    quotes[index].classList.add('active');
}

function nextTestimonial() {
    if (!isPaused) {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }
}

testimonials.forEach((testimonial, index) => {
    testimonial.addEventListener('mouseenter', () => {
        isPaused = true;
        showTestimonial(index);
    });

    testimonial.addEventListener('mouseleave', () => {
        isPaused = false;
    });

    testimonial.addEventListener('click', () => {
        currentIndex = index;
        showTestimonial(index);
    });
});

interval = setInterval(nextTestimonial, 7000);

window.addEventListener('unload', () => {
    clearInterval(interval);
});

// Testimonials animation ends


// Product Details Section start

// Load product data from a JSON file start
async function loadProductData() {
    try {
        const response = await fetch('../Data/products.json');
        const data = await response.json();
        currentProduct = data.products[15];

        document.title = `ETERNIA || ${currentProduct.name}`;
        ProductDisplay();
    } catch (error) {
        console.error('Error loading product data:', error);
    }
}
// Load product data from a JSON file end


// Display product based on data start
function ProductDisplay() {
    document.querySelector('h1').textContent = currentProduct.name;
    document.querySelector('.text-darkGolden').textContent = `$ ${currentProduct.price}`;
    document.querySelector('.text-gray-700').textContent = currentProduct.description;
    outOfStockTag.style.display = currentProduct.inStock ? 'none' : 'block';

    if (currentProduct.images.length > 0) {
        mainImage.src = currentProduct.images[0];
    }

    const thumbnailContainer = document.querySelector('.flex.justify-center.gap-4');
    thumbnailContainer.innerHTML = '';
    
    currentProduct.images.slice(1).forEach((imageSrc, index) => {
        const button = document.createElement('button');
        button.classList.add('w-[80px]', 'h-[80px]', 'md:w-[110px]', 'md:h-[110px]', 'flex-shrink-0', 'thumbnail-btn');
        
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = `Product view ${index + 2}`;
        img.width = 110;
        img.height = 110;
        img.classList.add('w-full', 'h-full', 'object-cover', 'border', 'border-[rgba(0,0,0,0.24)]');
        
        button.appendChild(img);
        thumbnailContainer.appendChild(button);
    });

    if (categoryName && currentProduct.category) {
        categoryName.textContent = currentProduct.category;
    }

    setupThumbnailClicks();
}
// Display product based on data end


// Thumbnail switching start
function setupThumbnailClicks() {
    const thumbnails = document.querySelectorAll('.thumbnail-btn img');
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', (e) => {
            e.stopPropagation();
            const newSrc = thumb.src;
            const mainSrc = mainImage.src;
            mainImage.src = newSrc;
            thumb.src = mainSrc;
        });
    });
}
// Thumbnail switching end


// Quantity handling start
function updateQuantity(value) {
    let quantity = parseInt(quantityInput.value);
    quantity = Math.max(1, Math.min(99, quantity + value));
    quantityInput.value = quantity; 
}

minusButton.addEventListener('click', () => {
    updateQuantity(-1);
});

plusButton.addEventListener('click', () => {
    updateQuantity(1);
});

quantityInput.addEventListener('change', () => {
    let value = parseInt(quantityInput.value) || 1;
    value = Math.max(1, Math.min(99, value));
    quantityInput.value = value; 
});
// Quantity handling end


// Size selection option start
sizeSelect.addEventListener('change', () => {});
// Size selection option end


// Local storage management start
function saveToLocalStorage() {
    const updatedQuantity = parseInt(quantityInput.value); 
    const productData = {
        id: currentProduct.id,
        name: currentProduct.name,
        price: currentProduct.price,
        quantity: updatedQuantity,
        size: sizeSelect.value,
        selectedImage: mainImage.src
    };
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    console.log(productData.size)

    const existingItemIndex = cart.findIndex(item => 
        item.id === productData.id && item.size === productData.size
    );

    if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity = updatedQuantity;
        cart[existingItemIndex].selectedImage = mainImage.src;
    } else {
        cart.push(productData);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}
// Local storage management end


// Add to cart button start
function setupAddToCart() {

    addToCartButton.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!currentProduct.inStock) {
            alert('Sorry, this item is currently out of stock.');
            return;
        }

        saveToLocalStorage(); 
    });
}
// Add to cart button end 


// Image zoom effect start
function setupZoom() {
    if (!mainImage) return; 
    
    const zoomContainer = mainImage.parentElement; 
    
    mainImage.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = zoomContainer.getBoundingClientRect();
        const x = (e.clientX - left) / width * 100;
        const y = (e.clientY - top) / height * 100;
        
        mainImage.style.transform = 'scale(1.5)';
        mainImage.style.transformOrigin = `${x}% ${y}%`;
    });
    
    mainImage.addEventListener('mouseleave', () => {
        mainImage.style.transform = 'scale(1)';
    });
}
// Image zoom effect end


// Load functions on window load start
document.addEventListener('DOMContentLoaded', async () => {
    await loadProductData();
    setupAddToCart();
    setupZoom();
    quantityInput.value = 1;

    setTimeout(() => {
        loadAllProducts();
    }, 100); 
});
// Load functions on window load end

// Product Details Section end

// Product suite section start

// Product suite section end