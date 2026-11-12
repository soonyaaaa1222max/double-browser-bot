
import { initTelegram } from "./telegram.js";
import { initWindows } from "./windows.js";

const tg = initTelegram();

const workspace = document.getElementById("workspace");
const addButton = document.getElementById("addWindow");

initWindows(workspace, addButton, tg);

console.log("MultiBrowser запущений!");
