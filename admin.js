// Admin Login

function adminLogin() {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const message = document.getElementById("message");

    const adminUser = "admin";
    const adminPass = "123456";

    if (username === adminUser && password === adminPass) {

        localStorage.setItem("adminLoggedIn", "true");

        window.location.href = "admin.html";

    } else {

        message.innerHTML = "❌ Invalid Username or Password";
        message.style.color = "red";

    }

}


// Check Login
function checkAdmin(){

    if(localStorage.getItem("adminLoggedIn") !== "true"){

        window.location.href = "admin-login.html";

    }

}


// Logout
function logout(){

    localStorage.removeItem("adminLoggedIn");

    window.location.href = "admin-login.html";

}
// =========================
// Product Management
// =========================

let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct() {

    const name = document.getElementById("productName").value.trim();
    const price = document.getElementById("productPrice").value.trim();
    const image = document.getElementById("productImage").value.trim();

    if (name === "" || price === "" || image === "") {
        alert("Please fill all fields.");
        return;
    }

    products.push({
        id: Date.now(),
        name: name,
        price: price,
        image: image
    });

    localStorage.setItem("products", JSON.stringify(products));

    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productImage").value = "";

    loadProducts();
}

function loadProducts() {

    const productList = document.getElementById("productList");

    if (!productList) return;

    productList.innerHTML = "";

    products.forEach(product => {

        productList.innerHTML += `
        <div class="product-card">

            <img src="${product.image}" width="100">

            <h3>${product.name}</h3>

            <p>${product.price} ETB</p>

            <button onclick="deleteProduct(${product.id})">
                Delete
            </button>

        </div>
        `;

    });

    document.getElementById("totalProducts").innerText = products.length;
}

function deleteProduct(id){

    products = products.filter(product => product.id !== id);

    localStorage.setItem("products", JSON.stringify(products));

    loadProducts();

}

window.onload = function(){

    checkAdmin();

    loadProducts();

};
