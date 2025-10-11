// Когда выбрасывается ошибка то функция никогда не вернется
// потому что произойдет ошибка и выполнение функции прервется
function genereateError(message: string): never {
  throw new Error(message);
}

function dumpError(): never {
  while (true) {}
}

function rec(): never {
  return rec();
}

type paymentAction = "refund" | "checkout" | "reject";

// При добавлении нового экшена
// нужно обязательно обработать новый тип
// иначе попадем в default и будет ошибка
// Type 'new' is not assignable to type 'never'
function processAction(action: paymentAction) {
  switch (action) {
    case "refund":
      //...
      break;
    case "checkout":
      // ...
      break;
    case "reject":
      // ...
      break;
    default:
      const _: never = action;
      throw new Error("Нет такого action");
  }
}

// Исчерпывающая проверка типа
function isString(x: string | number): boolean {
  if (typeof x === "string") {
    return true;
  } else if (typeof x === "number") {
    return false;
  }
  genereateError("error");
}

export {};
