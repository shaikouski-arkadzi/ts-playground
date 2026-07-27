interface ICompany {
  name: string;
  debts: number;
  management: {
    owner: string;
  };
  roles: [];
}

// Для получения типа значения в определенном свойстве используется
// прием Indexed Access Types (дословно: получение типа по индексу):
type CompanyDebtsType = ICompany["debts"];
type CompanyOwnerType = ICompany["management"]["owner"];
type CompanyKeysTypes = ICompany[keyof ICompany];
//string | number | {owner: string;}

const debts = "debts";
// Чтобы использовать переменную, нужно конвертировать её в тип через typeof:
type CompanyConstDebtsType = ICompany[typeof debts];

// Специальный индекс number в индексном обращении возвращает тип элемента массива:
type RoleArray = ICompany["roles"]; // Role[]
type RoleType = ICompany["roles"][number];

const roles = ["admin", "user"] as const;
type RoleTypes = typeof roles; // ["admin", "user"]
type RoleTypesIndex = (typeof roles)[number]; // "admin" | "user"

export {};
