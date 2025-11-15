interface ICompany {
  name: string;
  debts: number;
  management: {
    owner: string;
  };
}

// Для получения типа значения в определенном свойстве используется
// прием Indexed Access Types (дословно: получение типа по индексу):
type CompanyDebtsType = ICompany["debts"];
type CompanyOwnerType = ICompany["management"]["owner"];
type CompanyKeysTypes = ICompany[keyof ICompany];
//string | number | {owner: string;}

export {};
