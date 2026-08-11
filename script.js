/* =====================================================
   MAYAN INTERNATIONAL WOODEN WORKS
   MAIN WEBSITE SCRIPT
===================================================== */


let cart = [];


/* =====================================================
   ADD TO CART
===================================================== */

function addToCart(name, price) {

    const existing =
        cart.find(
            item => item.name === name
        );


    if (existing) {

        existing.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            quantity: 1

        });

    }


    updateCartCount();


    alert(
        name +
        " added to your cart!"
    );

}


/* =====================================================
   CART COUNT
===================================================== */

function updateCartCount() {

    const countElement =
        document.getElementById("cartCount");


    if (!countElement) {
        return;
    }


    let count = 0;


    cart.forEach(function (item) {

        count += item.quantity;

    });


    countElement.textContent =
        count;

}


/* =====================================================
   SHOW CART
===================================================== */

function showCart() {

    const modal =
        document.getElementById("cartModal");

    const items =
        document.getElementById("cartItems");

    const totalElement =
        document.getElementById("cartTotal");


    if (!modal) {
        return;
    }


    modal.style.display =
        "flex";


    if (cart.length === 0) {

        items.innerHTML = `

            <div class="empty-cart">

                🛒

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add some furniture to your cart.
                </p>

            </div>

        `;


        totalElement.textContent =
            "Total: ₹0";


        return;

    }


    let html = "";

    let total = 0;


    cart.forEach(function (item, index) {

        const itemTotal =
            item.price *
            item.quantity;


        total += itemTotal;


        html += `

            <div class="cart-item">

                <div>

                    <strong>
                        ${item.name}
                    </strong>

                    <p>
                        ₹${item.price.toLocaleString("en-IN")}
                        ×
                        ${item.quantity}
                    </p>

                </div>


                <button
                    onclick="removeFromCart(${index})">

                    ❌

                </button>

            </div>

        `;

    });


    items.innerHTML =
        html;


    totalElement.textContent =
        "Total: ₹" +
        total.toLocaleString("en-IN");

}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCart() {

    const modal =
        document.getElementById("cartModal");


    if (modal) {

        modal.style.display =
            "none";

    }

}


/* =====================================================
   REMOVE CART ITEM
===================================================== */

function removeFromCart(index) {

    cart.splice(
        index,
        1
    );


    updateCartCount();

    showCart();

}


/* =====================================================
   BUY NOW
===================================================== */

function buyNow(name, price) {

    const message =

        "Hello Mayan International Wooden Works,\n\n" +

        "I would like to enquire about:\n" +

        name +

        "\n\nPrice: ₹" +

        price.toLocaleString("en-IN") +

        "\n\nPlease provide availability, delivery and payment details.";


    const url =

        "https://wa.me/919074245231?text=" +

        encodeURIComponent(message);


    window.open(
        url,
        "_blank"
    );

}


/* =====================================================
   PRODUCT ENQUIRY
===================================================== */

function enquireProduct(name) {

    const message =

        "Hello Mayan International Wooden Works,\n\n" +

        "I am interested in:\n" +

        name +

        "\n\nPlease provide price, availability, size, delivery and other details.";


    const url =

        "https://wa.me/919074245231?text=" +

        encodeURIComponent(message);


    window.open(
        url,
        "_blank"
    );

}


/* =====================================================
   WHATSAPP CHECKOUT
===================================================== */

function checkoutWhatsApp() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty."
        );

        return;

    }


    let message =

        "Hello Mayan International Wooden Works,\n\n" +

        "I would like to enquire/order about these products:\n\n";


    let total = 0;


    cart.forEach(function (item) {

        const itemTotal =
            item.price *
            item.quantity;


        total += itemTotal;


        message +=

            "• " +
            item.name +

            " × " +
            item.quantity +

            " = ₹" +

            itemTotal.toLocaleString("en-IN") +

            "\n";

    });


    message +=

        "\nTotal: ₹" +

        total.toLocaleString("en-IN") +

        "\n\n" +

        "Please contact me regarding availability, delivery and payment.";


    const url =

        "https://wa.me/919074245231?text=" +

        encodeURIComponent(message);


    window.open(
        url,
        "_blank"
    );

}


/* =====================================================
   SEARCH
===================================================== */

function searchProducts() {

    const input =
        document.getElementById(
            "searchInput"
        );


    if (!input) {
        return;
    }


    const text =
        input.value
        .trim()
        .toLowerCase();


    const cards =
        document.querySelectorAll(
            ".product-card"
        );


    cards.forEach(function (card) {

        const name =
            card.dataset.name || "";


        if (
            name.includes(text)
        ) {

            card.style.display =
                "";

        } else {

            card.style.display =
                "none";

        }

    });


    updateSectionVisibility();

}


/* =====================================================
   CATEGORY FILTER
===================================================== */

function filterCategory(category) {

    const cards =
        document.querySelectorAll(
            ".product-card"
        );


    const sections =
        document.querySelectorAll(
            ".product-section"
        );


    cards.forEach(function (card) {

        const cardCategory =
            card.dataset.category;


        if (
            category === "all" ||
            cardCategory === category
        ) {

            card.style.display =
                "";

        } else {

            card.style.display =
                "none";

        }

    });


    sections.forEach(function (section) {

        const visibleCards =
            section.querySelectorAll(
                ".product-card:not([style*='display: none'])"
            );


        if (
            category === "all"
        ) {

            section.style.display =
                "";

        } else {

            const sectionCategory =
                section.querySelector("h2");


            if (
                sectionCategory &&
                sectionCategory.textContent.trim()
                === category
            ) {

                section.style.display =
                    "";

            } else {

                section.style.display =
                    "none";

            }

        }

    });


    document.getElementById(
        "products"
    ).scrollIntoView({
        behavior: "smooth"
    });

}


/* =====================================================
   SEARCH SECTION VISIBILITY
===================================================== */

function updateSectionVisibility() {

    const sections =
        document.querySelectorAll(
            ".product-section"
        );


    sections.forEach(function (section) {

        const cards =
            section.querySelectorAll(
                ".product-card"
            );


        let visible = 0;


        cards.forEach(function (card) {

            if (
                card.style.display !==
                "none"
            ) {

                visible++;

            }

        });


        section.style.display =
            visible > 0
            ? ""
            : "none";

    });

}


/* =====================================================
   CLOSE CART OUTSIDE
===================================================== */

window.addEventListener(
    "click",
    function (event) {

        const modal =
            document.getElementById(
                "cartModal"
            );


        if (
            event.target === modal
        ) {

            closeCart();

        }

    }
);


/* =====================================================
   ENTER KEY SEARCH
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const input =
            document.getElementById(
                "searchInput"
            );


        if (input) {

            input.addEventListener(
                "keypress",
                function (event) {

                    if (
                        event.key === "Enter"
                    ) {

                        searchProducts();

                    }

                }
            );

        }

    }
);