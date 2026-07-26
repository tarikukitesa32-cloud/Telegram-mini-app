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
