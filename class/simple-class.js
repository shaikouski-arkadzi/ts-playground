"use strict";
class User {
    constructor(name) {
        this.skills = [];
        this.name = name;
    }
    addSkills(skillOrSkills) {
        if (typeof skillOrSkills === "string") {
            this.skills.push(skillOrSkills);
        }
        else {
            this.skills.push(...skillOrSkills);
        }
    }
}
const user = new User("Вася");
class Admin {
}
const admin = new Admin();
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus[PaymentStatus["Holded"] = 0] = "Holded";
    PaymentStatus[PaymentStatus["Processed"] = 1] = "Processed";
    PaymentStatus[PaymentStatus["Reversed"] = 2] = "Reversed";
})(PaymentStatus || (PaymentStatus = {}));
class Payment {
    constructor(id) {
        this.id = id;
        this.status = PaymentStatus.Holded;
        this.createdAt = new Date();
        this.updatedAt = undefined;
    }
    getPayment() {
        return new Date().getTime() - this.createdAt.getTime();
    }
    unholdPayment() {
        if (this.status === PaymentStatus.Processed) {
            throw new Error("Платеж не может быть возвращен!");
        }
        this.status = PaymentStatus.Reversed;
        this.updatedAt = new Date();
    }
}
const payment = new Payment(1);
payment.unholdPayment();
const time = payment.getPayment();
