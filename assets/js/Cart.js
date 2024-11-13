const countryList = document.getElementById("country-list");
const selectedCountry = document.getElementById("selected-country");
const toggleButton = document.querySelector("#shipping_estimator button");
const mainContainer = document.querySelector(".flex.items-center.justify-between");
const pdf = document.getElementById("pdf")

const countries = ["Morocco", "United States", "Canada", "France", "Germany", "United Kingdom", "Australia", "Japan", "China", "India"];


// Shipping estimator country list start
countries.forEach(country => {
    const countryItem = document.createElement("div");
    countryItem.textContent = country;

    countryItem.addEventListener("click", () => {
        selectedCountry.textContent = country;
        countryList.classList.add("hidden");
    });

    countryList.appendChild(countryItem);
});

toggleButton.addEventListener("click", () => {
    countryList.classList.toggle("hidden");

    if (countryList.classList.contains("hidden")) {
        mainContainer.classList.add("rounded");
    } else {
        mainContainer.classList.remove("rounded"); 
    }
});
// Shipping estimator country list end


// Handling cart items start
document.addEventListener("DOMContentLoaded", function() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Function to format the price with spaces start
    function formatPrice(price) {
        return `$ ${price.toLocaleString()}`;
    }
    // Function to format the price with spaces end


    // Updating the total price function start
    function updateSubtotal() {
        const subtotalElement = document.getElementById('subtotal');
        const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        subtotalElement.textContent = ` ${formatPrice(subtotal)}`;
    }
    // Updating the total price function end


    // creation of cart item start
    function renderCartItems() {
        const container = document.getElementById('purchased-items-container');
        container.innerHTML = '';

        const divider = document.createElement('div');
        divider.className = "w-full h-px bg-gray_used_in_divider_lines";
        container.appendChild(divider);

        cart.forEach((item, index) => {
        const itemElement = document.createElement('article');
        itemElement.className = "py-11 h-min border-b border-gray_used_in_divider_lines flex flex-col 503:flex-row justify-between";

        itemElement.innerHTML = `
            <div class="flex gap-4">
            <img class="object-cover border border-[rgba(0,0,0,0.24)] mb-4" src="${item.selectedImage}" alt="${item.name}" width="148" height="200">
            <div class="flex flex-col text-left pt-4">
                <h1 class="text-xl md:text-4xl font-montaga">${item.name}</h1>
                <p class="text-xl text-darkGolden">$ ${item.price}</p>
            </div>
            </div>
            <div class="flex flex-col gap-4 self-center pr-4">
            <div class="flex items-center gap-2">
                <label class="text-gray_used_in_small_text text-nowrap">Qty :</label>
                <div class="flex items-center border-2">
                <button class="w-8 h-8 bg-button_divs_background flex items-center justify-center" onclick="updateQuantity(${index}, -1)">
                    <img src="../images/Icons/minus.svg" alt="Decrease Quantity">
                </button>
                <input type="text" value="${item.quantity}" class="w-12 h-8 text-center" readonly>
                <button class="w-8 h-8 bg-button_divs_background flex items-center justify-center" onclick="updateQuantity(${index}, 1)">
                    <img src="../images/Icons/plus.svg" alt="Increase Quantity">
                </button>
                </div>
            </div>
            <div class="flex items-center gap-2 self-end">
                <label class="text-gray_used_in_small_text">Size :</label>
                <div class="relative inline-block border-2">
                <select class="w-24 h-8 pl-3 pr-8 bg-white cursor-pointer focus:outline-none" onchange="updateSize(${index}, this.value)">
                    <option ${item.size === '6' ? 'selected' : ''}>6</option>
                    <option ${item.size === '7' ? 'selected' : ''}>7</option>
                    <option ${item.size === '8' ? 'selected' : ''}>8</option>
                    <option ${item.size === '9' ? 'selected' : ''}>9</option>
                    <option ${item.size === '10' ? 'selected' : ''}>10</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none bg-button_divs_background">
                    <img src="../images/Icons/arrow down.svg" alt="Dropdown arrow" class="w-4 h-4">
                </div>
                </div>
            </div>
            </div>
        `;
        container.appendChild(itemElement);
        });
        
        updateSubtotal();
    }
    // creation of cart item end


    // Update quantity function start
    window.updateQuantity = function(index, change) {
        if (cart[index].quantity + change > 0) {
        cart[index].quantity += change;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
        }
    };
    // Update quantity function end


    // Update size function start
    window.updateSize = function(index, newSize) {
        cart[index].size = newSize;
        localStorage.setItem('cart', JSON.stringify(cart));
    };
    // Update size function end

    renderCartItems();
});
// Handling cart items end
