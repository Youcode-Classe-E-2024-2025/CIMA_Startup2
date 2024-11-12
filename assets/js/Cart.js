const countryList = document.getElementById("country-list");
const selectedCountry = document.getElementById("selected-country");
const toggleButton = document.querySelector("#shipping_estimator button");
const mainContainer = document.querySelector(".flex.items-center.justify-between");

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
