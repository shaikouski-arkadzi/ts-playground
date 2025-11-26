"use strict";
// Omit
Object.defineProperty(exports, "__esModule", { value: true });
// type gameDataCurrencies = {
//     alex: CreateCustomCurr<Currencies>;
//     john: CreateCustomCurr<Currencies>;
// }
const gameData = {
    alex: {
        customChina: "test",
        customKz: "test",
        customUkraine: "test",
        customUsa: "test",
    },
    john: {
        customChina: "test",
        customKz: "test",
        customUkraine: "test",
        customUsa: "test",
    },
};
// ReturnType
function calculate(a, b) {
    return a * b;
}
// ConstructorParameters
class Example {
    constructor(a) { }
}
