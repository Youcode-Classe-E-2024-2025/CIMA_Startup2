let productsData = null;

// Fetch products data from JSON file start
async function fetchProductData() {
    try {
        const response = await fetch('../Data/products.json');
        if (!response.ok) {
            throw new Error('Failed to load product data');
        }
        const data = await response.json();
        productsData = data;
    } catch (error) {
        console.error('Error fetching product data:', error);
    }
}
// Fetch products data from JSON file end


// Function to get cart items from local storage start
function getCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

    function findCategoryById(productId) {
        const product = productsData.products.find(p => p.id === productId);
        return product.category;
    }

    const cartItemsByCategory = cartItems.reduce((acc, item) => {
        const category = findCategoryById(item.id);
        if (!acc[category]) {
            acc[category] = {};
        }
        if (!acc[category][item.name]) {
            acc[category][item.name] = { count: 0, total: 0, price: item.price };
        }
        acc[category][item.name].count += item.quantity;
        acc[category][item.name].total += item.price * item.quantity;
        return acc;
    }, {});

    return cartItemsByCategory;
}
// Function to get cart items from local storage end