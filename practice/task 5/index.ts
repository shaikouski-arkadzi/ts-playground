interface IForm {
  login: string;
  password: string;
}

type IFormValidate = {
  [K in keyof IForm]: { isValid: true } | { isValid: false; errorMsg: string };
};

// Необходимо типизировать объект валидации
// Учтите, что данные в форме могут расширяться и эти поля
// должны появиться и в объекте валидации

const validationData: IFormValidate = {
  login: { isValid: false, errorMsg: "At least 3 characters" },
  password: { isValid: true },
};

export {};
