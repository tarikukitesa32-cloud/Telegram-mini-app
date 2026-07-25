// Shopping Cart
let cart = [];
let total = 0;

// Add Product to Cart
function addToCart(name, price) {
    cart.push({
        name: name,
        price: price
    });

    total += price;

    updateCart();

    alert(name + " added to cart!");
}

// Update Cart
function updateCart() {

    const count = document.getElementById("cart-count");
    const totalPrice = document.getElementById("total-price");
    const cartItems = document.getElementById("cart-items");

    if (count) {
        count.innerText = cart.length;
    }

    if (totalPrice) {
        totalPrice.innerText = total + " ETB";
    }

    if (cartItems) {

        cartItems.innerHTML = "";

        cart.forEach((item) => {

            cartItems.innerHTML += `
            <div class="cart-item">
                <h4>${item.name}</h4>
                <p>${item.price} ETB</p>
            </div>
            `;

        });

    }

}

// Checkout
function checkout(){

    if(cart.length==0){

        alert("Your cart is empty!");

        return;

    }

    alert("Order placed successfully!");

    cart=[];

    total=0;

    updateCart();

}

// Search Product
function searchProduct(){

let input=document.getElementById("search").value.toLowerCase();

let cards=document.querySelectorAll(".card");

cards.forEach(card=>{

let name=card.querySelector("h3").innerText.toLowerCase();

if(name.includes(input)){

card.style.display="block";

}else{

card.style.display="none";

}

});

}
