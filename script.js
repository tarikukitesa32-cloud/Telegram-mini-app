const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

const loginButton = document.querySelector(".container button");

loginButton.addEventListener("click", () => {
    const phone = document.querySelector("input").value;

    if (phone === "") {
        alert("Please enter your phone number.");
        return;
    }

    alert("Welcome to Bota Solutions App!");
});
