// Omit

interface Currencies {
  usa: "usd";
  china: "cny";
  ukraine: "uah";
  kz: "tenge";
}

type CurrenciesWithoutUSA = Omit<Currencies, "usa">;
// type CurrenciesWithoutUSA = {
//     china: "cny";
//     ukraine: "uah";
//     kz: "tenge";
// }

// Pick

type CurrenciesUSAAndUkraine = Pick<Currencies, "usa" | "ukraine">;
// type CurrenciesUSAAndUkraine = {
//     usa: "usd";
//     ukraine: "uah";
// }

// Exclude

type CountriesWithoutUSA = Exclude<keyof Currencies, "usa">;
// type CountriesWithoutUSA = "china" | "ukraine" | "kz"

// Extract

type CountriesWithUSAandKZ = Extract<keyof Currencies, "usa" | "kz">;
// type CountriesWithUSAandKZ = "usa" | "kz"

// Record

type PlayersNames = "alex" | "john";

interface Currencies {
  usa: "usd";
  china: "cny";
  ukraine: "uah";
  kz: "tenge";
}

type CreateCustomCurr<T> = {
  [P in keyof T as `custom${Capitalize<string & P>}`]: string;
};

type CustomCurrencies = CreateCustomCurr<Currencies>;
type gameDataCurrencies = Record<PlayersNames, CustomCurrencies>;
// type gameDataCurrencies = {
//     alex: CreateCustomCurr<Currencies>;
//     john: CreateCustomCurr<Currencies>;
// }

const gameData: gameDataCurrencies = {
  alex: {
    customChina: "test",
    customKz: "test",
    customUkraine: "test",
    customUsa: "test",
  },
  john: {
    customChina: "test",
    customKz: "test",
    customUkraine: "test",
    customUsa: "test",
  },
};

// ReturnType

function calculate(a: number, b: number): number {
  return a * b;
}

type CalculateRT = ReturnType<typeof calculate>; // number

// Parameters

type CalculatePT = Parameters<typeof calculate>; // [a: number, b: number]
type CalculatePTFirst = Parameters<typeof calculate>[0]; // number

// ConstructorParameters

class Example {
  constructor(a: number) {}
}

type T0 = ConstructorParameters<typeof Example>; // [a: number]

export {};
