"use strict";
// Оператор infer применяется внутри Conditional Types
// для вытаскивания конкретного типа из более сложной конструкции.
// infer фактически объявляет временную переменную типа внутри выражения extends,
// которую затем можно переиспользовать.
Object.defineProperty(exports, "__esModule", { value: true });
function runTransaction(transaction) {
    console.log(transaction);
}
const transaction = {
    fromTo: ["1", "2"],
};
runTransaction(transaction);
