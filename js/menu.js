/*
   TASTE HAVEN - MENU.JS
   Menu filtering + Cart + LocalStorage + Mobile Nav
 */


/*  MOBILE NAVIGATION */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("show");

        const isOpen = navLinks.classList.contains("show");

        menuToggle.textContent = isOpen ? "✕" : "☰";

        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close menu" : "Open menu"
        );

    });


    // Close menu when a navigation link is clicked

    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("show");

            menuToggle.textContent = "☰";

            menuToggle.setAttribute(
                "aria-label",
                "Open menu"
            );

        });

    });

}


/*  CART STORAGE */

/*
   Get existing cart from localStorage.

   If there is no cart yet, create an empty array.
*/

let cart = JSON.parse(
    localStorage.getItem("tasteHavenCart")
) || [];


/*  SAVE CART */

function saveCart() {

    localStorage.setItem(
        "tasteHavenCart",
        JSON.stringify(cart)
    );

}


/*  UPDATE CART COUNT */

function updateCartCount() {

    const cartCounter =
        document.getElementById("cartCount");

    if (!cartCounter) return;


    /*
       Count quantities instead of counting
       different products.
    */

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );


    cartCounter.textContent = totalItems;

}


/* MENU CATEGORY FILTER */

const categoryButtons =
    document.querySelectorAll(".category-btn");

const foodCards =
    document.querySelectorAll(".food-card");


categoryButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active state

        categoryButtons.forEach(btn => {
            btn.classList.remove("active");
        });


        // Activate selected category

        button.classList.add("active");


        const selectedCategory =
            button.dataset.category;


        foodCards.forEach(card => {

            const cardCategory =
                card.dataset.category;


            if (
                selectedCategory === "all" ||
                cardCategory === selectedCategory
            ) {

                card.style.display = "block";

                // Restart animation

                card.style.animation = "none";

                void card.offsetWidth;

                card.style.animation =
                    "cardAppear .5s ease";

            } else {

                card.style.display = "none";

            }

        });

    });

});


/*   ADD ITEM TO CART */

const addCartButtons =
    document.querySelectorAll(".add-cart");


addCartButtons.forEach(button => {

    button.addEventListener("click", () => {

        const foodCard =
            button.closest(".food-card");


        if (!foodCard) return;


        /*
           Get product information
        */

        const name =
            button.dataset.name;

        const priceElement =
            foodCard.querySelector(
                ".food-title span"
            );

        const imageElement =
            foodCard.querySelector(
                ".food-image img"
            );


        /*
           Convert "$14.99" into 14.99
        */

        const price =
            parseFloat(
                priceElement.textContent
                    .replace("$", "")
                    .trim()
            );


        const image =
            imageElement
                ? imageElement.getAttribute("src")
                : "";


        /*
           Check whether item already exists
        */

        const existingItem =
            cart.find(item => item.name === name);


        if (existingItem) {

            existingItem.quantity++;

        } else {

            cart.push({

                name: name,

                price: price,

                image: image,

                quantity: 1

            });

        }


        /*
           Save cart
        */

        saveCart();


        /*
           Update cart counter
        */

        updateCartCount();


        /*
           Button feedback
        */

        const originalText =
            button.innerHTML;

        button.innerHTML = "✓ Added";

        button.classList.add("added");

        button.disabled = true;


        setTimeout(() => {

            button.innerHTML = originalText;

            button.classList.remove("added");

            button.disabled = false;

        }, 1000);


        console.log(
            `${name} added to cart`
        );

    });

});


/* INITIAL CART COUNT */

updateCartCount();


/*  CART BUTTON */

const cartButton =
    document.getElementById("cartButton");


if (cartButton) {

    cartButton.addEventListener("click", () => {

        /*
           Go directly to the cart page
        */

        window.location.href = "cart.html";

    });

}


/* NAVBAR SCROLL EFFECT */

const navbar =
    document.querySelector(".navbar");


function updateNavbar() {

    if (!navbar) return;


    if (window.scrollY > 40) {

        navbar.style.background =
            "rgba(22, 13, 8, 0.97)";

        navbar.style.boxShadow =
            "0 5px 20px rgba(0,0,0,.15)";

    } else {

        navbar.style.background =
            "transparent";

        navbar.style.boxShadow =
            "none";

    }

}


window.addEventListener(
    "scroll",
    updateNavbar
);


/*
   Run once when page loads
*/

updateNavbar();


/*  CLOSE MOBILE NAVIGATION ON RESIZE */

window.addEventListener("resize", () => {

    if (
        window.innerWidth > 850 &&
        navLinks
    ) {

        navLinks.classList.remove("show");

        if (menuToggle) {
            menuToggle.textContent = "☰";
        }

    }

});