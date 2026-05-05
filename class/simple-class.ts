class User {
  name: string;
  skills: string[] = [];

  constructor(name: string) {
    this.name = name;
  }

  addSkills(skill: string): void;
  addSkills(skills: string[]): void;
  addSkills(skillOrSkills: string | string[]): void {
    if (typeof skillOrSkills === "string") {
      this.skills.push(skillOrSkills);
    } else {
      this.skills.push(...skillOrSkills);
    }
  }
}

const user = new User("Вася");

class Admin {
  name!: string;
}

const admin = new Admin();

enum PaymentStatus {
  Holded,
  Processed,
  Reversed,
}

class Payment {
  id: number;
  status: PaymentStatus;
  createdAt: Date;
  updatedAt?: Date;

  constructor(id: number) {
    this.id = id;
    this.status = PaymentStatus.Holded;
    this.createdAt = new Date();
    this.updatedAt = undefined;
  }

  getPayment(): number {
    return new Date().getTime() - this.createdAt.getTime();
  }

  unholdPayment(): void {
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
