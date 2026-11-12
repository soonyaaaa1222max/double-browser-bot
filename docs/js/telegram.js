
export function initTelegram() {
    const tg = window.Telegram?.WebApp;

    if (tg) {
        tg.ready();
        tg.expand();
    }

    return tg;
}

export function openExternal(url, tg) {
    if (tg?.openLink) {
        tg.openLink(url);
    } else {
        window.open(url, "_blank", "noopener,noreferrer");
    }
}
