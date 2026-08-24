/* 
   TASTE HAVEN - CART.JS
   Reads cart from localStorage and displays it


/* 
   GET CART FROM LOCAL STORAGE
 */

let cart = JSON.parse(
    localStorage.getItem("tasteHavenCart")
) || [];


/*
   ELEMENTS
 */

const cartItemsContainer =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const cartCount =
    document.getElementById("cartCount");

const subtotalElement =
    document.getElementById("subtotal");

const deliveryElement =
    document.getElementById("delivery");

const discountElement =
    document.getElementById("discount");

const totalElement =
    document.getElementById("total");

const checkoutButton =
    document.getElementById("checkoutBtn");


/* 
   SAVE CART
 */

function saveCart() {

    localStorage.setItem(
        "tasteHavenCart",
        JSON.stringify(cart)
    );

}


/* 
   UPDATE CART COUNT
 */

function updateCartCount() {

    if (!cartCount) return;

    const totalItems = cart.reduce(
        (total, item) =>
            total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;

}


/* 
   DISPLAY CART
 */

function displayCart() {

    if (!cartItemsContainer) return;


    /*
       Clear existing items
    */

    cartItemsContainer.innerHTML = "";


    /* 
       EMPTY CART
     */

    if (cart.length === 0) {

        if (emptyCart) {
            emptyCart.style.display = "block";
        }

        updateSummary();

        updateCartCount();

        return;
    }


    /* 
       HIDE EMPTY CART
    */

    if (emptyCart) {
        emptyCart.style.display = "none";
    }


    /* 
       CREATE CART ITEMS
    */

    cart.forEach((item, index) => {

        const itemTotal =
            item.price * item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-product">

                <div class="cart-product-image">

                    <img
                        src="${item.image}"
                        alt="${item.name}"
                    >

                </div>


                <div class="cart-product-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <button
                        class="remove-item"
                        data-index="${index}">

                        Remove

                    </button>

                </div>

            </div>


            <div class="cart-price">

                $${item.price.toFixed(2)}

            </div>


            <div class="quantity-control">

                <button
                    class="decrease"
                    data-index="${index}">

                    −

                </button>


                <span>
                    ${item.quantity}
                </span>


                <button
                    class="increase"
                    data-index="${index}">

                    +

                </button>

            </div>


            <div class="cart-item-total">

                $${itemTotal.toFixed(2)}

            </div>

        `;


        cartItemsContainer.appendChild(
            cartItem
        );

    });


    /*
       Add button events
    */

    addCartEvents();


    updateSummary();

    updateCartCount();

}


/* 
   CART BUTTON EVENTS
 */

function addCartEvents() {


    /* 
       INCREASE QUANTITY
     */

    document
        .querySelectorAll(".increase")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );

                    cart[index].quantity++;

                    saveCart();

                    displayCart();

                }
            );

        });


    /* 
       DECREASE QUANTITY
     */

    document
        .querySelectorAll(".decrease")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    if (
                        cart[index].quantity > 1
                    ) {

                        cart[index].quantity--;

                    } else {

                        cart.splice(index, 1);

                    }


                    saveCart();

                    displayCart();

                }
            );

        });


    /* REMOVE ITEM */

    document
        .querySelectorAll(".remove-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const index =
                        Number(
                            button.dataset.index
                        );


                    cart.splice(index, 1);

                    saveCart();

                    displayCart();

                }
            );

        });

}


/* CALCULATE SUMMARY */

function updateSummary() {

    let subtotal = 0;


    cart.forEach(item => {

        subtotal +=
            item.price * item.quantity;

    });


    /*
       Delivery fee
    */

    const delivery =
        subtotal > 0 ? 3 : 0;


    /*
       Discount
    */

    const discount = 0;


    /*
       Final total
    */

    const total =
        subtotal +
        delivery -
        discount;


    if (subtotalElement) {

        subtotalElement.textContent =
            `$${subtotal.toFixed(2)}`;

    }


    if (deliveryElement) {

        deliveryElement.textContent =
            `$${delivery.toFixed(2)}`;

    }


    if (discountElement) {

        discountElement.textContent =
            `-$${discount.toFixed(2)}`;

    }


    if (totalElement) {

        totalElement.textContent =
            `$${total.toFixed(2)}`;

    }


    /*
       Disable checkout when empty
    */

    if (checkoutButton) {

        checkoutButton.disabled =
            cart.length === 0;

    }

}


/* 
   PROMO CODE */

const applyPromo =
    document.getElementById("applyPromo");

const promoCode =
    document.getElementById("promoCode");

const promoMessage =
    document.getElementById("promoMessage");


if (applyPromo) {

    applyPromo.addEventListener(
        "click",
        () => {

            const code =
                promoCode.value
                    .trim()
                    .toUpperCase();


            if (code === "TASTE10") {

                promoMessage.textContent =
                    "10% discount applied!";

                promoMessage.style.color =
                    "#27833b";


                /*
                   Calculate discount
                */

                let subtotal = 0;

                cart.forEach(item => {

                    subtotal +=
                        item.price *
                        item.quantity;

                });


                const discount =
                    subtotal * 0.10;

                const delivery =
                    subtotal > 0 ? 3 : 0;

                const total =
                    subtotal +
                    delivery -
                    discount;


                discountElement.textContent =
                    `-$${discount.toFixed(2)}`;

                totalElement.textContent =
                    `$${total.toFixed(2)}`;

            } else {

                promoMessage.textContent =
                    "Invalid promo code.";

                promoMessage.style.color =
                    "#d93636";

            }

        }
    );

}


/* CHECKOUT */

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        () => {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty."
                );

                return;
            }


            alert(
                "Proceeding to checkout..."
            );

            /*
               Later we will connect this
               to the checkout page.
            */

        }
    );

}


/*  MOBILE NAVIGATION */

const menuToggle =
    document.getElementById("menuToggle");

const navLinks =
    document.getElementById("navLinks");


if (menuToggle && navLinks) {

    menuToggle.addEventListener(
        "click",
        () => {

            navLinks.classList.toggle("show");

            const isOpen =
                navLinks.classList.contains(
                    "show"
                );

            menuToggle.textContent =
                isOpen ? "✕" : "☰";

        }
    );


    document
        .querySelectorAll(".nav-links a")
        .forEach(link => {

            link.addEventListener(
                "click",
                () => {

                    navLinks.classList.remove(
                        "show"
                    );

                    menuToggle.textContent =
                        "☰";

                }
            );

        });

}


/* 
 START CART */

displayCart();