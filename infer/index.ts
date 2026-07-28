// Оператор infer применяется внутри Conditional Types
// для вытаскивания конкретного типа из более сложной конструкции.
// infer фактически объявляет временную переменную типа внутри выражения extends,
// которую затем можно переиспользовать.

// T extends (first: infer First, ...args: any[]) => any
// проверяется, является ли T функцией.
// Остальные аргументы (...args) и возвращаемый тип (any) не важны.

// infer First
// объявляет переменную типа First прямо внутри выражения extends
// TypeScript сам выводит (infer = «вывести») конкретный тип первого аргумента и связывает его с именем First.

// ? First
// если условие выполнено, возвращается извлечённый тип.

// : never
// если T не является функцией, вернуть never, потому что первый аргумент извлечь невозможно (например, T может оказаться объектом).

type GetFirstArg<T> = T extends (first: infer First, ...args: any[]) => any
  ? First
  : never;

function runTransaction(transaction: { fromTo: [string, string] }) {
  console.log(transaction);
}

const transaction: GetFirstArg<typeof runTransaction> = {
  fromTo: ["1", "2"],
};

runTransaction(transaction);

export {};
