// =====================================================
// SOLEVAULT CART SYSTEM
// Stores cart in localStorage so it persists across pages
// =====================================================

const CART_KEY = "solevault_cart";

// ---------- Get cart from storage ----------
function getCart() {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
}

// ---------- Save cart to storage ----------
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartBadge();
}

// ---------- Add item to cart ----------
function addToCart(product) {
    const cart = getCart();

    // If same product + size already in cart, just increase quantity
    const existing = cart.find(
        (item) => item.name === product.name && item.size === product.size
    );

    if (existing) {
        existing.qty += product.qty;
    } else {
        cart.push(product);
    }

    saveCart(cart);
}

// ---------- Update navbar cart count badge ----------
function updateCartBadge() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    document.querySelectorAll(".cart-count").forEach((badge) => {
        badge.textContent = totalItems;
    });
}
// ---------- Remove item from cart ----------
function removeFromCart(index) {
    const cart = getCart();
    cart.splice(index, 1);
    saveCart(cart);
    renderCartPage();
}

// ---------- Change item quantity ----------
function changeQty(index, delta) {
    const cart = getCart();
    if (!cart[index]) return;
    cart[index].qty = Math.max(1, cart[index].qty + delta);
    saveCart(cart);
    renderCartPage();
}

// ---------- Shared totals calculation ----------
const TAX_RATE = 0.05; // 5% — matches your original numbers ($380 -> $19 tax)

function calcTotals(cart) {
    const subtotal = cart.reduce((sum, item) => sum + (parseFloat(item.price) || 0) * item.qty, 0);
    const tax = subtotal * TAX_RATE;
    const total = subtotal + tax;
    return { subtotal, tax, total };
}

function money(n) {
    return "$" + n.toFixed(0);
}

