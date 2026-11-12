
const tg = window.Telegram.WebApp;

tg.ready();
tg.expand();

const workspace = document.getElementById("workspace");
const addButton = document.getElementById("addWindow");

addButton.addEventListener("click", function() {
    alert("Нове вікно буде додано!");
});
