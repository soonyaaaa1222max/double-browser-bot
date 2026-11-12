
export function normalizeUrl(value) {
    let address = value.trim();

    if (!address) {
        throw new Error("Введи адресу сайту!");
    }

    if (!/^https?:\/\//i.test(address)) {
        address = "https://" + address;
    }

    let url;

    try {
        url = new URL(address);
    } catch {
        throw new Error("Некоректна адреса!");
    }

    if (url.protocol !== "http:" && url.protocol !== "https:") {
        throw new Error("Дозволені лише HTTP та HTTPS!");
    }

    if (url.username || url.password) {
        throw new Error("Адреси з логіном і паролем не дозволені!");
    }

    return url.href;
}
