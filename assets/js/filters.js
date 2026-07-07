// =====================================================
// SHOP FILTERS
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    const filterInputs = document.querySelectorAll(".filter-group input");

    const clearButton = document.querySelector(".filter-clear");

    if (!filterInputs.length) return;

    filterInputs.forEach((input) => {

        input.addEventListener("change", applyFilters);

    });

    if (clearButton) {

        clearButton.addEventListener("click", () => {

            filterInputs.forEach((input) => {

                input.checked = false;

            });

            applyFilters();

        });

    }

    function applyFilters() {

        // Selected Brands
        const selectedBrands = [];
        document.querySelectorAll("[name='brand']:checked").forEach(input => {
            selectedBrands.push(input.value.toLowerCase());
        });

        // Selected Categories
        const selectedCategories = [];
        document.querySelectorAll("[name='category']:checked").forEach(input => {
            selectedCategories.push(input.value.toLowerCase());
        });

        // Selected Price
        const selectedPrice = document.querySelector("[name='price']:checked")?.value;

        const cards = document.querySelectorAll(".product-card");
        let visibleCount = 0;
        cards.forEach(card => {

            const brand = card.querySelector(".product-brand").textContent.toLowerCase();

            const category = card.querySelector(".product-category").textContent.toLowerCase();

            const price = parseFloat(
                card.querySelector(".new-price").textContent.replace("$", "")
            );

            const brandMatch =
                selectedBrands.length === 0 ||
                selectedBrands.includes(brand);

            const categoryMatch =
                selectedCategories.length === 0 ||
                selectedCategories.includes(category);

            let priceMatch = true;

            if (selectedPrice === "under100") {
                priceMatch = price < 100;
            }
            else if (selectedPrice === "100-180") {
                priceMatch = price >= 100 && price <= 180;
            }
            else if (selectedPrice === "180-250") {
                priceMatch = price > 180 && price <= 250;
            }
            else if (selectedPrice === "250plus") {
                priceMatch = price > 250;
            }

            const visible = brandMatch && categoryMatch && priceMatch;

            card.style.display = visible ? "" : "none";
            if (visible) {
                visibleCount++;
            }

        });
        const results = document.querySelector(".results-count");

        if (results) {
            results.textContent = `Showing ${visibleCount} of ${cards.length} Products`;
        }
    }

});