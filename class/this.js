"use strict";
class Payment {
    constructor() {
        this.date = new Date();
    }
    getDate() {
        return this.date;
    }
}
const p = new Payment();
console.log(p.getDate());
const user = {
    id: 1,
    paymentDate: p.getDate.bind(p),
};
console.log(user.paymentDate());