// ---------- Render the cart page (cart.html) ----------
function renderCartPage() {
    const list = document.getElementById("cartItemsList");
    if (!list) return; // not on cart.html

    const cart = getCart();

    if (cart.length === 0) {
        list.innerHTML = `<p style="padding: 40px 0; color: var(--gray-color);">
            Your cart is empty. <a href="shop.html" style="color: var(--primary-color); font-weight: 600;">Browse the shop →</a>
        </p>`;
    } else {
        list.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <p class="product-brand">${item.brand}</p>
                    <h3>${item.name}</h3>
                    <p class="cart-item-size">Size: US ${item.size}</p>
                </div>
                <div class="cart-item-qty">
                    <button class="qty-btn" data-action="dec" data-index="${index}">-</button>
                    <input type="text" value="${item.qty}" readonly>
                    <button class="qty-btn" data-action="inc" data-index="${index}">+</button>
                </div>
                <div class="cart-item-price">$${(parseFloat(item.price) * item.qty).toFixed(0)}</div>
                <button class="cart-item-remove" data-action="remove" data-index="${index}"><i class="bi bi-trash"></i></button>
            </div>
        `).join("");
    }

    const { subtotal, tax, total } = calcTotals(cart);
    document.getElementById("cartSubtotal").textContent = money(subtotal);
    document.getElementById("cartTax").textContent = money(tax);
    document.getElementById("cartTotal").textContent = money(total);

    const checkoutLink = document.getElementById("checkoutLink");

    if (checkoutLink) {
        if (cart.length === 0) {
            checkoutLink.style.opacity = "0.5";
            checkoutLink.style.pointerEvents = "none";
        } else {
            checkoutLink.style.opacity = "1";
            checkoutLink.style.pointerEvents = "auto";
        }
    }

    list.querySelectorAll("[data-action]").forEach((btn) => {
        btn.addEventListener("click", () => {
            const index = parseInt(btn.dataset.index);
            const action = btn.dataset.action;
            if (action === "inc") changeQty(index, 1);
            if (action === "dec") changeQty(index, -1);
            if (action === "remove") removeFromCart(index);
        });
    });
}

// ---------- Render the checkout page (checkout.html) ----------
function renderCheckoutPage() {
    const list = document.getElementById("checkoutItemsList");
    if (!list) return; // not on checkout.html

    const cart = getCart();

    list.innerHTML = cart.map((item) => `
        <div class="checkout-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="checkout-item-info">
                <h4>${item.name}</h4>
                <p>Size: US ${item.size} · Qty: ${item.qty}</p>
            </div>
            <span>$${(parseFloat(item.price) * item.qty).toFixed(0)}</span>
        </div>
    `).join("");

    const { subtotal, tax, total } = calcTotals(cart);
    document.getElementById("checkoutSubtotal").textContent = money(subtotal);
    document.getElementById("checkoutTax").textContent = money(tax);
    document.getElementById("checkoutTotal").textContent = money(total);

    const form = document.getElementById("checkoutForm");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }
            const cardRadio = document.getElementById("cardPayment");

            if (cardRadio && cardRadio.checked) {

                const cardNumber = document.getElementById("cardNumber").value.trim();
                const expiry = document.getElementById("expiry").value.trim();
                const cvv = document.getElementById("cvv").value.trim();

                if (!cardNumber || !expiry || !cvv) {

                    alert("Please enter your complete card details.");
                    return;

                }

            }
            const currentCart = getCart();
            if (currentCart.length === 0) {
                alert("Your cart is empty.");
                return;
            }

            const { total: orderTotal } = calcTotals(currentCart);
            const orderNumber = "#SV-" + Date.now().toString().slice(-8);
            const paymentMethod = document.getElementById("cardPayment").checked
                ? "Card"
                : "Cash on Delivery";

            sessionStorage.setItem("solevault_last_order", JSON.stringify({
                orderNumber,
                total: orderTotal,
                paymentMethod
            }));

            localStorage.removeItem(CART_KEY);
            window.location.href = "success.html";
        });
    }
}
// ---------- Show the real order on success.html, if there is one ----------
function renderSuccessPage() {
    const numberEl = document.getElementById("orderNumber");
    const totalEl = document.getElementById("orderTotal");
    if (!numberEl || !totalEl) return; // not on success.html

    const raw = sessionStorage.getItem("solevault_last_order");
    if (!raw) return; // no real order this session — keep the static placeholder

    try {
        const order = JSON.parse(raw);
        numberEl.textContent = order.orderNumber;
        totalEl.textContent = money(order.total);
    } catch (e) {
        // keep static fallback
    }
}
// ---------- Run on every page ----------
document.addEventListener("DOMContentLoaded", () => {

    updateCartBadge();
    renderCartPage();
    renderCheckoutPage();
    renderSuccessPage();

    // Payment Method Toggle
    const cardRadio = document.getElementById("cardPayment");
    const codRadio = document.getElementById("codPayment");
    const cardFields = document.getElementById("cardFields");

    if (cardRadio && codRadio && cardFields) {

        function toggleCardFields() {
            cardFields.style.display = cardRadio.checked ? "block" : "none";
        }

        toggleCardFields();

        cardRadio.addEventListener("change", toggleCardFields);
        codRadio.addEventListener("change", toggleCardFields);
    }

    // Wire up "Add to Cart" button...
    const addToCartBtn = document.querySelector(".add-to-cart-btn");

    if (addToCartBtn) {
        addToCartBtn.addEventListener("click", () => {

            const activeSize = document.querySelector(".size-btn.active");
            const qtyInput = document.getElementById("qtyValue");
            const mainImage = document.getElementById("mainProductImage");

            const product = {
                name: document.querySelector(".product-details-info h1")?.textContent || "Product",
                brand: document.querySelector(".product-details-info .product-brand")?.textContent || "",
                price: parseFloat(
                    document.querySelector(".product-details-info .new-price")
                        ?.textContent.replace("$", "") || 0),
                image: mainImage ? mainImage.src : "",
                size: activeSize ? activeSize.textContent : "N/A",
                qty: qtyInput ? parseInt(qtyInput.value) : 1
            };

            addToCart(product);

            addToCartBtn.textContent = "Added ✓";
            setTimeout(() => {
                addToCartBtn.textContent = "Add to Cart";
            }, 1500);

        });
    }

});
