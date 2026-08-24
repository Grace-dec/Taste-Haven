/*  MOBILE MENU */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("show");

    if (navLinks.classList.contains("show")) {
        menuToggle.textContent = "✕";
    } else {
        menuToggle.textContent = "☰";
    }

});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");
        menuToggle.textContent = "☰";

    });

});


/*  CART  */

let cartCount = 0;

const cartCounter = document.getElementById("cartCount");

const cartButtons = document.querySelectorAll(".add-cart");

cartButtons.forEach(button => {

    button.addEventListener("click", () => {

        cartCount++;

        cartCounter.textContent = cartCount;

        const foodName = button.dataset.name;

        // Change button temporarily
        const originalText = button.textContent;

        button.textContent = "✓";

        button.style.background = "#f58b00";
        button.style.color = "white";

        setTimeout(() => {

            button.textContent = originalText;
            button.style.background = "";
            button.style.color = "";

        }, 1000);

        console.log(`${foodName} added to cart`);

    });

});


/*  CART BUTTON  */

const cartButton = document.getElementById("cartButton");

cartButton.addEventListener("click", () => {

    if (cartCount === 0) {

        alert("Your cart is empty.");

    } else {

        alert(
            `You have ${cartCount} item${cartCount > 1 ? "s" : ""} in your cart.`
        );

    }

});


/* RESERVATION = */

const reservationForm =
    document.getElementById("reservationForm");

const reservationMessage =
    document.getElementById("reservationMessage");

reservationForm.addEventListener("submit", (event) => {

    event.preventDefault();

    reservationMessage.textContent =
        "✓ Your reservation request has been received!";

    reservationMessage.style.color = "#2e7d32";

    reservationForm.reset();

});


/*  NAVBAR SCROLL  */

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.style.background = "rgba(20, 12, 7, .97)";

    } else {

        navbar.style.background = "transparent";

    }

});


/*  HOME PAGE - CART CONNECTION
   HOME PAGE - CART CONNECTION
 */

const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");


/* Get cart saved by menu.js */

function getCart() {

    return JSON.parse(
        localStorage.getItem("tasteHavenCart")
    ) || [];

}


/* Update cart number */

function updateHomeCartCount() {

    const cart = getCart();

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    if (cartCount) {
        cartCount.textContent = totalItems;
    }

}


/* Make sure cart opens */

if (cartButton) {

    cartButton.addEventListener("click", () => {

        window.location.href = "cart.html";

    });

}


/* Load cart count when Home opens */

updateHomeCartCount();