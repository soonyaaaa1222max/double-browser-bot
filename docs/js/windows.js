
import { SETTINGS } from "./settings.js";
import { loadWindows, saveWindows } from "./storage.js";
import { createBrowser } from "./browser.js";

export function initWindows(workspace, addButton, tg) {

    const windows = new Map();
    let counter = 0;

    function updateStorage() {
        const data = Array.from(windows.values()).map(item => ({
            id: item.id,
            url: item.url
        }));

        saveWindows(data);
    }

    function createWindow(saved = null) {

        if (windows.size >= SETTINGS.maxWindows) {
            alert("Досягнуто максимальної кількості вікон!");
            return;
        }

        counter++;

        const id = saved?.id || `window-${Date.now()}-${counter}`;

        const card = document.createElement("section");
        card.className = "browser-window";

        const header = document.createElement("div");
        header.className = "window-header";

        const title = document.createElement("span");
        title.className = "window-title";
        title.textContent = `Вікно №${counter}`;

        const closeButton = document.createElement("button");
        closeButton.className = "close-window";
        closeButton.textContent = "×";
        closeButton.type = "button";

        const content = document.createElement("div");

        const item = {
            id,
            url: saved?.url || "",
            element: card
        };

        windows.set(id, item);

        closeButton.addEventListener("click", function() {
            card.remove();
            windows.delete(id);
            updateStorage();

            if (windows.size === 0) {
                showWelcome();
            }
        });

        header.appendChild(title);
        header.appendChild(closeButton);

        card.appendChild(header);
        card.appendChild(content);

        workspace.querySelector("#welcome")?.remove();
        workspace.appendChild(card);

        createBrowser(
            content,
            item.url,
            function(url) {
                item.url = url;
                updateStorage();
            },
            tg
        );

        updateStorage();
    }

    function showWelcome() {
        if (workspace.querySelector("#welcome")) {
            return;
        }

        const welcome = document.createElement("div");
        welcome.className = "welcome";
        welcome.id = "welcome";

        const heading = document.createElement("h2");
        heading.textContent = "Вітаю в MultiBrowser!";

        const paragraph = document.createElement("p");
        paragraph.textContent = "Створи нове вікно, щоб відкрити сайт.";

        welcome.appendChild(heading);
        welcome.appendChild(paragraph);

        workspace.appendChild(welcome);
    }

    addButton.addEventListener("click", function() {
        createWindow();
    });

    const savedWindows = loadWindows();

    savedWindows.slice(0, SETTINGS.maxWindows).forEach(function(item) {
        createWindow(item);
    });
}
