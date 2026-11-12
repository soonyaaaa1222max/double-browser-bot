
import { normalizeUrl } from "./security.js";
import { openExternal } from "./telegram.js";

export function createBrowser(container, initialUrl, onUrlChange, tg) {

    const toolbar = document.createElement("form");
    toolbar.className = "browser-toolbar";

    const address = document.createElement("input");
    address.className = "browser-address";
    address.type = "text";
    address.placeholder = "Введи адресу сайту...";
    address.autocomplete = "url";
    address.value = initialUrl || "";

    const goButton = document.createElement("button");
    goButton.className = "browser-go";
    goButton.textContent = "Відкрити";
    goButton.type = "submit";

    const actions = document.createElement("div");
    actions.className = "browser-actions";

    const reloadButton = document.createElement("button");
    reloadButton.textContent = "↻ Оновити";
    reloadButton.type = "button";

    const externalButton = document.createElement("button");
    externalButton.textContent = "↗ Зовнішній браузер";
    externalButton.type = "button";

    const frame = document.createElement("iframe");
    frame.className = "browser-frame";
    frame.title = "Вміст сайту";
    frame.referrerPolicy = "no-referrer";
    frame.loading = "lazy";

    const message = document.createElement("div");
    message.className = "browser-message";
    message.textContent =
        "Деякі сайти забороняють відкриття всередині інших сторінок.";

    toolbar.appendChild(address);
    toolbar.appendChild(goButton);

    actions.appendChild(reloadButton);
    actions.appendChild(externalButton);

    container.appendChild(toolbar);
    container.appendChild(actions);
    container.appendChild(frame);
    container.appendChild(message);

    let currentUrl = "";

    function navigate() {
        try {
            const url = normalizeUrl(address.value);

            currentUrl = url;
            address.value = url;
            frame.src = url;

            onUrlChange(url);
        } catch (error) {
            alert(error.message);
        }
    }

    toolbar.addEventListener("submit", function(event) {
        event.preventDefault();
        navigate();
    });

    reloadButton.addEventListener("click", function() {
        if (currentUrl) {
            frame.src = currentUrl;
        }
    });

    externalButton.addEventListener("click", function() {
        if (currentUrl) {
            openExternal(currentUrl, tg);
        }
    });

    if (initialUrl) {
        navigate();
    }

    return {
        getUrl() {
            return currentUrl;
        }
    };
}
