
import { SETTINGS } from "./settings.js";

export function loadWindows() {
    try {
        const saved = localStorage.getItem(SETTINGS.storageKey);

        if (!saved) {
            return [];
        }

        const windows = JSON.parse(saved);

        if (!Array.isArray(windows)) {
            return [];
        }

        return windows;
    } catch (error) {
        console.error("Помилка завантаження:", error);
        return [];
    }
}

export function saveWindows(windows) {
    try {
        localStorage.setItem(
            SETTINGS.storageKey,
            JSON.stringify(windows)
        );
    } catch (error) {
        console.error("Помилка збереження:", error);
    }
}
