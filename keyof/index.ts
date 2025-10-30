interface ICompany {
  name: string;
  debts: number;
}

// keyof — это оператор, позволяющий получить все свойства объекта, его ключи.
// Мы работаем с типами, а не с литералами, так что его можно применить к interface, type и class.

type CompanyKeys = keyof ICompany; // "debts" | "name"

// Часто такой прием используется с дженериками
// для того, чтобы создать связь между типом и его свойствами.
// В таком случае мы сможем использовать только существующие свойства и получим подсказки:

function printDebts<T, K extends keyof T, S extends keyof T>(
  company: T,
  name: K,
  debts: S
) {
  console.log(`Company ${company[name]}, debts: ${company[debts]}`);
}

const comp: ICompany = {
  name: "comp",
  debts: 50000,
};

printDebts(comp, "name", "debts"); // аргументы 2 и 3 строго ограничены ключами объекта в 1 аргументеы

export {};
