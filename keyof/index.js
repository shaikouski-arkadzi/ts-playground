"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Часто такой прием используется с дженериками
// для того, чтобы создать связь между типом и его свойствами.
// В таком случае мы сможем использовать только существующие свойства и получим подсказки:
function printDebts(company, name, debts) {
    console.log(`Company ${company[name]}, debts: ${company[debts]}`);
}
const comp = {
    name: "comp",
    debts: 50000,
};
printDebts(comp, "name", "debts"); // аргументы 2 и 3 строго ограничены ключами объекта в 1 аргументеы
