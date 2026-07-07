// =====================================================
// PRODUCT PAGE INTERACTIONS (FINAL CLEAN VERSION)
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    // =====================================================
    // LOAD PRODUCT
    // =====================================================

    const params = new URLSearchParams(window.location.search);
    const productId = Number(params.get("id"));

    const product = products.find(p => p.id === productId);

    if (!product) return;

    // =====================================================
    // BASIC INFO
    // =====================================================

    document.title = product.name + " | SoleVault";

    const breadcrumb = document.querySelector(".breadcrumb span");
    if (breadcrumb) breadcrumb.textContent = product.name;

    const brand = document.getElementById("productBrand");
    if (brand) brand.textContent = product.brand;

    const name = document.getElementById("productName");
    if (name) name.textContent = product.name;

    const desc = document.getElementById("productDescription");
    if (desc) desc.textContent = product.description;

    const sku = document.getElementById("productSKU");
    if (sku) sku.textContent = product.sku;

    const category = document.getElementById("productCategory");
    if (category) category.textContent = product.category;

    // =====================================================
    // PRICE SYSTEM (OLD + NEW)
    // =====================================================

    const priceContainer = document.getElementById("productPrice");

    if (priceContainer) {
        priceContainer.innerHTML = `
            ${product.oldPrice ? `<span class="old-price">$${product.oldPrice}</span>` : ""}
            <span class="new-price">$${product.price}</span>
            ${product.discount ? `<span class="discount">${product.discount}</span>` : ""}
        `;
    }

    // =====================================================
    // STOCK SYSTEM
    // =====================================================

    const stockContainer = document.getElementById("productStock");

    if (stockContainer) {
        const stockLeft = (product.stock || 10) - (product.sold || 0);

        if (stockLeft > 5) {
            stockContainer.innerHTML = `<span class="in-stock">In Stock (${stockLeft} left)</span>`;
        } else if (stockLeft > 0) {
            stockContainer.innerHTML = `<span class="low-stock">Hurry! Only ${stockLeft} left</span>`;
        } else {
            stockContainer.innerHTML = `<span class="out-stock">Out of Stock</span>`;
        }
    }

    // =====================================================
    // MAIN IMAGE + COLOR SYSTEM
    // =====================================================

    const mainImage = document.getElementById("mainProductImage");

    let activeColor = 0;
    let activeImage = 0;

    function updateMainImage() {
        const img =
            product.colors?.[activeColor]?.images?.[activeImage] ||
            product.image;

        mainImage.src = img;
        mainImage.alt = product.name;
    }

    // =====================================================
    // COLOR BUTTONS
    // =====================================================

    const thumbsContainer = document.querySelector(".gallery-thumbs");

    if (thumbsContainer && product.colors) {

        const colorBar = document.createElement("div");
        colorBar.className = "color-options";

        product.colors.forEach((c, i) => {

            const btn = document.createElement("button");
            btn.className = "color-btn";
            btn.style.background = c.hex;
            btn.title = c.name;

            btn.addEventListener("click", () => {
                activeColor = i;
                activeImage = 0;
                renderThumbnails();
                updateMainImage();
            });

            colorBar.appendChild(btn);
        });

        thumbsContainer.parentElement.appendChild(colorBar);
    }

    // =====================================================
    // THUMBNAILS
    // =====================================================

    const thumbs = document.querySelectorAll(".thumb");

    function renderThumbnails() {

        const images = product.colors?.[activeColor]?.images || [];

        thumbs.forEach((t, i) => {

            if (images[i]) {
                t.src = images[i];
                t.style.display = "block";
                t.classList.remove("active");
            } else {
                t.style.display = "none";
            }
        });

        if (thumbs[0]) thumbs[0].classList.add("active");
    }

    renderThumbnails();
    updateMainImage();

    thumbs.forEach((t, i) => {
        t.addEventListener("click", () => {
            activeImage = i;
            updateMainImage();

            thumbs.forEach(x => x.classList.remove("active"));
            t.classList.add("active");
        });
    });

    // =====================================================
    // RATING
    // =====================================================

    const ratingContainer = document.getElementById("productRating");

    if (ratingContainer && product.rating) {

        let stars = "";

        const full = Math.floor(product.rating);
        const half = product.rating % 1 >= 0.5;

        for (let i = 0; i < full; i++) {
            stars += `<i class="bi bi-star-fill"></i>`;
        }

        if (half) stars += `<i class="bi bi-star-half"></i>`;

        const total = full + (half ? 1 : 0);

        for (let i = total; i < 5; i++) {
            stars += `<i class="bi bi-star"></i>`;
        }

        ratingContainer.innerHTML = `
            ${stars}
            <span>(${product.reviews} Reviews)</span>
        `;
    }

    // =====================================================
    // RELATED PRODUCTS
    // =====================================================

    const relatedContainer = document.getElementById("relatedProducts");

    if (relatedContainer) {

        const related = products
            .filter(p => p.id !== product.id)
            .slice(0, 4);

        relatedContainer.innerHTML = related.map(item => `
            <div class="product-card">

                <span class="product-badge">${item.badge || ""}</span>

                <img src="${item.image}" alt="${item.name}">

                <div class="product-info">

                    <p class="product-brand">${item.brand}</p>

                    <h3>
                        <a href="product.html?id=${item.id}">
                            ${item.name}
                        </a>
                    </h3>

                    <p class="product-category">${item.category}</p>

                    <div class="product-price">
                        <span class="new-price">$${item.price}</span>
                    </div>

                    <a href="product.html?id=${item.id}" class="btn-primary">
                        View Details
                    </a>

                </div>

            </div>
        `).join("");
    }

    // =====================================================
    // SIZE SELECTOR
    // =====================================================

    document.querySelectorAll(".size-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".size-btn")
                .forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

    // =====================================================
    // QUANTITY
    // =====================================================

    const qtyValue = document.getElementById("qtyValue");
    const qtyMinus = document.getElementById("qtyMinus");
    const qtyPlus = document.getElementById("qtyPlus");

    if (qtyValue && qtyMinus && qtyPlus) {

        qtyMinus.addEventListener("click", () => {
            let val = Number(qtyValue.value) || 1;
            if (val > 1) qtyValue.value = val - 1;
        });

        qtyPlus.addEventListener("click", () => {
            let val = Number(qtyValue.value) || 1;
            qtyValue.value = val + 1;
        });
    }
    // =====================================================
    // 3D MODEL BUTTON
    // =====================================================

    // =====================================================
// 3D MODEL BUTTON
// =====================================================

const view3DBtn = document.getElementById("toggle3D");

if (view3DBtn) {

    if (!product.model3d) {

        view3DBtn.style.display = "none";

    } else {

        view3DBtn.addEventListener("click", () => {

            open3D(product.model3d);

        });

    }

}
// =====================================================
// ON FOOT GALLERY
// =====================================================

const onFootBtn = document.getElementById("toggleOnFoot");
const onFootViewer = document.getElementById("onFootViewer");
const onFootMain = document.getElementById("onFootMainImage");
const onFootThumbs = document.getElementById("onFootThumbs");
const closeOnFoot = document.getElementById("closeOnFoot");

if (onFootBtn) {

    if (!product.onFoot || product.onFoot.length === 0) {

        onFootBtn.style.display = "none";

    } else {

        onFootBtn.addEventListener("click", () => {

            onFootViewer.classList.remove("hidden");

            onFootMain.src = product.onFoot[0];

            onFootThumbs.innerHTML = "";

            product.onFoot.forEach((img, index) => {

                const thumb = document.createElement("img");

                thumb.src = img;

                thumb.className = "onfoot-thumb";

                if (index === 0) {
                    thumb.classList.add("active");
                }

                thumb.addEventListener("click", () => {

                    onFootMain.src = img;

                    document.querySelectorAll(".onfoot-thumb").forEach(t => {
                        t.classList.remove("active");
                    });

                    thumb.classList.add("active");

                });

                onFootThumbs.appendChild(thumb);

            });

        });

    }

}

if (closeOnFoot) {

    closeOnFoot.addEventListener("click", () => {

        onFootViewer.classList.add("hidden");

    });

}
});
