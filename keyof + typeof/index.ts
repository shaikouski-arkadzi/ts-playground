interface ICompany {
  name: string;
  debts: number;
}

const comp: ICompany = {
  name: "comp",
  debts: 50000,
};

// typeof позволяет получить тип любого литерала (конкретного значения)
// и работать дальше с ним как с типом:

type CompKeys = keyof typeof comp; // 'name' | 'debts'

// Когда необходимо поработать с чем-то, как с типом, то сначала
// применяем на нем typeof, а после уже выполняем манипуляции

export {};
