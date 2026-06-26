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

// Наследование
class Users extends Array<User> {
  searchByName(name: string) {
    return this.filter((u) => u.name === name);
  }
}

const users = new Users();

// Композиция
class UserList {
  users!: User[];

  push(u: User) {
    this.users.push(u);
  }
}

class Admin {
  // ! - definite assignment assertion
  // Я обещаю TypeScript, что значение появится до использования
  name!: string;
  _email!: string;

  set email(email: string) {
    this._email = email;
  }

  get email() {
    return this._email;
  }
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

class PersistentPayment extends Payment {
  databaseId!: number;
  paidAt!: Date;

  constructor() {
    const id = Math.random();
    super(id);
  }

  override unholdPayment(date?: Date): void {
    super.unholdPayment();
    if (date) {
      this.paidAt = date;
    }
  }
}

new PersistentPayment();

// Наследование
class UserWithPayment extends Payment {
  name!: string;
}

// Композиция
class UserWithPayment2 {
  user: User;
  payment: Payment;

  constructor(user: User, payment: Payment) {
    this.payment = payment;
    this.user = user;
  }
}

class Vehicle {
  public make!: string;
  private damages!: string[];
  protected run!: number;
  #price!: number;
}

class EuroTruck extends Vehicle {
  setRun(km: number) {
    // run доступен в наследуемом
    this.run = km / 0.62;
  }
}

// run не доступен в экземпляре
// damages не доступен в экземпляре
new Vehicle().make;

class UserService {
  static db: any;

  create() {
    UserService.db;
  }

  // Инициализация статичных свойств при загрузке класса.
  // Код внутри выполняется автоматически,
  // как только класс появляется в системе.
  static {
    UserService.db = "1f";
  }
}

UserService.db;
