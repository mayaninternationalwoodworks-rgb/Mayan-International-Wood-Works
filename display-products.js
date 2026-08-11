document.addEventListener("DOMContentLoaded", function () {

    const productsContainer =
        document.getElementById("products");

    if (!productsContainer) {
        console.error("Products container not found.");
        return;
    }


    /* =====================================================
       CATEGORY ORDER
    ===================================================== */

    const categoryOrder = [

        "Doors & Frames",
        "Chairs & Seating",
        "Bedroom",
        "Dining",
        "Living Room",
        "Office & Study",
        "Storage",
        "Custom Furniture"

    ];


    /* =====================================================
       CREATE PRODUCT CARD
    ===================================================== */

    function createProductCard(product) {

        let discount = 0;

        if (
            product.mrp > 0 &&
            product.price > 0
        ) {

            discount = Math.round(
                (
                    (product.mrp - product.price)
                    /
                    product.mrp
                ) * 100
            );

        }


        let priceHTML = "";


        if (product.price === 0) {

            priceHTML = `

                <div class="price enquiry-price">
                    Contact for Price
                </div>

            `;

        } else {

            priceHTML = `

                <div class="price">
                    ₹${product.price.toLocaleString("en-IN")}
                </div>

                <div class="mrp">

                    MRP
                    <del>
                        ₹${product.mrp.toLocaleString("en-IN")}
                    </del>

                    <span>
                        ${discount}% OFF
                    </span>

                </div>

            `;

        }


        let buttonsHTML = "";


        if (product.price === 0) {

            buttonsHTML = `

                <div class="product-buttons">

                    <button
                        class="cart-btn"
                        onclick="enquireProduct('${product.name}')">

                        💬 Enquire Now

                    </button>

                </div>

            `;

        } else {

            buttonsHTML = `

                <div class="product-buttons">

                    <button
                        class="cart-btn"
                        onclick="addToCart(
                            '${product.name}',
                            ${product.price}
                        )">

                        🛒 Add to Cart

                    </button>


                    <button
                        class="buy-btn"
                        onclick="buyNow(
                            '${product.name}',
                            ${product.price}
                        )">

                        Buy Now

                    </button>

                </div>

            `;

        }


        return `

            <article
                class="product-card"
                data-name="${product.name.toLowerCase()}"
                data-category="${product.category}">


                <div class="product-image">

                    ${
                        discount > 0
                        ?
                        `<span class="discount-badge">
                            ${discount}% OFF
                         </span>`
                        :
                        `<span class="discount-badge custom-badge">
                            CUSTOM
                         </span>`
                    }


                    <img

                        src="${product.image}"

                        alt="${product.name}"

                        loading="lazy"

                        onerror="
                            this.onerror=null;
                            this.src='https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80';
                        "

                    >


                    <div class="image-overlay">

                        View Furniture

                    </div>

                </div>


                <div class="product-details">


                    <div class="product-rating">

                        ⭐⭐⭐⭐⭐

                        <span>
                            Trusted Quality
                        </span>

                    </div>


                    <h3>
                        ${product.name}
                    </h3>


                    <p class="product-description">
                        ${product.description}
                    </p>


                    ${priceHTML}


                    <div class="product-info">

                        <span>
                            <b>Category:</b>
                            ${product.category}
                        </span>

                        <span>
                            <b>Material:</b>
                            ${product.material}
                        </span>

                    </div>


                    ${buttonsHTML}


                    <button
                        class="whatsapp-product"
                        onclick="enquireProduct('${product.name}')">

                        💬 Ask about this furniture

                    </button>


                </div>

            </article>

        `;

    }


    /* =====================================================
       DISPLAY ALL CATEGORIES
    ===================================================== */

    function displayProducts() {

        productsContainer.innerHTML = "";


        categoryOrder.forEach(function (category) {


            const categoryProducts =
                products.filter(
                    product =>
                        product.category === category
                );


            if (categoryProducts.length === 0) {
                return;
            }


            const section =
                document.createElement("section");


            section.className =
                "product-section";


            section.id =
                categoryToId(category);


            section.innerHTML = `

                <div class="product-section-heading">

                    <div>

                        <span>
                            MAYAN COLLECTION
                        </span>

                        <h2>
                            ${category}
                        </h2>

                        <p>
                            Explore our ${category.toLowerCase()}
                            collection.
                        </p>

                    </div>


                    <button
                        onclick="filterCategory('${category}')">

                        View All →

                    </button>

                </div>


                <div class="product-grid">

                    ${

                        categoryProducts
                        .map(createProductCard)
                        .join("")

                    }

                </div>

            `;


            productsContainer.appendChild(section);

        });


        console.log(
            "Mayan products loaded:",
            products.length
        );

    }


    /* =====================================================
       CATEGORY ID
    ===================================================== */

    function categoryToId(category) {

        const ids = {

            "Doors & Frames": "doors",

            "Chairs & Seating": "chairs",

            "Bedroom": "bedroom",

            "Dining": "dining",

            "Living Room": "living",

            "Office & Study": "office",

            "Storage": "storage",

            "Custom Furniture": "custom"

        };


        return ids[category] || "products";

    }


    /* =====================================================
       START
    ===================================================== */

    displayProducts();

});