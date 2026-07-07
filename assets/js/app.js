// =====================================================
// APP.JS — Loaded on every page
// =====================================================

/* ---------- Mobile nav toggle ---------- */

function initNavToggle() {
    const toggle = document.getElementById("navToggle");
    const menu = document.getElementById("navMenu");
    if (!toggle || !menu) return;

    toggle.addEventListener("click", () => {
        toggle.classList.toggle("active");
        menu.classList.toggle("open");
    });

    // Close the menu automatically when a link is tapped
    menu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            toggle.classList.remove("active");
            menu.classList.remove("open");
        });
    });
}

/* ---------- Newsletter form (index.html) ---------- */

function initNewsletterForm() {
    const form = document.querySelector(".newsletter-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector("input[type='email']");
        const button = form.querySelector("button");
        const original = button.textContent;

        button.textContent = "Subscribed!";
        button.disabled = true;
        if (input) input.value = "";

        setTimeout(() => {
            button.textContent = original;
            button.disabled = false;
        }, 2500);
    });
}

/* ---------- Contact form (contact.html) ---------- */

function initContactForm() {
    const form = document.querySelector(".contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thanks for reaching out! We'll get back to you within 24 hours.");
        form.reset();
    });
}

/* ---------- Init ---------- */

document.addEventListener("DOMContentLoaded", () => {
    initNavToggle();
    initNewsletterForm();
    initContactForm();
});