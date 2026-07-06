class Payment {
  private date: Date = new Date();
  name!: string;

  // this: Payment указание на ожидаемый тип this
  getDate(this: Payment) {
    return this.date;
  }

  getDateArrow = () => {
    return this.date;
  };

  // this - тип возвращаемого значения метода(Payment)
  // Если возвращается экземпляр то лучше указывать возвращаемый экземпляр через this тип
  setName(name: string): this {
    this.name = name;
    return this;
  }

  // typeguard
  isPayment(): this is Payment {
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

export {};
