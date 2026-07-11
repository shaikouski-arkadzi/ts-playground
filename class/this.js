"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Payment {
    constructor() {
        this.date = new Date();
        this.getDateArrow = () => {
            return this.date;
        };
    }
    // this: Payment указание на ожидаемый тип this
    getDate() {
        return this.date;
    }
    // this - тип возвращаемого значения метода(Payment)
    // Если возвращается экземпляр то лучше указывать возвращаемый экземпляр через this тип
    setName(name) {
        this.name = name;
        return this;
    }
    // typeguard
    isPayment() {
        return this instanceof Payment;
    }
}
const p = new Payment();
console.log(p.getDate());
const user = {
    id: 1,
    paymentDate: p.getDate.bind(p),
};
console.log(user.paymentDate());
class PaymentPersistent extends Payment {
    save() {
        // у super нет стрелочной функции(getDateArrow)
        // return super.getDateArrow()
        // при необходимости обращения к стрелочной функции у дочернего класса надо использовать обращение через this
        return this.getDateArrow();
    }
}
const p2 = new PaymentPersistent().setName("Name");
