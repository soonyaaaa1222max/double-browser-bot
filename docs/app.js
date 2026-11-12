
const tg = window.Telegram?.WebApp;

if (tg) {
    tg.ready();
    tg.expand();
}

const workspace = document.getElementById("workspace");
const addButton = document.getElementById("addWindow");

let windowCount = 0;

addButton.addEventListener("click", function() {
    windowCount++;

    // Створюємо основне вікно
    const newWindow = document.createElement("div");
    newWindow.className = "browser-window";

    // Створюємо заголовок
    const header = document.createElement("div");
    header.className = "window-header";

    const title = document.createElement("span");
    title.textContent = `Вікно №${windowCount}`;

    // Створюємо кнопку закриття
    const closeButton = document.createElement("button");
    closeButton.textContent = "×";

    closeButton.addEventListener("click", function() {
        newWindow.remove();
    });

    
    // Створюємо вміст вікна
    const content = document.createElement("div");
    content.className = "window-content";

    // Створюємо поле для адреси
    const urlInput = document.createElement("input");
    urlInput.type = "text";
    urlInput.placeholder = "Введи адресу сайту...";

    // Створюємо кнопку відкриття
    const openButton = document.createElement("button");
    openButton.textContent = "Відкрити";


    openButton.addEventListener("click", function() {
        let url = urlInput.value.trim();

        if (url === "") {
            alert("Введи адресу сайту!");
            return;
        }

        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }

        const iframe = document.createElement("iframe");

        iframe.src = url;
        iframe.style.width = "100%";
        iframe.style.height = "400px";
        iframe.style.border = "none";

        content.appendChild(iframe);
    });


    // Додаємо елементи у вікно
    content.appendChild(urlInput);
    content.appendChild(openButton);


    // Збираємо всі елементи
    header.appendChild(title);
    header.appendChild(closeButton);

    newWindow.appendChild(header);
    newWindow.appendChild(content);

    // Додаємо вікно на екран
    workspace.querySelector(".welcome")?.remove();
    workspace.appendChild(newWindow);
});

