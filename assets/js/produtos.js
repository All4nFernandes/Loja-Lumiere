const cards = document.querySelectorAll(".product-card");
const categoryFilters = document.querySelectorAll(".filter-category");
const priceFilters = document.querySelectorAll(".filter-price");
const clear = document.querySelector(".clear-filters");

function filterProducts() {
    const selectedCategories = [...categoryFilters]
        .filter(c => c.checked)
        .map(c => c.value);

    const selectedPrice = [...priceFilters]
        .find(r => r.checked)?.value;

    cards.forEach(card => {
        const category = card.dataset.category;
        const price = Number(card.dataset.price);

        let show = true;

        if (selectedCategories.length > 0 && !selectedCategories.includes(category)) {
            show = false;
        }

        if (selectedPrice) {
            const [min, max] = selectedPrice.split("-").map(Number);
            if (!(price >= min && price <= max)) show = false;
        }

        card.style.display = show ? "block" : "none";
    });
}

categoryFilters.forEach(c => c.addEventListener("change", filterProducts));
priceFilters.forEach(p => p.addEventListener("change", filterProducts));

clear.addEventListener("click", () => {
    categoryFilters.forEach(c => c.checked = false);
    priceFilters.forEach(p => p.checked = false);
    filterProducts();
});
