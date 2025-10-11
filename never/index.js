"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Когда выбрасывается ошибка то функция никогда не вернется
// потому что произойдет ошибка и выполнение функции прервется
function genereateError(message) {
    throw new Error(message);
}
function dumpError() {
    while (true) { }
}
function rec() {
    return rec();
}
// При добавлении нового экшена
// нужно обязательно обработать новый тип
// иначе попадем в default и будет ошибка
// Type 'new' is not assignable to type 'never'
function processAction(action) {
    switch (action) {
        case "refund":
            //...
            break;
        case "checkout":
            // ...
            break;
        case "reject":
            // ...
            break;
        default:
            const _ = action;
            throw new Error("Нет такого action");
    }
}
// Исчерпывающая проверка типа
function isString(x) {
    if (typeof x === "string") {
        return true;
    }
    else if (typeof x === "number") {
        return false;
    }
    genereateError("error");
}
