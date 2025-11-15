type FromUserOrFromBase<T extends string | number> = T extends string
  ? IDataFromUser
  : IDataFromBase;

interface IDataFromUser {
  weight: string;
}

interface IDataFromBase {
  calories: number;
}

function calculateAmountOfFigures(str: string): IDataFromUser;
function calculateAmountOfFigures(num: number): IDataFromBase;
function calculateAmountOfFigures(
  numOrStr: string | number
): IDataFromBase | IDataFromUser {
  if (typeof numOrStr === "string") {
    const obj: IDataFromUser = {
      weight: numOrStr,
    };

    return obj;
  } else {
    const obj: IDataFromBase = {
      calories: numOrStr,
    };

    return obj;
  }
}

function calculateAmountOfFigures2<T extends string | number>(
  numOrStr: T
): T extends string ? IDataFromUser : IDataFromBase {
  if (typeof numOrStr === "string") {
    const obj: IDataFromUser = {
      weight: numOrStr,
    };

    return obj as FromUserOrFromBase<T>;
  } else {
    const obj: IDataFromBase = {
      calories: numOrStr,
    };

    return obj as FromUserOrFromBase<T>;
  }
}

export {};
