console.log("search.js loaded");

document.addEventListener("DOMContentLoaded", () => {

    console.log("DOM Loaded");

    const searchInput = document.getElementById("searchInput");

    console.log(searchInput);

    const productCards = document.querySelectorAll(".product-card");

    console.log("Cards found:", productCards.length);

    // REPLACE YOUR OLD addEventListener WITH THIS ONE
    searchInput.addEventListener("input", function () {

    const keyword = this.value.trim().toLowerCase();

    let visibleCount = 0;

    productCards.forEach(card => {

        const title = card.querySelector("h3").textContent.toLowerCase();
        const brand = card.querySelector(".product-brand").textContent.toLowerCase();

        const match =
            title.includes(keyword) ||
            brand.includes(keyword);

        card.style.display = match ? "" : "none";

        if (match) {
            visibleCount++;
        }

    });

    const resultsCount = document.getElementById("resultsCount");

    if (resultsCount) {
        resultsCount.textContent =
            `Showing ${visibleCount} of ${productCards.length} Products`;
    }

});

});